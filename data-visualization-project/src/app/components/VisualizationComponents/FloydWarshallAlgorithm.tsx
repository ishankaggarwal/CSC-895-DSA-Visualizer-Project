import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Xarrow, { Xwrapper } from "react-xarrows";
import AppContext from "@/context";
import EditGraphModal, { Node, NodeStatic, PathVertex } from "../Utils/EditGraphModal";
import './Table.css';
import { FloydWarshallVisualizationInterface } from "@/app/interfaces/ShortestPathAlgorithmVIsualizerInterface";
import { floydWarshallAlgorithm } from "@/app/visualization-algorithms/FloydWarshall";
import { deepCopyMap } from "./QuickSortArrayVisualizer";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

interface Cell {
    id: string;
    value: string;
    color: string;
}

interface TableInterface {
    headers: Node[];
    matrix: Map<string, Cell[]>;
}

const StyledTable: React.FC<TableInterface> = ({ headers, matrix }) => {
    const [data, setData] = useState<Cell[][]>([]);

    useEffect(() => {
        let newData: Cell[][] = [];
        for (let i = 0; i < headers.length; i++) {
            let rowData: Cell[] = [];
            for (let j = 0; j < headers.length; j++) {
                rowData.push({
                    id: "",
                    value: "",
                    color: ""
                });
            }
            newData.push([...rowData]);
        }
        for (const key of Array.from(matrix.keys())) {
            let values = matrix.get(key);
            if (values) {
                for (const value of values) {
                    for (let i = 0; i < headers.length; i++) {
                        if (headers[i].id === key) {
                            for (let j = 0; j < headers.length; j++) {
                                if (headers[j].id === value.id) {
                                    newData[i][j] = value;
                                }
                            }
                        }
                    }
                }
            }
        }
        setData(newData);
    }, [matrix]);

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    {headers.map((header, i) => (
                        <th key={i}>{header.value}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        <th>{headers[i] && headers[i].value}</th>
                        {row.map((cell, j) => (
                            <td key={j} style={{
                                backgroundColor: cell.color
                            }}>{cell.value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

const FloydWarshallAlgorithmVisualizer = () => {
    const {
        visualizationOption,
        speedValue,
        isPlaying,
        setMarkers
    } = useContext(AppContext);

    const [speed, setSpeed] = useState<number>(1);
    const [isPlayingValue, setIsPlayingValue] = useState<boolean>(true);
    const speedRef = useRef<number>(speed);
    const isPlayingRef = useRef<boolean>(isPlayingValue);
    const [showEditGraphModal, setShowEditGraphModal] = useState<boolean>(false);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [paths, setPaths] = useState<PathVertex[]>([]);
    const [graph, setGraph] = useState<Map<string, [string, number][]>>(new Map<string, [string, number][]>());
    const animationsRef = useRef<FloydWarshallVisualizationInterface[]>([]);
    const [animations, setAnimations] = useState<FloydWarshallVisualizationInterface[]>([]);
    const [matrix, setMatrix] = useState<Map<string, Cell[]>>(new Map<string, Cell[]>());

    useEffect(() => {
        isPlayingRef.current = isPlayingValue;
    }, [isPlayingValue]);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    useEffect(() => {
        setIsPlayingValue(isPlaying);
    }, [isPlaying]);

    useEffect(() => {
        isPlayingRef.current = isPlayingValue;
        processAnimations();
    }, [isPlayingValue]);

    useEffect(() => {
        setSpeed(speedValue);
    }, [speedValue]);

    useEffect(() => {
        async function rerender() {
            animationsRef.current = [...animations];
            await processAnimations();
        }
        rerender();
    }, [animations]);

    useEffect(() => {
        if (animationsRef.current.length > 0) {
            setAnimations([]);
        }
    }, [graph]);

    const buildGraph = (nodes: Node[], paths: PathVertex[]) => {
        let newGraph = new Map<string, [string, number][]>();
        let newNodes = [...nodes];
        let newPaths = [...paths];
        let newMatrix: Map<string, Cell[]> = new Map<string, Cell[]>();
        let emptyCellRow: Cell[] = newNodes.map(node => {
            return {
                id: node.id,
                value: '',
                color: 'yellow'
            };
        });
        for (let i = 0; i < newNodes.length; i++) {
            newNodes[i].color = 'transparent';
            newMatrix.set(newNodes[i].id, [...emptyCellRow]);
        }
        for (let i = 0; i < newPaths.length; i++) {
            newPaths[i].color = 'black';
        }
        setNodes(nodes);
        setPaths(paths);
        setMatrix(newMatrix);
        nodes.forEach(node => {
            newGraph.set(node.id, []);
        });
        paths.forEach(path => {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === path.startNodeId) {
                    let endNodes = newGraph.get(nodes[i].id);
                    if (endNodes) {
                        endNodes.push([path.endNodeId, path.weigth]);
                        newGraph.set(nodes[i].id, endNodes);
                    }
                }
            }
        });

        setGraph(newGraph);
    };

 
    const resetNodesAndPaths = () => {
        const newNodes = [...nodes];
        const newPaths = [...paths];
        let newMatrix: Map<string, Cell[]> = new Map<string, Cell[]>();
        let emptyCellRow: Cell[] = newNodes.map(node => {
            return {
                id: node.id,
                value: '',
                color: 'yellow'
            };
        });

        for (let i = 0; i < newNodes.length; i++) {
            newNodes[i].color = 'transparent';
        }
        for (let i = 0; i < newPaths.length; i++) {
            newPaths[i].color = 'black';
        }
        for (let i = 0; i < newNodes.length; i++) {
            newNodes[i].color = 'transparent';
            newMatrix.set(newNodes[i].id, [...emptyCellRow]);
        }
        setNodes(newNodes);
        setPaths(newPaths);
        setMatrix(newMatrix);
    };

    const visualizeGraph = () => {
        let animations: FloydWarshallVisualizationInterface[] = [];
        animations = floydWarshallAlgorithm(graph);

        if (animationsRef.current.length > 0) {
            setAnimations([]);
            resetNodesAndPaths();
        } else {
            resetNodesAndPaths();
            setAnimations(animations);
        }
    };

    const handleStartNodeValue = () => {
    };

    const processAnimations = async () => {
        if (animationsRef.current.length > 0) {

            if (isPlayingRef.current) {
                const animation = animationsRef.current.shift();
                let newNodes = [...nodes];
                let newPaths = [...paths];
                if (animation) {
                    const {
                        type,
                        nodeId,
                        pathStartId,
                        pathEndId,
                        nodeColor,
                        pathColor,
                        currentLineMarkers,
                        rowNodeID,
                        columnNodeID,
                        distance,
                        cellColor,
                    } = animation;
                    
                    if (type === "node") {
                        for (let i = 0; i < newNodes.length; i++) {
                            if (newNodes[i].id === nodeId && nodeColor) {
                                newNodes[i].color = nodeColor;
                            }else if(newNodes[i].id === columnNodeID){
                                newNodes[i].color = "yellow";
                            }else{
                                newNodes[i].color = "transparent";
                            }
                        }
                    } else if (type === "path") {
                        for (let i = 0; i < newPaths.length; i++) {
                            if (newPaths[i].startNodeId === pathStartId && newPaths[i].endNodeId === pathEndId && pathColor) {
                                newPaths[i].color = pathColor;
                            }else{
                                newPaths[i].color = "black";
                            }
                        }
                    }                
                    if (rowNodeID && columnNodeID && distance !== undefined && cellColor) {
                        let newMatrix = deepCopyMap(matrix);
                    
                        // Loop through all rows in the matrix
                        newMatrix.forEach((values, currentRowNodeID) => {
                            // Loop through all columns in the row
                            values.forEach((value) => {
                                // Set the color to transparent for all columns
                                value.color = "transparent";
                            });
                    
                            // Update the value for the specified column if it's the current row
                            if (currentRowNodeID === rowNodeID) {
                                let newValue: Cell = {
                                    id: columnNodeID,
                                    value: distance,
                                    color: cellColor
                                };
                    
                                let indexToSet = values.findIndex((value) => value.id === columnNodeID);
                                if (indexToSet !== -1) {
                                    values[indexToSet] = newValue;
                                } else {
                                    values.push(newValue); // If the column doesn't exist, add it to the row
                                }
                            }
                    
                            newMatrix.set(currentRowNodeID, [...values]);
                        });
                    
                        setMatrix(newMatrix);
                    }
                    
                    setNodes(newNodes);
                    setPaths(newPaths);
                    setMarkers(currentLineMarkers);
                    await sleep(3000 / speedRef.current);
                    setAnimations(animationsRef.current);
                }
            }
        }
    };

    return (
        <>
            <EditGraphModal show={showEditGraphModal}
            handleClose={() => {
                setShowEditGraphModal(false);
            } }
            buildGraph={buildGraph} 
            setStartNode= {handleStartNodeValue}  
                 />
            <div style={{
                marginTop: '30px',
            }}>
                <Button onClick={() => {
                    setShowEditGraphModal(true);
                }} style={{
                    marginBottom: '10px'
                }}>
                    Edit Graph
                </Button>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '100%',
                overflow: 'scroll',
            }}>
                <div style={{
                    position: 'relative',
                    width: 800,
                    height: 800,
                    borderStyle: 'solid',
                }}>
                    <Xwrapper>
                        {paths.map((path, index) => (
                            <div key={index}>
                                <Xarrow start={'node' + path.startNodeId} end={'node' + path.endNodeId} color={path.color} strokeWidth={5} path="straight" labels={{
                                    middle: (visualizationOption !== 0 && visualizationOption !== 1) ? <div style={
                                        {
                                            position: 'absolute',
                                            margin: '10px'
                                        }
                                    }>{path.weigth}</div>
                                        : <></>
                                }} />
                            </div>
                        ))}
                        {nodes.map((node, index) => (
                            <NodeStatic key={index} id={node.id} value={node.value} position={node.position} color={node.color} />
                        ))}
                    </Xwrapper>
                </div>
                <div style={{
                    marginTop: '10px',
                }}>
                    <div style={{
                        marginTop: '10px'
                    }}>
                        <StyledTable headers={nodes.sort((a, b) => {
                            if (a.value < b.value) {
                                return -1;
                            }
                            if (a.value > b.value) {
                                return 1;
                            }
                            return 0;
                        })} matrix={matrix} />
                    </div>
                </div>
                <div style={{
                    marginTop: '30px',
                    marginBottom: '30px'
                }}>
                    <Button onClick={async () => {
                        visualizeGraph();
                    }}>
                        {animationsRef.current.length > 0 ? <FontAwesomeIcon icon={faStop} /> :
                            <FontAwesomeIcon icon={faPlay} />}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default FloydWarshallAlgorithmVisualizer;
