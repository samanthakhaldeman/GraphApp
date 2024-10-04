import React, { useState, useEffect, useRef } from 'react';

import Table from "./Table";
import './index.css';

const NodePopUp = ({ node, position, onLabelChange, onTypeChange, onTableChange, closePopup }) => {
    const [selectedType, setSelectedType] = useState(node?.data.type || 'Host');
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
			<Table nodeTable={node.data.table} onTableChange={onTableChange} />
		</div>
	);
};

export default NodePopUp;