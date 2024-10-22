import React, { useRef, useCallback, useState } from 'react';
import ReactFlow, { ReactFlowProvider } from 'reactflow';
import {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { writeTextFile, readTextFile } from '@tauri-apps/api/fs';
import { save, open } from '@tauri-apps/api/dialog';

//import CustomNode from './components/CustomNode';
import Sidebar from './components/Sidebar';
import NodePopUp from './components/NodePopUp';
import EdgePopUp from './components/EdgePopUp';
import HamburgerMenu from './components/HamburgerMenu';
import { DnDProvider, useDnD } from './DnDContext';

import './styles/index.css';
import hostPic from '/src/assets/host.png';
import routerPic from '/src/assets/router.png';
import firewallPic from '/src/assets/firewall.png';

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowComponent= () => {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });

  // const nodeTypes = {
  //   custom: CustomNode,
  // };

  const useStore = create((set) => ({
    nodes: [],
    edges: [],
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),
  }));

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
    setSelectedEdge(null);
  };

  const onEdgeClick = (event, edge) => {
    console.log("edge selected");
    setSelectedEdge(edge);
    setSelectedNode(null);
  }

  const handleNodeDoubleClick = (event, node) => {
    const nodePosition = event.target.getBoundingClientRect();
    setSelectedNode(node); // Update the selected node
    setPopUpPosition({
      x: nodePosition.right + 10, // Adjust x position next to the node
      y: nodePosition.top, // Adjust y position
    });
  };

  const handleEdgeDoubleClick = (event, edge) => {
    const edgePosition = event.target.getBoundingClientRect();
    setSelectedEdge(edge); // Update the selected node
    setPopUpPosition({
      x: edgePosition.right + 10, // Adjust x position next to the node
      y: edgePosition.top, // Adjust y position
    });
  }

  const onConnect = (params) =>
    setEdges((eds) =>
      addEdge({ ...params, data: { label: '', onLabelChange: handleEdgeLabelChange, connectivityTable: [{ property: 'p1', value: 'v1' }], vulnerabilityTable: [{ property: 'p1', value: 'v1' }] } }, eds)
  );

  const handleNodeLabelChange = (newName) => {
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

  const handleEdgeLabelChange = (newName) => {
    setEdges((edgs) =>
      edgs.map((edge) => {
        if (edge.id === selectedEdge.id) {
          return {
            ...edge,
            data: { ...edge.data, label: newName},
          };
        }
        return edge;
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

  const handleNodeTableChange = ( tableType, newTable) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          if (tableType == "system") {
            return {
              ...node,
              data: {...node.data, systemTable: newTable},
            };
          }
          else {
            return {
              ...node,
              data: {...node.data, vulnerabilityTable: newTable},
            };
          }
        }
        return node;
      })
    );
  };

  const handleEdgeTableChange = ( tableType, newTable) => {
    setEdges((edgs) =>
      edgs.map((edge) => {
        if (edge.id === selectedEdge.id) {
          if (tableType == "connectivity") {
            return {
              ...edge,
              data: {...edge.data, connectivityTable: newTable},
            };
          }
          else {
            return {
              ...edge,
              data: {...edge.data, vulnerabilityTable: newTable},
            };
          }
        }
        return edge;
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
      type: 'default',
      position: position,
      data: { label: `${name}`, image: `${image}`, type: 'Host', systemTable: [{ property: 'p1', value: 'v1' }], vulnerabilityTable: [{property: 'p1', value: 'v1'}]},
      sourcePosition: 'right',
      targetPosition: 'left',
      onclick: {onNodeClick}
      
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const closePopup = () => {
    setSelectedNode(null); // Clear selected node to hide popup
    setSelectedEdge(null);
  };

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const saveGraph = async () => {
    console.log("saving...");
    try {
      const filePath = await save({
        defualtPath: "graph.json",
        filters: [{ name: 'JSON Files', extensions: ['json'] }]
      });

      if (filePath) {
        const graphData = {
          nodes: nodes.map(node => ({ id: node.id, data: node.data, position: node.position, type: node.type })),
          edges: edges.map(edge => ({ id: edge.id, source: edge.source, target: edge.target, type: edge.type, data: edge.data })),
        };
        
        const json = JSON.stringify(graphData, null, 2);

        await writeTextFile(filePath, json);
        alert('FIle saved successfully as ${filePath}');
      };
    } catch (error) {
      console.error("Failed to save the file: ", error);
      alert("Failed to save the file. Please try again.");
    }
  };

  const loadGraph = async () => {
    try {
      const filePath = await open({
        filters: [{ name: 'JSON Files', extensions: ['json'] }]
      });

      if (filePath) {
        const fileContent = await readTextFile(filePath);

        const graphData = JSON.parse(fileContent);

        if (graphData.nodes && graphData.edges) {
          setNodes(graphData.nodes);
          setEdges(graphData.edges);
        } else {
          alert("Invalid graph data. Please check the file format.");
        }
      }
    } catch (error) {
      console.error("Failed to load the graph:", error);
      alert("Failed to load the graph. Please try again.");
    }
  }


  return (
    <div className="dndflow">
      {!menuIsOpen && <Sidebar openMenu={toggleMenu}/>}
      {menuIsOpen && <HamburgerMenu closeMenu={toggleMenu} saveGraph={saveGraph} loadGraph={loadGraph} />}
      <div className={`reactflow-wrapper`} 
        ref={reactFlowWrapper} 
        onDrop={handleDrop} 
        onDragOver={onDragOver}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          //nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onNodeDoubleClick={handleNodeDoubleClick}
          onEdgeDoubleClick={handleEdgeDoubleClick}
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
        {selectedNode && <NodePopUp node={selectedNode} position={popUpPosition} onLabelChange={handleNodeLabelChange} onTypeChange={handleTypeChange} onTableChange={handleNodeTableChange} closePopup={closePopup} />}
      </div>
      <div>
        {selectedEdge && <EdgePopUp edge={selectedEdge} position={popUpPosition} onLabelChange={handleEdgeLabelChange} onTableChange={handleEdgeTableChange} closePopup={closePopup} />}
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <FlowComponent />
    </DnDProvider>
  </ReactFlowProvider>
);
