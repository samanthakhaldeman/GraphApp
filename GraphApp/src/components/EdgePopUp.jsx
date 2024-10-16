import React, { useState, useEffect, useRef } from 'react';

import Table from "./Table";
import '../styles/index.css';

{/* <h3>Edge Properties</h3>
			<div>
				<button className="tab" onClick={() => setActiveTab('connectivity')} style={{ marginRight: '5px' }}>
				Connectivity
				</button>
				<button className="tab" onClick={() => setActiveTab('vulnerability')}>
				Vulnerability
				</button>
			</div>
			{renderTabContent()} */}

const EdgePopUp = ({ edge, position, onLabelChange, onTableChange, closePopup }) => {
	const [activeTab, setActiveTab] = useState('connectivity');
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

	if (!edge) return null; 

	const { x, y } = position; 

	const renderTabContent = () => {
		switch (activeTab) {
		    case 'connectivity':
                return (
                    <div>
                        <h3>Connectivity Properties</h3>
                        <Table table={edge.data.connectivityTable} onTableChange={onTableChange} tableType={activeTab} />
                    </div>
                );
            case 'vulnerability':
                return (
                    <div>
                        <h3>Vulnerability Properties</h3>
                        <Table table={edge.data.vulnerabilityTable} onTableChange={onTableChange} tableType={activeTab} />
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
		}}
		>
			<div className="row">
				<div className="row">
					<h3>Label:</h3>
					<input
						type="text"
						defaultValue={edge.data.label}
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
			<label>
				id: {edge.id}
			</label>
            <p><strong>Source:</strong> {edge.source}</p>
            <p><strong>Target:</strong> {edge.target}</p>
			<h3>Edge Properties</h3>
			<div>
				<button className="tab" onClick={() => setActiveTab('connectivity')} style={{ marginRight: '5px' }}>
				Connectivity
				</button>
				<button className="tab" onClick={() => setActiveTab('vulnerability')}>
				Vulnerability
				</button>
			</div>
			{renderTabContent()}
		</div>
	);
};

export default EdgePopUp;