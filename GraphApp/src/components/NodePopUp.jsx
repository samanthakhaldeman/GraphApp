import React, { useState, useEffect, useRef } from 'react';

import Table from "./Table";
import '../styles/index.css';

const NodePopUp = ({ node, position, onLabelChange, onTypeChange, onTableChange, closePopup }) => {
    const [selectedType, setSelectedType] = useState(node?.data.type || 'Host');
	const [activeTab, setActiveTab] = useState('system');
	const popupRef = useRef(); 

	
	useEffect(() => {
		const handleClickOutside = (event) => {
		if (popupRef.current && !popupRef.current.contains(event.target)) {
			closePopup(); 
		}
		};

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [closePopup]);

    // useEffect(() => {
    //     if (node) {
    //         setInputValue(node.data.label);
    //         setSelectedType(node.data.type || 'Host');
    //     }
    // }, [node]);

    const handleInputEnter = (e) => {
        if (e.key === 'Enter') {
            onLabelChange(e.target.value); 
        }
    }

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value); 
        onTypeChange(e.target.value);
    };

	if (!node) return null; 

	const { x, y } = position; 

	const renderTabContent = () => {
		switch (activeTab) {
		  case 'system':
			return (
			  <div>
				<h3>System Properties</h3>
				<Table nodeTable={node.data.systemTable} onTableChange={onTableChange} tableType={activeTab} />
			  </div>
			);
		  case 'vulnerability':
			return (
			  <div>
				<h3>Vulnerability Properties</h3>
				<Table nodeTable={node.data.vulnerabilityTable} onTableChange={onTableChange} tableType={activeTab} />
			  </div>
			);
		  default:
			return null;
		}
	  };

	return (
		<div ref={popupRef} className='node-pop-up'
		style={{
			position: 'absolute',
			top: `${y}px`,
			left: `${x}px`,
			zIndex: 1000, 
		}}
		>
			<label>
				<strong>Label:</strong>
				<input
					type="text"
					defaultValue={node.data.label}
					onKeyDown={(e) => handleInputEnter(e)}
				/>
			</label>
			<label style={{ display: 'block', marginTop: '10px' }}>
				<strong>Type:</strong>
				<select value={selectedType} onChange={handleTypeChange} style={{ marginLeft: '10px', padding: '5px' }}>
					<option value="Host">Host</option>
					<option value="Router">Router</option>
					<option value="Firewall">Firewall</option>
				</select>
			</label>
			<label>
				id: {node.id}
			</label>
			{node.data.image && <img src={node.data.image} style={{ width: '50px', height: '50px', marginTop: '10px' }} />}
			<h3>Node Properties</h3>
			<div>
				<button className="tab" onClick={() => setActiveTab('system')} style={{ marginRight: '5px' }}>
				System
				</button>
				<button className="tab" onClick={() => setActiveTab('vulnerability')}>
				Vulnerability
				</button>
			</div>
			{renderTabContent()}
		</div>
	);
};

export default NodePopUp;