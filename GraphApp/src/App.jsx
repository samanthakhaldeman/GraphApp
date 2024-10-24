import React, { useRef, useCallback, useState, useMemo } from 'react';
import ReactFlow from 'reactflow';
import {
  ReactFlowProvider,
  addEdge,
  Controls,
  useReactFlow,
  Background,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
// import { writeTextFile, readTextFile } from '@tauri-apps/api/fs';
// import { save, open } from '@tauri-apps/api/dialog';
import ErrorBoundary from './ErrorBoundary';

import CustomNode from './components/CustomNode';
import useStore from './store';
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
    console.log("edge selected");
    setSelectedEdge(edge);
    setSelectedNode(null);
  }

  const handleNodeDoubleClick = (event, node) => {
    const nodePosition = event.target.getBoundingClientRect();
    setSelectedNode(node);
    setPopUpPosition({
      x: nodePosition.right + 10,
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

  const onConnect = (params) => {
    const newEdge = { ...params, data: { label: '', onLabelChange: handleEdgeLabelChange, connectivityTable: [{ property: 'p1', value: 'v1' }], vulnerabilityTable: [{ property: 'p1', value: 'v1' }] } }
    addEdge(newEdge);
  }

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

    console.log("here 1?");
    
    if (!nodeType) {
      console.log("invalid node type");
      return;
    }

    console.log("here 2?");

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    console.log("here 3?");

    const newNode = {
      id: getId(),
      type: nodeType,
      position: position,
      data: { label: `${name}`, image: `${image}`, type: 'Host', systemTable: [{ property: '', value: '' }], vulnerabilityTable: [{property: '', value: ''}]},
      draggable: true,
      sourcePosition: 'right',
      targetPosition: 'left',
      onclick: {onNodeClick}
      
    };
    console.log("new node created");

    console.log(typeof setNodes);

    console.log(nodes);

    addNode(newNode);

    console.log('new node added');
    console.log(nodes);
  };

  const onNodeDrag = (event, node) => {
    addNode({ ...node, position: node.position });
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

  // const saveGraph = async () => {
  //   console.log("saving...");
  //   try {
  //     const filePath = await save({
  //       defaultPath: "graph.json",
  //       filters: [{ name: 'JSON Files', extensions: ['json'] }]
  //     });

  //     if (filePath) {
  //       const graphData = {
  //         nodes: nodes.map(node => ({ id: node.id, data: node.data, position: node.position, type: node.type })),
  //         edges: edges.map(edge => ({ id: edge.id, source: edge.source, target: edge.target, type: edge.type, data: edge.data })),
  //       };
        
  //       const json = JSON.stringify(graphData, null, 2);

  //       await writeTextFile(filePath, json);
  //       alert('FIle saved successfully as ${filePath}');
  //     };
  //   } catch (error) {
  //     console.error("Failed to save the file: ", error);
  //     alert("Failed to save the file. Please try again.");
  //   }
  // };

  // const loadGraph = async () => {
  //   try {
  //     const filePath = await open({
  //       filters: [{ name: 'JSON Files', extensions: ['json'] }]
  //     });

  //     if (filePath) {
  //       const fileContent = await readTextFile(filePath);

  //       const graphData = JSON.parse(fileContent);

  //       if (graphData.nodes && graphData.edges) {
  //         setNodes(graphData.nodes);
  //         setEdges(graphData.edges);
  //       } else {
  //         alert("Invalid graph data. Please check the file format.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Failed to load the graph:", error);
  //     alert("Failed to load the graph. Please try again.");
  //   }
  // }


  return (
    <div className="dndflow">
      {!menuIsOpen && <Sidebar openMenu={toggleMenu}/>}
      {/* {menuIsOpen && <HamburgerMenu closeMenu={toggleMenu} saveGraph={saveGraph} loadGraph={loadGraph} />} */}
      {menuIsOpen && <HamburgerMenu closeMenu={toggleMenu}/>}
      <div className={`reactflow-wrapper`} 
        ref={reactFlowWrapper} 
        onDrop={(event) => handleDrop(event)}
        onDragOver={(event) => handleDragOver(event)}
      >
        <ReactFlow
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
      <ErrorBoundary>
        <FlowComponent />
      </ErrorBoundary>
    </DnDProvider>
  </ReactFlowProvider>
);
