import React, { useState } from 'react';
import { useToggle } from '../hooks/useToggle';
import '../styles/index.css';

import { saveGraph, loadGraph } from '../hooks/LoadSave';

const FileSystemPanel = ({ nodes, edges, setNodes, setEdges}) => {

  const [preview, togglePreview] = useToggle(false);
  const [previewContent, setPreviewContent] = useState('');

  const generateFilePreview = () => {
    const reader = new FileReader();

    reader.onload = () => {
      setPreviewContent(reader.result);
    };
  
    const graphData = {
      nodes: nodes.map(node => ({ id: node.id, data: node.data, position: node.position, type: node.type })),
      edges: edges.map(edge => ({ id: edge.id, source: edge.source, target: edge.target, markerEnd: edge.markerEnd, type: edge.type, data: edge.data })),
    };
  
    const json_text = JSON.stringify(graphData, null, 2);

    if (json_text) {
      const blob = new Blob([json_text], { type: 'json' });
      reader.readAsText(blob); 
    }
  }

  const save = () => {
    saveGraph(nodes, edges);
  }

  const load = () => {
    loadGraph(setNodes, setEdges);
  }

  const Preview = () => {
    generateFilePreview();
    return (
      <div className='preview'>
        <textarea
          value={previewContent}
          readOnly
          style={{ width: '100%', height: '300px' }}
        />
      </div>
    );
  }

  return (
    <aside className="panel">
        <button>New</button>
        <button onClick={save}>Save</button>
        <button onClick={load}>Load</button>
        <button >Convert</button>
        <button onClick={togglePreview}>Preview File</button>
        {preview && <Preview />}
    </aside>
  );
};

export default FileSystemPanel;
