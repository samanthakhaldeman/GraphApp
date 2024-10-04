import React, { useRef, useCallback, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Sidebar from './Sidebar';
import NodePopUp from './NodePopUp';
import { DnDProvider, useDnD } from './DnDContext';

import './index.css';
import hostPic from '/src/assets/host.png';
import routerPic from '/src/assets/router.png';
import firewallPic from '/src/assets/firewall.png';

const initialNodes = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState(null);
  const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });

  const getImage = (type) => {
    var image;
    if (type == 'Host') {
      image = hostPic;
    }
    else if (type == 'Router') {
      image = routerPic;
    }
    else {
      image = firewallPic;
    }
    return image;
  }

  // Handle node click event
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const handleNodeDoubleClick = (event, node) => {
    const nodePosition = event.target.getBoundingClientRect();
    setSelectedNode(node); // Update the selected node
    setPopUpPosition({
      x: nodePosition.right + 10, // Adjust x position next to the node
      y: nodePosition.top, // Adjust y position
    });
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const handleLabelChange = (newName) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: { ...node.data, label: newName},
          };
        }
        return node;
      })
    );
  };

  const handleTypeChange = (newType) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          var newImage = getImage(newType);
          return {
            ...node,
            data: {...node.data, type: newType, image: newImage},
          };
        }
        return node;
      })
    );
  };

  const handleTableChange = (newTable) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {...node.data, table: newTable},
          };
        }
        return node;
      })
    );
  }

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    console.log("drag");
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = (event) => {
    event.preventDefault();
    console.log("drop");

    const nodeType = event.dataTransfer.getData('application/reactflow/type');
    const name = event.dataTransfer.getData('application/reactflow/name');
    const image = getImage('Host');
    
    if (!nodeType) {
      console.log("invalid node type");
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: getId(),
      type: nodeType,
      position: position,
      data: { label: `${name}`, image: `${image}`, type: 'Host', table: [{ property: 'p1', value: 'v1' }]},
      sourcePosition: 'right',
      targetPosition: 'left',
      style: {
        borderRadius: '50%', 
        width: '80px', 
        height: '80px',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        overflow: 'hidden',
      },
      onclick: {onNodeClick}
      
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const closePopup = () => {
    setSelectedNode(null); // Clear selected node to hide popup
  };

  return (
    <div className="dndflow">
      <Sidebar />
      <div className={`reactflow-wrapper`} 
        ref={reactFlowWrapper} 
        onDrop={handleDrop} 
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={handleNodeDoubleClick}
          onConnect={onConnect}
          fitView
        >
          <Background 
            color="#555"
            variant={BackgroundVariant.Dots} 
            gap={30} 
            size={2} 
          />
          <Controls/>
        </ReactFlow>
      </div>
      <div>
				{selectedNode && <NodePopUp node={selectedNode} position={popUpPosition} onLabelChange={handleLabelChange} onTypeChange={handleTypeChange} onTableChange={handleTableChange} closePopup={closePopup} />}
			</div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
