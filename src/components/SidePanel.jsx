import React from 'react';

import '../styles/index.css';
import { useToggle } from '../hooks/useToggle';

import FileSystemPanel from './FileSystemPanel';
import AnalysisPanel from './AnalysisPanel';
import ComponentPanel from './ComponentPanel';

import FileSystemIcon from '../assets/FileSystem.png';
import AnalysisIcon from '../assets/Analysis.png';
import ComponentIcon from '../assets/Components.png';

const  SidePanel = ({nodes, edges, setNodes, setEdges}) => {
    const [fileSystem, toggleFileSystem] = useToggle(false);
    const [analysis, toggleAnalysis] = useToggle(false);
    const [components, toggleComponents] = useToggle(true);

    const handleFileSystem = () => {
        toggleFileSystem();
        if (analysis) {toggleAnalysis();}
        if (components) {toggleComponents();}
    }

    const handleAnalysis = () => {
        toggleAnalysis();
        if (fileSystem) {toggleFileSystem();}
        if (components) {toggleComponents();}
    }

    const handleComponents = () => {
        toggleComponents();
        if (fileSystem) {toggleFileSystem();}
        if (analysis) {toggleAnalysis();}
    }

    const getPanelSize = () => {
        if (fileSystem || analysis || components) {
            return 'sidepanel large';
        }
        else {
            return 'sidepanel small';
        }
    }

    return (
        <div className={getPanelSize()}> 
            <aside className='sidepanel-buttons'>
                <button className={'sidepanel-icon page-' + fileSystem} onClick={handleFileSystem}>
                    <img className='sidepanel-icon-image' src={FileSystemIcon} alt='File' />
                </button>
                <button className={'sidepanel-icon page-' + analysis} onClick={handleAnalysis}>
                    <img className='sidepanel-icon-image' src={AnalysisIcon} alt='Analysis' />
                </button>
                <button className={'sidepanel-icon page-' + components} onClick={handleComponents}>
                    <img className='sidepanel-icon-image' src={ComponentIcon} alt='Components'/>
                </button>
            </aside>
            {fileSystem && <FileSystemPanel nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />}
            {analysis && <AnalysisPanel />}
            {components && <ComponentPanel />}
        </div>
    )
};

export default SidePanel;