import AppContext from "@/context";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import EditGraphModal, { Node, NodeStatic, PathVertex } from "../Utils/EditGraphModal";
import Xarrow, { Xwrapper } from "react-xarrows";
import { PrimAlgorithmVisualizationInterface } from "@/app/interfaces/ShortestPathAlgorithmVIsualizerInterface";
import { primAlgorithm } from "@/app/visualization-algorithms/Prim";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
type Edge = [string, number];

const PrimAlgorithmVisualizer = () => {
    const {
        visualizationOption,
        speedValue,
        isPlaying,
        input,
        setMarkers
    } = useContext(AppContext);

    const [speed, setSpeed] = useState<number>(1);
    const [isPlayingValue, setIsPlayingValue] = useState<boolean>(true);
    const speedRef = useRef<number>(speed);
    const isPlayingRef = useRef<boolean>(isPlayingValue);
    const [showEditGraphModal, setShowEditGraphModal] = useState<boolean>(false);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [paths, setPaths] = useState<PathVertex[]>([]);
    const [graph, setGraph] = useState<Map<string, Edge[]>>(
        new Map<string, Edge[]>()
    );
    const animationsRef = useRef<PrimAlgorithmVisualizationInterface[]>([]);
    const [animations, setAnimations] = useState<PrimAlgorithmVisualizationInterface[]>([]);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [searchValue, setSearchValues] = useState<number[]>([]);

    useEffect(() => {
        isPlayingRef.current = isPlayingValue;
    }, [isPlayingValue]);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

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
        let newGraph = new Map<string, Edge[]>();
        let newNodes = [...nodes];
        let newPaths = [...paths];
        setNodes(nodes);
        setPaths(paths);
        setSelectedNode(null);
        setSearchValues([]);
        nodes.forEach(node => {
            newGraph.set(node.id, []);
        });
        paths.forEach(path => {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === path.startNodeId) {
                    let edges = newGraph.get(nodes[i].id) || [];
                    newGraph.set(nodes[i].id, edges.concat([[path.endNodeId, path.weigth]]));
                }
                if (nodes[i].id === path.endNodeId) {
                    let edges = newGraph.get(nodes[i].id) || [];
                    newGraph.set(nodes[i].id, edges.concat([[path.startNodeId, path.weigth]]));
                }
            }
        });
        
        setGraph(newGraph);
    };

    const resetNodesAndPaths = () => {
        const newNodes = [...nodes];
        const newPaths = [...paths];
        for (let i = 0; i < newNodes.length; i++) {
            newNodes[i].color = 'transparent';
        }
        for (let i = 0; i < newPaths.length; i++) {
            newPaths[i].color = 'black';
        }
        setNodes(newNodes);
        setPaths(newPaths);
        setSearchValues([]);
    };

    const visualizeGraph = () => {
        let animations: PrimAlgorithmVisualizationInterface[] = [];
            animations = primAlgorithm(graph);
            if (animationsRef.current.length > 0) {
                setAnimations([]);
                resetNodesAndPaths();
            } else {
                resetNodesAndPaths();
                animationsRef.current = animations;
                setAnimations(animations);
            }
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
                        searchValue
                    } = animation;
                    if (type === "node") {
                        for (let i = 0; i < newNodes.length; i++) {
                            if (newNodes[i].id === nodeId && nodeColor) {
                                newNodes[i].color = nodeColor;
                            }
                        }
                    } else if (type === "path") {
                        for (let i = 0; i < newPaths.length; i++) {
                            if (
                                (newPaths[i].startNodeId === pathStartId &&
                                    newPaths[i].endNodeId === pathEndId) ||
                                (newPaths[i].startNodeId === pathEndId &&
                                    newPaths[i].endNodeId === pathStartId)
                            ) {
                                if (pathColor !== undefined) {
                                    newPaths[i].color = pathColor;
                                }
                            }
                        }
                    }

                    if(searchValue){
                        let newSearchValues: number[] = [];
                        Array.from(searchValue).map(value => {
                            for (let i = 0; i < nodes.length; i++) {
                                if (nodes[i].id === value) {
                                    newSearchValues.push(nodes[i].value);
                                }
                            }
                        });
                        setSearchValues(newSearchValues);
                    }

                    setNodes(newNodes);
                    setPaths(newPaths);
                    await sleep(3000 / speedRef.current);
                    setAnimations(animationsRef.current);
                }
            }
        }
    };

    return (
        <>
            <EditGraphModal
                show={showEditGraphModal}
                handleClose={() => {
                    setShowEditGraphModal(false);
                }}
                buildGraph={buildGraph}
                setStartNode={setSelectedNode}
            />
            <div
                style={{
                    marginTop: '30px',
                }}
            >
                <Button
                    onClick={() => {
                        setShowEditGraphModal(true);
                    }}
                    style={{
                        marginBottom: '10px',
                    }}
                >
                    Edit Graph
                </Button>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '100%',
                    overflow: 'scroll',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: 800,
                        height: 800,
                        borderStyle: 'solid',
                    }}
                >
                    <Xwrapper>
                        {paths.map((path, index) => (
                            <div key={index}>
                                <Xarrow
                                    start={'node' + path.startNodeId}
                                    end={'node' + path.endNodeId}
                                    color={path.color}
                                    strokeWidth={5}
                                    path="straight"
                                    labels={{
                                        middle: (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    margin: '10px',
                                                }}
                                            >
                                                {path.weigth}
                                            </div>
                                        ),
                                    }}
                                />
                            </div>
                        ))}
                        {nodes.map((node, index) => (
                            <NodeStatic
                                key={index}
                                id={node.id}
                                value={node.value}
                                position={node.position}
                                color={node.color}
                            />
                        ))}
                    </Xwrapper>
                </div>
                <div
                    style={{
                        marginTop: '10px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignSelf: 'flex-start',
                        }}
                    >
                        {searchValue.map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        padding: '20px',
                                        borderStyle: 'solid',
                                        borderWidth: '2px',
                                        fontSize: '35px',
                                        width: 'fit-content',
                                    }}
                                >
                                    {value}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div
                    style={{
                        marginTop: '30px',
                        marginBottom: '30px',
                    }}
                >
                    <Button
                        onClick={async () => {
                            visualizeGraph();
                        }}
                    >
                        {animationsRef.current.length > 0 ? (
                            <FontAwesomeIcon icon={faStop} />
                        ) : (
                            <FontAwesomeIcon icon={faPlay} />
                        )}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default PrimAlgorithmVisualizer;
