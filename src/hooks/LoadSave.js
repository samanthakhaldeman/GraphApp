import { writeTextFile, readTextFile } from '@tauri-apps/plugin-fs';
import { save, open } from '@tauri-apps/plugin-dialog';
import { setNodeCount, setEdgeCount } from '../App';

export const saveGraph = async (nodes, edges) => {
    console.log("nodes length: ", nodes.length);
    console.log("edges length: ", edges.length);
    console.log("saving...");
    try {
        const filePath = await save({
            defaultPath: "graph.json",
            filters: [{ name: 'JSON Files', extensions: ['json'] }]
        });

        if (filePath) {
            const graphData = {
                nodes: nodes.map(node => ({ id: node.id, type: node.type, dragHandle: node.dragHandle, position: node.position, data: node.data, onclick: node.onclick })),
                edges: edges.map(edge => ({ id: edge.id, markerEnd: edge.markerEnd, source: edge.source, sourceHandle: edge.sourceHandle, target: edge.target, targetHandle: edge.targetHandle, type: edge.type })),
            };
            
            const json = JSON.stringify(graphData, null, 2);

            await writeTextFile(filePath, json);
            alert(`File saved successfully as ${filePath}`);
        };
    } catch (error) {
        console.error("Failed to save the file: ", error);
        alert("Failed to save the file. Please try again.");
    }
};

export const loadGraph = async (setNodes, setEdges) => {
    try {
        const filePath = await open({
            filters: [{ name: 'JSON Files', extensions: ['json'] }]
        });

        if (filePath) {
            const fileContent = await readTextFile(filePath);

            const graphData = JSON.parse(fileContent);

            if (graphData.nodes && graphData.edges) {
                setNodes(graphData.nodes);
                setNodeCount(graphData.nodes.length);
                setEdges(graphData.edges);
                setEdgeCount(graphData.edges.length);
            } else {
                alert("Invalid graph data. Please check the file format.");
            }
        }
    } catch (error) {
        console.error("Failed to load the graph:", error);
        alert("Failed to load the graph. Please try again.");
    }
};
  