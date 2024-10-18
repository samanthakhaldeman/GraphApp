import React, { useState } from 'react';
import '../styles/index.css';

const HamburgerMenu = ({closeMenu, saveGraph}) => {

  return (
    <div className="hamburger-menu">
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
        <button onClick={saveGraph}>Save</button>
        <button>Load</button>
    </div>
  );
};

export default HamburgerMenu;
