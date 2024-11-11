import React, { useState } from 'react';
import { useDnD } from '../DnDContext';

import '../styles/index.css';

export default ({openMenu}) => {
  const [_, setType] = useDnD();
  const [name, setName] = useState();

  const onDragStart = (event, nodeType, nodeName) => {
    console.log("start drag");
    setType(nodeType);
    setName(nodeName);

    event.dataTransfer.setData('application/reactflow/type', nodeType)
    event.dataTransfer.setData('application/reactflow/name', nodeName)
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <button className="hamburger-icon" onClick={openMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
      <h3 style={{marginTop: '60px', marginBottom: '15px'}}>You can drag these nodes to the pane on the right.</h3>
      <div className="custom-node" 
      onDragStart={(event) => onDragStart(event, 'custom', 'Node')} 
      draggable="true">
        Node
      </div>
    </aside>
  );
};