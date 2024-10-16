import React, { useState } from 'react';
import { useDnD } from '../DnDContext';

import '../styles/index.css';

export default () => {
  const [_, setType] = useDnD();
  const [name, setName] = useState();

  const onDragStart = (event, nodeType, nodeName) => {
    setType(nodeType);
    setName(nodeName);

    event.dataTransfer.setData('application/reactflow/type', nodeType)
    event.dataTransfer.setData('application/reactflow/name', nodeName)
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <h3>You can drag these nodes to the pane on the right.</h3>
      <div className="dndnode" 
      onDragStart={(event) => onDragStart(event,'default','Node')} 
      draggable="true"
      style={{
        borderRadius: '50%'
      }}>
        Node
      </div>
    </aside>
  );
};