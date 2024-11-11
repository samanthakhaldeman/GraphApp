import React from 'react';
import '../styles/index.css';

import { saveGraph, loadGraph } from '../methodLogic/LoadSave';

const HamburgerMenu = ({closeMenu, setNodes, setEdges}, nodes, edges) => {

  const save = () => {
    saveGraph(nodes, edges);
  }

  const load = () => {
    loadGraph(setNodes, setEdges);
  }

  return (
    <aside className="hamburger-menu">
        <button className="regular" 
        style={{
            marginRight: '-7px',
            marginTop: '-10px', 
            marginLeft: '200px',
            marginBottom: '10px',
            borderRadius: '50%', 
            width: '25px',
            height: '25px',
            justifyContent: 'center', 
        }}
        onClick={closeMenu}
        >
            X
        </button>
        <button>New</button>
        <button onClick={save}>Save</button>
        <button onClick={load}>Load</button>
    </aside>
  );
};

export default HamburgerMenu;
