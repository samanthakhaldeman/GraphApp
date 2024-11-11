import React, { useRef, useCallback, useState, useMemo } from 'react';
import ReactFlow, { MarkerType } from 'reactflow';
import {
  ReactFlowProvider,
  Controls,
  useReactFlow,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ErrorBoundary from './ErrorBoundary';
import CustomNode from './components/CustomNode';
import useStore from './store';
import Sidebar from './components/Sidebar';
import NodePopUp from './components/NodePopUp';
import EdgePopUp from './components/EdgePopUp';
import HamburgerMenu from './components/HamburgerMenu';

import { DnDProvider } from './DnDContext';

import './styles/index.css';
import hostPic from '/src/assets/host.png';
import serverPic from '/src/assets/server.png';
import firewallPic from '/src/assets/firewall.png';
import routerPic from '/src/assets/router.png';

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowComponent= () => {
  const { fitView } = useReactFlow();
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const { nodes, edges, setNodes, setEdges, addNode, addEdge } = useStore();
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [popUpPosition, setPopUpPosition] = useState({ x: 0, y: 0 });

  const nodeTypes = useMemo(() => ({
    custom: CustomNode,
  }), []);

  const getImage = (type) => {
    var image;
    if (type == 'Host') {
      image = hostPic;
    }
    else if (type == 'Server') {
      image = serverPic;
    }
    else if (type == 'Router') {
      image = routerPic;
    }
    else {
      image = firewallPic;
    }
    return image;
  }

  const onNodesChange = (changes) => {
    setNodes(nodes);
  };

  const onEdgesChange = (changes) => {
    setEdges(edges);
  };

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  const onEdgeClick = (event, edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }

  const handleNodeDoubleClick = (event, node) => {
    const nodePosition = event.target.getBoundingClientRect();
    setSelectedNode(node);
    setPopUpPosition({
      x: nodePosition.right + 15,
      y: nodePosition.top,
    });
  };

  const handleEdgeDoubleClick = (event, edge) => {
    const edgePosition = event.target.getBoundingClientRect();
    setSelectedEdge(edge); 
    setPopUpPosition({
      x: edgePosition.right + 10, 
      y: edgePosition.top,
    });
  }
  
  const handleNodeLabelChange = (newName) => {
    const updatedNodes = [];
    
    nodes.forEach((node) => {
      if (node.id === selectedNode.id) {
        updatedNodes.push({
          ...node,
          data: { ...node.data, label: newName },
        });
      } else {
        updatedNodes.push(node);
      }
    });
    
    setNodes(updatedNodes);
  };
  
  const handleEdgeLabelChange = (newName) => {
    const updatedEdges = [];
    
    edges.forEach((edge) => {
      if (edge.id === selectedEdge.id) {
        updatedEdges.push({
          ...edge,
          data: { ...edge.data, label: newName },
        });
      } else {
        updatedEdges.push(edge);
      }
    });
    
    setEdges(updatedEdges);
  };
  
  const handleTypeChange = (newType) => {
    const updatedNodes = [];
    
    nodes.forEach((node) => {
      if (node.id == selectedNode.id) {
        const newImage = getImage(newType);
        updatedNodes.push({
          ...node, data: {...node.data, type: newType, image: newImage },
        });
      } else {
        updatedNodes.push(node);
      }
    });
    setNodes(updatedNodes);
  };
  
  const handleNodeTableChange = ( tableType, newTable) => {
    const updatedNodes = [];
    
    nodes.forEach((node) => {
      if (node.id == selectedNode.id) {
        if (tableType == "system") {
          updatedNodes.push({
            ...node, data: {...node.data, systemTable: newTable},
          });
        } else {
          updatedNodes.push({
            ...node, data: {...node.data, vulnerabilityTable: newTable},
          });
        }
      } else {
        updatedNodes.push(node);
      }
    })
    setNodes(updatedNodes);
  };
  
  const handleEdgeTableChange = ( tableType, newTable) => {
    const updatedEdges = [];
    
    edges.forEach((edge) => {
      if (edge.id == selectedEdge.id) {
        if (tableType == "connectivity") {
          updatedEdges.push({
            ...edge, data: {...edge.data, connectivityTable: newTable},
          });
        } else {
          updatedEdges.push({
            ...edge, data: {...edge.data, vulnerabilityTable: newTable},
          });
        }
      } else {
        updatedEdges.push(edge);
      }
    })
    setEdges(updatedEdges);
  }
  
  const handleDragOver = useCallback((event) => {
    console.log("drag");
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  const handleDrop = (event) => {
    console.log("drop");
    event.preventDefault();
    
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
      data: { 
        label: `${name}`, 
        image: `${image}`, 
        type: 'Host', 
        systemTable: [{ type: '', value: '' }], 
        vulnerabilityTable: [{type: '', value: ''}]
      },
      draggable: true,
      sourcePosition: 'right',
      targetPosition: 'left',
      onclick: {onNodeClick}
      
    };
    
    addNode(newNode); 
  };
  
  const onConnect = (params) => {
    const newEdge = { 
      ...params, 
      id: `edge-${getId()}`, 
      data: { 
        label: '', 
        onLabelChange: handleEdgeLabelChange, 
        connectivityTable: [{ type: '', value: '' }], 
        vulnerabilityTable: [{ type: '', value: '' }] 
      }, 
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    }
    addEdge(newEdge);
  }
  
  const onNodeDrag = (event, node) => {
    addNode({ ...node, position: node.position });
    setPopUpPosition({
      x: node.position.right + 15,
      y: node.position.top
    })
  };

  const onNodeDragStop = (event, node) => {
    addNode({ ...node, position: node.position });
  };

  const closePopup = () => {
    setSelectedNode(null); 
    setSelectedEdge(null);
  };

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const handleFitView = useCallback(() => {
    fitView({ padding: 0.2, maxZoom: 1 });
  }, [fitView]);

  const onMove = () => {
    fitView();
  };

  return (
    <div className="dndflow">
      {!menuIsOpen && <Sidebar openMenu={toggleMenu}/>}
      {menuIsOpen && <HamburgerMenu closeMenu={toggleMenu} nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />}
      <div className={`reactflow-wrapper`} 
        ref={reactFlowWrapper} 
        onDrop={(event) => handleDrop(event)}
        onDragOver={(event) => handleDragOver(event)}
      >
        <ReactFlow
          defaultViewport={{ x: 0, y: 0, zoom: 0.25 }} 
          onInit={handleFitView}
          fitViewOptions={{ padding: 0.2, maxZoom: 2, minZoom: 0.01 }}
          onlyRenderVisibleElements={false}
          onMove={onMove}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onNodeDoubleClick={handleNodeDoubleClick}
          onEdgeDoubleClick={handleEdgeDoubleClick}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          onConnect={onConnect}
          draggable={true}
          panOnDrag
          zoomOnScroll
          fitView
        >
          <Background 
            color="#555"
            variant={BackgroundVariant.Dots} 
            gap={30} 
            size={2} 
          />
          <Controls />
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
      <ErrorBoundary>
        <FlowComponent />
      </ErrorBoundary>
    </DnDProvider>
  </ReactFlowProvider>
);
