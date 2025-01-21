import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { useConnection } from '@xyflow/react';
import '../styles/index.css';
 
const CustomNode = memo(({ id, data }) => {
  if (!id || !data) {
    console.log("error with id or data transfer to node, can't render");
    return null;
  }
  const connection = useConnection();
 
  const isTarget = connection.inProgress && connection.fromNode.id !== id;
  console.log("connection in progress: ", connection.inProgress);
  console.log("isTarget: ", isTarget);

  const label = isTarget ? 'Drop' : 'Drag';
 
  return (
    <div className="custom-node" pointerEvents='none'>
      <div
        className="custom-node-body"
      >
        {!connection.inProgress && (
          <Handle
          className="customHandle"
          position={Position.Right}
          type="source"
          id={`${id}-source`}
          isConnectable
          />
        )}
        {(!connection.inProgress || isTarget) && (
          <Handle 
          className="customHandle" 
          position={Position.Left} 
          type="target" 
          isConnectableStart={false} 
          id={`${id}-target`} 
          isConnectable
          />
        )}
      </div>
      <span className="drag-handle__custom" />
      <img src={data.image} className='node-image'></img>
      <div className='node-label'>{label}</div>
    </div>
  );
});

export default CustomNode;