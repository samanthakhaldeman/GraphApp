import React, { useState } from 'react';
import ReactFlow, { useEdgesState, useNodesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

// Custom Edge Component
const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, data }) => {
  const [label, setLabel] = useState(data.label || '');

  const onChange = (event) => {
    setLabel(event.target.value);
    data.onLabelChange(id, event.target.value); // Call a function to update the label in the parent
  };

  return (
    <g>
      <path className="react-flow__edge-path" d={`M${sourceX},${sourceY} L${targetX},${targetY}`} />
      <foreignObject
        width={80}
        height={30}
        x={(sourceX + targetX) / 2 - 40}
        y={(sourceY + targetY) / 2 - 15}
        style={{ overflow: 'visible' }}
      >
        <input
          type="text"
          value={label}
          onChange={onChange}
          style={{ width: '100%', border: '1px solid black', padding: '2px', fontSize: '12px' }}
        />
      </foreignObject>
    </g>
  );
};

// Parent Component
const FlowComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = (params) =>
    setEdges((eds) =>
      addEdge({ ...params, data: { label: '', onLabelChange: updateEdgeLabel } }, eds)
    );

  const updateEdgeLabel = (id, newLabel) => {
    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === id ? { ...edge, data: { ...edge.data, label: newLabel } } : edge
      )
    );
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      edgeTypes={{ custom: CustomEdge }}
    />
  );
};
