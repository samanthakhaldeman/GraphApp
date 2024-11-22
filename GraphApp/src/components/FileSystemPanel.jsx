import React from 'react';
import '../styles/index.css';

import { saveGraph, loadGraph } from '../hooks/LoadSave';

const FileSystemPanel = ({ nodes, edges, setNodes, setEdges}) => {

  const save = () => {
    saveGraph(nodes, edges);
  }

  const load = () => {
    loadGraph(setNodes, setEdges);
  }

  return (
    <aside className="panel">
        <button>New</button>
        <button onClick={save}>Save</button>
        <button onClick={load}>Load</button>
    </aside>
  );
};

export default FileSystemPanel;
