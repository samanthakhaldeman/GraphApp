import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { getFromNode, isConnectionInProgress } from '../App';
import '../styles/index.css';
 
const CustomNode = memo(({ id, data }) => {
  if (!id || !data) {
    console.log("error with id or data transfer to node, can't render");
    return null;
  }
 
  const isTarget = (getFromNode() != null) && (getFromNode() != id) && isConnectionInProgress();

  return (
    <div className="custom-node" pointerEvents='none'>
      <div
        className="custom-node-body"
      >
        <Handle 
        className="customHandle"
        style={{ zIndex: isTarget ? 10 : 0 }}
        position="left"
        type="target"
        id={`${id}-target`}
        isConnectableStart={true}
        />
        <Handle 
        className="customHandle"
        style={{ zIndex: isTarget ? 0 : 10 }}
        position="right"
        type="source"
        id={`${id}-source`}
        isConnectableEnd={true}
        />

      </div>
      <span className="drag-handle__custom" />
      <img src={data.image} className='node-image'></img>
      <div className='node-label'>{data.label}</div>
    </div>
  );
});

export default CustomNode;