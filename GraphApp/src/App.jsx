import React, { useRef, useCallback, useState, useMemo, useEffect } from 'react';
import ReactFlow, { MarkerType } from 'reactflow';
import {
  ReactFlowProvider,
  Controls,
  useReactFlow,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { debounce } from 'lodash';

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
  const { nodes, edges, setNodes, setEdges, addNode, addEdge, removeNode, removeEdge } = useStore();
  const selectedNode = useRef(null);
  const selectedEdge = useRef(null);
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace' && selectedNode.current) {
        removeNode(selectedNode.current.id);
      }
      else if (event.key === 'Backspace' && selectedEdge.current) {
        removeEdge(selectedEdge.current.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNode.current, setNodes], [selectedEdge.current, setEdges]);

  const onNodesChange = (changes) => {
    setNodes(nodes);
  };

  const onEdgesChange = (changes) => {
    setEdges(edges);
  };

  const onNodeClick = (event, node) => {
    selectedNode.current = node;
    selectedEdge.current = null;
  };

  const onEdgeClick = (event, edge) => {
    selectedNode.current = null;
    selectedEdge.current = edge;
  }

  const handleNodeDoubleClick = (event, node) => {
    const nodePosition = event.target.getBoundingClientRect();
    selectedNode.current = node;
    setPopUpPosition({
      x: nodePosition.right + 15,
      y: nodePosition.top,
    });
  };

  const handleEdgeDoubleClick = (event, edge) => {
    const edgePosition = event.target.getBoundingClientRect();
    selectedEdge.current = edge;
    setPopUpPosition({
      x: edgePosition.right + 10, 
      y: edgePosition.top,
    });
  }
  
  const handleNodeLabelChange = (newName) => {
    const updatedNodes = [];
    
    nodes.forEach((node) => {
      if (node.id === selectedNode.current.id) {
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
      if (edge.id === selectedEdge.current.id) {
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
      if (node.id == selectedNode.current.id) {
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
      if (node.id == selectedNode.current.id) {
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
      if (edge.id == selectedEdge.current.id) {
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
    
    console.log("node type post transfer: ", nodeType);
    if (!nodeType) {
      console.log("invalid node type");
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    
    const newNodeId = getId();
    const foundNode = nodes.find(node => node.id === newNodeId);
    if (!foundNode) {
      console.log("calling controlledAddNode");
      controlledAddNode(newNodeId, nodeType, position, name, image);
    } 
  };

  const controlledAddNode = debounce((newNodeId, nodeType, position, name, image) => {
    const newNode = {
      id: newNodeId,
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
    console.log("nodes before add: ", nodes.length);
    addNode(newNode);
    console.log("nodes after add: ", nodes.length);
  }, 100);
  
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
    selectedNode.current = null;
    selectedEdge.current = null;
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
        {selectedNode.current && <NodePopUp node={selectedNode.current} position={popUpPosition} onLabelChange={handleNodeLabelChange} onTypeChange={handleTypeChange} onTableChange={handleNodeTableChange} closePopup={closePopup} />}
      </div>
      <div>
        {selectedEdge.current && <EdgePopUp edge={selectedEdge.current} position={popUpPosition} onLabelChange={handleEdgeLabelChange} onTableChange={handleEdgeTableChange} closePopup={closePopup} />}
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
