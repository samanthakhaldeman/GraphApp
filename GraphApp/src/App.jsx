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
import SidePanel from './components/SidePanel';
import NodePopUp from './components/NodePopUp';
import EdgePopUp from './components/EdgePopUp';

import { DnDProvider } from './DnDContext';

import './styles/index.css';
import hostPic from '/src/assets/host.png';
import serverPic from '/src/assets/server.png';
import firewallPic from '/src/assets/firewall.png';
import routerPic from '/src/assets/router.png';

let node_id = 0;
const getNodeId = () => `node_${node_id++}`;
let edge_id = 0;
const getEdgeId = () => `edge_${edge_id++}`;

const FlowComponent= () => {
  const { fitView } = useReactFlow();
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const { nodes, edges, setNodes, setEdges, addNode, addEdge, removeNode, removeEdge } = useStore();
  const selectedNode = useRef(null);
  const selectedEdge = useRef(null);
  const [popUpNode, setPopUpNode] = useState(null);
  const [popUpEdge, setPopUpEdge] = useState(null);
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
      if (event.key === 'Backspace' && selectedNode.current && !popUpNode) {
        removeNode(selectedNode.current.id);
      }
      else if (event.key === 'Backspace' && selectedEdge.current && !popUpEdge) {
        removeEdge(selectedEdge.current.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNode.current, setNodes], [selectedEdge.current, setEdges]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'c') {
        if (selectedNode) {
          console.log("node copied");
          console.log(JSON.stringify(selectedNode));
          localStorage.setItem('copiedNode', JSON.stringify(selectedNode));
          console.log(localStorage.getItem('copiedNode'));
        }
      } else if (event.ctrlKey && event.key === 'v') {
        console.log(localStorage.getItem('copiedNode'));
        const copiedNode = JSON.parse(localStorage.getItem('copiedNode'));
        console.log(copiedNode.id, copiedNode.data);
        if (copiedNode) {
          const handlePaste = (mouseEvent) => {
            const { clientX, clientY } = mouseEvent;
            const canvasRect = document.querySelector('.react-flow__pane').getBoundingClientRect();
  
            const position = {
              x: clientX - canvasRect.left,
              y: clientY - canvasRect.top,
            };
  
            const newNode = {
              id: `${copiedNode.current.id}_copy_${getNodeId()}`, 
              type: copiedNode.current.type,
              position,
              data: { 
                label: `${copiedNode.current.data.label}_copy`,
                image: copiedNode.current.data.image,
                type: copiedNode.current.data.type,
                systemTable: copiedNode.current.data.systemTable,
                vulnerabilityTable: copiedNode.current.data.vulnerabilityTable
              }, 
              draggable: true,
              sourcePosition: 'right',
              targetPosition: 'left',
              onclick: {onNodeClick}
            };
            
            controlledAddNode(newNode);
            window.removeEventListener('mousemove', handlePaste);
          };
  
          window.addEventListener('mousemove', handlePaste, { once: true });
          console.log("node pasted");
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNode, nodes, setNodes]);

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
    setPopUpNode(node);
    setPopUpPosition({
      x: nodePosition.right + 15,
      y: nodePosition.top,
    });
  };

  const handleEdgeDoubleClick = (event, edge) => {
    const edgePosition = event.target.getBoundingClientRect();
    setPopUpEdge(edge);
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
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  
  const handleDrop = (event) => {
    event.preventDefault();
    
    const nodeType = event.dataTransfer.getData('application/reactflow/type');
    const name = event.dataTransfer.getData('application/reactflow/name');
    const image = getImage('Host');
    
    if (!nodeType) {
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    
    const newNodeId = getNodeId();
    const foundNode = nodes.find(node => node.id === newNodeId);
    if (!foundNode) {
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
      controlledAddNode(newNode);
    } 
  };

  const controlledAddNode = debounce((newNode) => {
    addNode(newNode);
  }, 100);
  
  const onConnect = (params) => {
    const newEdge = { 
      ...params, 
      id: `${getEdgeId()}`, 
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
    setPopUpEdge(null);
    setPopUpNode(null);
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
      <SidePanel nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
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
        {popUpNode && <NodePopUp node={popUpNode} position={popUpPosition} onLabelChange={handleNodeLabelChange} onTypeChange={handleTypeChange} onTableChange={handleNodeTableChange} closePopup={closePopup} />}
      </div>
      <div>
        {popUpEdge && <EdgePopUp edge={popUpEdge} position={popUpPosition} onLabelChange={handleEdgeLabelChange} onTableChange={handleEdgeTableChange} closePopup={closePopup} />}
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
