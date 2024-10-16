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
	console.log(typeof node.data.systemTable);

	const renderTabContent = () => {
		switch (activeTab) {
		  case 'system':
			return (
			  <div>
				<strong>System Properties</strong>
				<Table table={node.data.systemTable} onTableChange={onTableChange} tableType={activeTab} />
			  </div>
			);
		  case 'vulnerability':
			return (
			  <div>
				<strong>Vulnerability Properties</strong>
				<Table table={node.data.vulnerabilityTable} onTableChange={onTableChange} tableType={activeTab} />
			  </div>
			);
		  default:
			return null;
		}
	  };

	return (
		<div ref={popupRef} className='pop-up'
		style={{
			position: 'absolute',
			top: `${y}px`,
			left: `${x}px`,
			zIndex: 1000,
			width: '300px',  
		}}
		>
			<div className="row">
				<div className="row">
					<h3>Label:</h3>
					<input
						type="text"
						defaultValue={node.data.label}
						onKeyDown={(e) => handleInputEnter(e)}
					/>
				</div>
				<button className="regular" 
				style={{
					marginRight: '-7px',
					marginTop: '-10px', 
					marginLeft: '115px',
					borderRadius: '50%', 
					width: '25px',
					height: '25px',
					justifyContent: 'center', 
				}}
				onClick={closePopup}
				>
					X
				</button>
			</div>
			<div className='row' style={{ marginTop: '5px' }}>
				<h3>Type:</h3>
				<select value={selectedType} onChange={handleTypeChange} style={{ marginLeft: '5px', padding: '5px' }}>
					<option value="Host">Host</option>
					<option value="Router">Router</option>
					<option value="Firewall">Firewall</option>
				</select>
			</div>
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