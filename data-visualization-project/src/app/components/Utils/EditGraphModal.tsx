"use client";
import AppContext from "@/context";
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Alert, Button, Form, Modal, OverlayTrigger } from "react-bootstrap";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import Xarrow, { Xwrapper } from "react-xarrows";
import { v4 as uuidv4 } from "uuid";
import Papa from "papaparse";
import { renderTooltip } from "./InputBox";

interface PathInterface {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}

type Force = { x: number; y: number };

function clamp(min: number, max: number, value: number) {
  return Math.min(Math.max(value, min), max);
}

const Path: React.FC<PathInterface> = ({ x1, y1, x2, y2 }) => {
  return (
    <>
      <marker
        id="arrow"
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        marker-end="url(#arrow)"
        strokeWidth={5}
      />
    </>
  );
};

export interface Node {
  id: string;
  value: number;
  position: { x: number; y: number };
  color: string;
}

interface NodeInterface {
  id: string;
  value: number;
  position: { x: number; y: number };
  handleDrag: (e: DraggableEvent, data: DraggableData, id: string) => void;
  handleDragEnd: (e: DraggableEvent, data: DraggableData, id: string) => void;
  index: number;
  handleSetPath: (
    value: boolean,
    leftCoordinate: string,
    topCoordinate: string
  ) => void;
  graphRef: React.RefObject<HTMLDivElement>;
  path: boolean;
  handleValueOfInitialVertex: (value: string) => void;
  handleValueOfFinalVertex: (value: string) => void;
  handleFinalNode: (value: string) => void;
  changeValueOfVertex: (value: number, id: string) => void;
  deleteNode: (id: string) => void;
  cursor: "crosshair" | "pointer";
}

export interface PathVertex {
  startNodeId: string;
  endNodeId: string;
  weigth: number;
  color: string;
}
const Node: React.FC<NodeInterface> = ({
  id,
  value,
  position,
  handleDrag,
  handleDragEnd,
  index,
  handleSetPath,
  graphRef,
  path,
  handleValueOfInitialVertex,
  handleValueOfFinalVertex,
  handleFinalNode,
  changeValueOfVertex,
  deleteNode,
  cursor,
}) => {
  // State to manage the position of the node

  const getElementWidth = (id: string) => {
    const width = document.getElementById(id)?.offsetWidth;
    if (width) {
      return width;
    }
    return 0;
  };

  const getElementHeight = (id: string) => {
    const height = document.getElementById(id)?.offsetHeight;
    if (height) {
      return height;
    }
    return 0;
  };

  return (
    <>
      <Button
        style={{
          position: "absolute",
          top: position.y - getElementHeight("button-1-" + id),
          left:
            position.x +
            (getElementWidth(id) / 2 - getElementWidth("button-1-" + id) / 2),
          pointerEvents: "all",
          color: "black",
          backgroundColor: "transparent",
          borderStyle: "none",
        }}
        onMouseDown={(e) => {
          if (graphRef.current) {
            var bounds = graphRef.current.getBoundingClientRect();
            var x = e.clientX - bounds.left;
            var y = e.clientY - bounds.top;
            handleSetPath(true, x.toString(), y.toString());
            handleValueOfInitialVertex(id);
          }
        }}
        onMouseUp={(e) => {
          if (path && graphRef.current) {
            var bounds = graphRef.current.getBoundingClientRect();
            var x = e.clientX - bounds.left;
            var y = e.clientY - bounds.top;
            handleValueOfFinalVertex(id);
          }
          handleSetPath(false, "", "");
        }}
        id={"button-1-" + id}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </Button>
      <Button
        style={{
          position: "absolute",
          top:
            position.y +
            (getElementHeight(id) / 2 - getElementHeight("button-2-" + id) / 2),
          left: position.x + getElementWidth(id),
          pointerEvents: "all",
          color: "black",
          backgroundColor: "transparent",
          borderStyle: "none",
        }}
        onMouseDown={(e) => {
          if (graphRef.current) {
            var bounds = graphRef.current.getBoundingClientRect();
            var x = e.clientX - bounds.left;
            var y = e.clientY - bounds.top;
            handleSetPath(true, x.toString(), y.toString());
            handleValueOfInitialVertex(id);
          }
        }}
        onMouseUp={(e) => {
          if (path && graphRef.current) {
            var bounds = graphRef.current.getBoundingClientRect();
            var x = e.clientX - bounds.left;
            var y = e.clientY - bounds.top;
            handleValueOfFinalVertex(id);
          }
          handleSetPath(false, "", "");
        }}
        id={"button-2-" + id}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
      <Button
        style={{
          position: "absolute",
          top: position.y + getElementHeight(id),
          left:
            position.x +
            (getElementWidth(id) / 2 - getElementWidth("button-3-" + id) / 2),
          pointerEvents: "all",
          color: "black",
          backgroundColor: "transparent",
          borderStyle: "none",
        }}
        onMouseDown={(e) => {
          if (graphRef.current) {
            var bounds = graphRef.current.getBoundingClientRect();
            var x = e.clientX - bounds.left;
            var y = e.clientY - bounds.top;
            handleSetPath(true, x.toString(), y.toString());
            handleValueOfInitialVertex(id);
          }
        }}
        onMouseUp={(e) => {
          if (path && graphRef.current) {
            var bounds = graphRef.current.getBoundingClientRect();
            var x = e.clientX - bounds.left;
            var y = e.clientY - bounds.top;
            handleValueOfFinalVertex(id);
          }
          handleSetPath(false, "", "");
        }}
        id={"button-3-" + id}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </Button>
      <Button
        style={{
          position: "absolute",
          top:
            position.y +
            (getElementHeight(id) / 2 - getElementHeight("button-4-" + id) / 2),
          left: position.x - getElementWidth("button-4-" + id),
          pointerEvents: "all",
          color: "black",
          backgroundColor: "transparent",
          borderStyle: "none",
        }}
        onMouseDown={(e) => {
          if (graphRef.current) {
            var bounds = graphRef.current.getBoundingClientRect();
            var x = e.clientX - bounds.left;
            var y = e.clientY - bounds.top;
            handleSetPath(true, x.toString(), y.toString());
            handleValueOfInitialVertex(id);
          }
        }}
        onMouseUp={(e) => {
          if (path && graphRef.current) {
            var bounds = graphRef.current.getBoundingClientRect();
            var x = e.clientX - bounds.left;
            var y = e.clientY - bounds.top;
            handleValueOfFinalVertex(id);
          }
          handleSetPath(false, "", "");
        }}
        id={"button-4-" + id}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <Draggable
        position={position}
        onDrag={(e, data) => {
          handleDrag(e, data, id);
        }}
        onStop={(e, data) => {
          handleDragEnd(e, data, id);
        }}
        disabled={path}
      >
        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: "100%",
            borderStyle: "solid",
            width: "fit-content",
            cursor: "pointer",
            position: "absolute",
            pointerEvents: "all",
          }}
          id={id}
          onMouseUp={(e) => {
            if (path && graphRef.current) {
              var bounds = graphRef.current.getBoundingClientRect();
              var x = e.clientX - bounds.left;
              var y = e.clientY - bounds.top;
              handleValueOfFinalVertex(id);
            }
            handleSetPath(false, "", "");
          }}
          onMouseEnter={(e) => {
            handleFinalNode(id);
          }}
          onMouseOut={(e) => {
            handleFinalNode("");
          }}
          onMouseDown={(e) => {
            if (cursor === "crosshair") {
              deleteNode(id);
            }
          }}
        >
          <input
            type="number"
            value={value}
            onChange={(e) => {
              changeValueOfVertex(Number(e.target.value), id);
            }}
            style={{
              backgroundColor: "transparent",
              textAlign: "center",
              borderWidth: 0,
              color: "black",
            }}
            onMouseUp={(e) => {
              if (path && graphRef.current) {
                var bounds = graphRef.current.getBoundingClientRect();
                var x = e.clientX - bounds.left;
                var y = e.clientY - bounds.top;
                handleValueOfFinalVertex(id);
              }
              handleSetPath(false, "", "");
            }}
            onMouseDown={(e) => {
              if (cursor === "crosshair") {
                deleteNode(id);
              }
            }}
          />
        </div>
      </Draggable>
    </>
  );
};

interface StaticNodeInterface {
  id: string;
  value: number;
  position: { x: number; y: number };
  color: string;
}

export const NodeStatic: React.FC<StaticNodeInterface> = ({
  id,
  value,
  position,
  color,
}) => {
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: "100%",
        borderStyle: "solid",
        width: "fit-content",
        cursor: "pointer",
        position: "absolute",
        pointerEvents: "all",
        backgroundColor: color,
        textAlign: "center",
        color: "black",
        top: position.y,
        left: position.x,
      }}
      id={"node" + id}
    >
      <input
        type="number"
        value={value}
        style={{
          backgroundColor: "transparent",
          textAlign: "center",
          borderWidth: 0,
          color: "black",
        }}
        disabled={true}
      />
    </div>
  );
};

interface EditGraphModalInterface {
  show: boolean;
  handleClose: () => void;
  buildGraph: (nodes: Node[], paths: PathVertex[]) => void;
  setStartNode: (value: string) => void;
}

const EditGraphModal: React.FC<EditGraphModalInterface> = ({
  show,
  handleClose,
  buildGraph,
  setStartNode,
}) => {
  const { visualizationOption } = useContext(AppContext);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [path, setPath] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<PathInterface | undefined>();
  const [currentPathInitialCoordiantes, setCurrentPathInitialCoordinates] =
    useState<{ x: string; y: string }>({
      x: "",
      y: "",
    });

  const [finalNode, setFinalNode] = useState<string>("");
  const [initialVertex, setInitialVertex] = useState("");
  const [finalVertex, setFinalVertex] = useState("");

  const [cursor, setCursor] = useState<"crosshair" | "pointer">("pointer");

  const nodeMap = useRef<Map<string, Node>>(new Map<string, Node>());

  const graphRef = useRef<HTMLDivElement>(null);

  const [paths, setPaths] = useState<PathVertex[]>([]);

  const [startNodeValue, setStartNodeValue] = useState(0);

  const [showAlert, setShowAlert] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const repulsionConst: number = 10000;
  const springLength: number = 100;
  const attractionConst: number = 0.1;

  const width: number = 600;
  const height: number = 600;

  const iterations: number = 100;

  const changeCursor = () => {
    setCursor((prevState) => {
      if (prevState === "crosshair") {
        return "pointer";
      }
      return "crosshair";
    });
  };

  const handleValueOfInitialVertex = (id: string) => {
    setInitialVertex(id);
  };

  const handleValueOfFinalVertex = (id: string) => {
    setFinalVertex(id);
    const newPath: PathVertex = {
      startNodeId: initialVertex,
      endNodeId: id,
      weigth: 0,
      color: "black",
    };
    let foundNewPath = false;
    for (let i = 0; i < paths.length; i++) {
      if (
        paths[i].startNodeId === newPath.startNodeId &&
        paths[i].endNodeId === newPath.endNodeId
      ) {
        foundNewPath = true;
      }
    }
    if (!foundNewPath) setPaths(paths.concat(newPath));
  };

  const handleFinalNode = (id: string) => {
    setFinalVertex(id);
  };

  const changeValueOfVertex = (value: number, id: string) => {
    const node = nodeMap.current.get(id);
    if (node !== undefined) {
      const newNodes: Node[] = nodes.map((node) => {
        if (node.id === id) {
          return {
            id: node.id,
            value: value,
            position: {
              x: node.position.x,
              y: node.position.y,
            },
            color: node.color,
          };
        } else {
          return node;
        }
      });
      nodeMap.current.set(id, {
        id: node.id,
        value: value,
        position: {
          x: node.position.x,
          y: node.position.y,
        },
        color: node.color,
      });
      setNodes(newNodes);
    }
  };

  // Update position state when dragging stops
  const handleDrag = (e: DraggableEvent, data: DraggableData, id: string) => {
    const node = nodeMap.current.get(id);
    if (node !== undefined) {
      const newNodes: Node[] = nodes.map((node) => {
        if (node.id === id) {
          return {
            id: node.id,
            value: node.value,
            position: {
              x: data.x,
              y: data.y,
            },
            color: node.color,
          };
        } else {
          return node;
        }
      });
      nodeMap.current.set(id, {
        id: node.id,
        value: node.value,
        position: {
          x: data.x,
          y: data.y,
        },
        color: node.color,
      });
      setNodes(newNodes);
    }
  };

  const handleDragEnd = (
    e: DraggableEvent,
    data: DraggableData,
    id: string
  ) => {
    const nodeWidth = document.getElementById(id)?.clientWidth;
    const nodeHeight = document.getElementById(id)?.clientHeight;
    const node = nodeMap.current.get(id);
    if (
      node !== undefined &&
      nodeWidth !== undefined &&
      nodeHeight !== undefined
    ) {
      const newNodes: Node[] = nodes.map((node) => {
        if (node.id === id) {
          return {
            id: node.id,
            value: node.value,
            position: {
              x: clamp(0, 800 - nodeWidth - 10, data.x),
              y: clamp(0, 800 - nodeHeight - 10, data.y),
            },
            color: node.color,
          };
        } else {
          return node;
        }
      });
      nodeMap.current.set(id, {
        id: node.id,
        value: node.value,
        position: {
          x: clamp(0, 800 - nodeWidth - 10, data.x),
          y: clamp(0, 800 - nodeHeight - 10, data.y),
        },
        color: node.color,
      });

      setNodes(newNodes);
    }
  };

  const handleSetPath = (
    value: boolean,
    leftCoordinate: string,
    topCoordinate: string
  ) => {
    setPath(value);
    let newInitialCoordinates = { ...currentPathInitialCoordiantes };
    newInitialCoordinates.x = leftCoordinate;
    newInitialCoordinates.y = topCoordinate;
    setCurrentPathInitialCoordinates(newInitialCoordinates);
  };

  function getRandomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const repulsionForce = (distance: number): number => {
    return repulsionConst / (distance * distance);
  };

  const attractionForce = (distance: number): number => {
    return attractionConst * (distance - springLength);
  };

  const processCSVInput = (fileArray: string[][]) => {
    let nodes: Node[] = [];

    fileArray.forEach((array) => {
      array.forEach((element) => {
        try {
          const numElement = parseFloat(element);
          const nodesWithValue = nodes.filter((node) => {
            if (node.value == numElement) {
              return node;
            }
          });

          if (nodesWithValue.length === 0) {
            const id = uuidv4();
            let newNode: Node = {
              id: id,
              value: numElement,
              position: {
                x: 100 + Math.random() * width, // Adjusted
                y: 100 + Math.random() * height, // Adjusted
              },
              color: "transparent",
            };
            nodes = [...nodes, newNode];
            nodeMap.current.set(id, newNode);
          }
        } catch {
          alert("Please make sure the CSV file contains only numeric values");
        }
      });
    });

    let paths: PathVertex[] = [];
    fileArray.forEach((array) => {
      let pathVertex: PathVertex = {
        startNodeId: "",
        endNodeId: "",
        weigth: 0,
        color: "black",
      };

      array.forEach((element, index) => {
        try {
          const numElement = parseFloat(element);
          nodes.forEach((node) => {
            if (node.value === numElement) {
              if (index === 0) pathVertex.startNodeId = node.id;
              if (index === 1) pathVertex.endNodeId = node.id;
            }
          });
          if (index === 2) pathVertex.weigth = numElement;
        } catch {
          alert("Please make sure the CSV file contains only numeric values");
        }
      });

      paths.push(pathVertex);
    });

    const deepCopiedNodes = JSON.parse(JSON.stringify(nodes));

    for (let k = 0; k < iterations; k++) {
      const forces: Force[] = Array.from(
        { length: deepCopiedNodes.length },
        () => ({ x: 0, y: 0 })
      );

      // Repulsive forces
      for (let i = 0; i < deepCopiedNodes.length; i++) {
        for (let j = i + 1; j < deepCopiedNodes.length; j++) {
          const dx =
            deepCopiedNodes[i].position.x - deepCopiedNodes[j].position.x;
          const dy =
            deepCopiedNodes[i].position.y - deepCopiedNodes[j].position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance === 0) continue; // Avoid division by zero

          const forceMagnitude = repulsionForce(distance);
          const fx = (dx / distance) * forceMagnitude;
          const fy = (dy / distance) * forceMagnitude;

          forces[i].x += fx;
          forces[i].y += fy;
          forces[j].x -= fx;
          forces[j].y -= fy;
        }
      }

      // Attractive forces (edges)
      paths.forEach((path) => {
        const nodeStart = deepCopiedNodes.find(
          (node: Node) => node.id === path.startNodeId
        );
        const nodeEnd = deepCopiedNodes.find(
          (node: Node) => node.id === path.endNodeId
        );
        if (nodeStart && nodeEnd) {
          const dx = nodeStart.position.x - nodeEnd.position.x;
          const dy = nodeStart.position.y - nodeStart.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const forceMagnitude = attractionForce(distance);
          const fx = (dx / distance) * forceMagnitude;
          const fy = (dy / distance) * forceMagnitude;

          const startIndex = nodes.findIndex(
            (node) => node.id === nodeStart.id
          );
          const endIndex = nodes.findIndex((node) => node.id === nodeEnd.id);
          forces[startIndex].x -= fx;
          forces[startIndex].y -= fy;
          forces[endIndex].x += fx;
          forces[endIndex].y += fy;
        }
      });

      for (let i = 0; i < deepCopiedNodes.length; i++) {
        const nodeCopy = JSON.parse(JSON.stringify(deepCopiedNodes[i]));
        if (i === 0) {
        }
        nodeCopy.position.x += forces[i].x;
        nodeCopy.position.y += forces[i].y;
        if (i === 0) {
        }
        deepCopiedNodes[i] = nodeCopy;
      }
    }

    const finalNodes = deepCopiedNodes.map((node: Node) => {
      node.position.x = clamp(0, 650, node.position.x);
      node.position.y = clamp(0, 650, node.position.y);
      return node;
    });
    setNodes(finalNodes);
    setPaths(paths);
  };

  const addNode = () => {
    let value = 0;
    while (checkIfNodeValueExists(value)) {
      value += 1;
    }
    const id = uuidv4();
    const newNode: Node = {
      id: id,
      value: value,
      position: {
        x: getRandomBetween(0, 650),
        y: getRandomBetween(0, 650),
      },
      color: "transparent",
    };
    const newNodes = [...nodes, newNode];
    nodeMap.current.set(id, newNode);
    setNodes(newNodes);

    newNodes.forEach((node) => {
      const nodeWidth = document.getElementById(id)?.clientWidth;
      const nodeHeight = document.getElementById(id)?.clientHeight;
    });
  };

  const deletePath = (index: number) => {
    const newPaths = [...paths];
    newPaths.splice(index, 1);
    setPaths(newPaths);
  };

  const deleteNode = (id: string) => {
    const node = nodeMap.current.get(id);
    if (node !== undefined) {
      nodeMap.current.delete(id);
      const newNodes: Node[] = nodes.filter((node) => {
        return node.id !== id;
      });
      const newPaths: PathVertex[] = paths.filter(
        (path) => path.startNodeId !== id && path.endNodeId !== id
      );
      setNodes(newNodes);
      setPaths(newPaths);
    }
  };

  const hanldeSave = () => {
    let nodeValueMap = new Map<number, boolean>();
    for (let i = 0; i < nodes.length; i++) {
      if (nodeValueMap.get(nodes[i].value)) {
        setShowAlert(true);
        setAlertMessage(
          "Graph Invalid! There are two or more nodes with the same value"
        );
        return;
      } else {
        nodeValueMap.set(nodes[i].value, true);
      }
    }
    let startNodeInNodes =
      nodes.filter((node) => node.value === startNodeValue).length === 0;
    if (startNodeInNodes) {
      setShowAlert(true);
      setAlertMessage("The given start node does not exist in the graph");
      return;
    }
    buildGraph(nodes, paths);
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].value === startNodeValue) {
        setStartNode(nodes[i].id);
      }
    }
    handleClose();
  };

  const checkIfNodeValueExists = (value: number) => {
    const nodesWithValue = nodes.filter((node) => {
      if (node.value == value) {
        return node;
      }
    });

    if (nodesWithValue.length > 0) {
      return true;
    }
    return false;
  };

  const uploadCSVFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files) {
      const file = event.target.files[0];
      if (file) {
        Papa.parse(file, {
          complete: (result) => {
            // Here, result.data is the CSV file content parsed into an array of arrays or objects,
            // depending on the options provided to Papa.parse.
            // You can now use this data in your application.
            const csvData = result.data;
            try {
              let numArray: string[][] = [];
              for (let i = 0; i < csvData.length; i++) {
                const csvArray: any = csvData[i];
                if (visualizationOption !== 0 && visualizationOption !== 1) {
                  if (csvArray.length !== 3) {
                    throw "The Input file must contain 3 columns. The first column represents the starting vertex, the second column represents the ending vertex, and the third column represents the weight of the edge.";
                  }
                  numArray.push(csvArray);
                } else {
                  if (csvArray.length !== 2) {
                    throw "The Input file must contain 2 columns. The first column represents the starting vertex, the second column represents the ending vertex.";
                  }
                }
                numArray.push(csvArray);
              }

              processCSVInput(numArray);
            } catch (e) {
              alert(e);
            }
          },
          header: false, // Set to true if the first row of the CSV contains column headers
        });
      }
      event.target.value = "";
    }
  };

  return (
    <Modal show={show} onHide={handleClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>Edit Graph</Modal.Title>
      </Modal.Header>
      {showAlert && (
        <Alert dismissible onClose={() => setShowAlert(false)} variant="danger">
          {alertMessage}
        </Alert>
      )}
      <Modal.Body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "300px",
            justifyContent: "space-between",
            marginBottom: "10px",
            flexDirection: "column",
            marginRight: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "300px",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Button onClick={addNode}>Add Node</Button>
            <Button onClick={changeCursor}>
              {cursor === "pointer" ? "Set Delete Mode" : "Unset Delete Mode"}
            </Button>
          </div>
          <Form.Group
            style={{
              width: "100%",
            }}
          >
            <Form.Label>Set Start Node Below</Form.Label>
            <Form.Control
              type="number"
              placeholder="Set Start Node"
              value={startNodeValue}
              onChange={(e) => {
                setStartNodeValue(Number(e.target.value));
              }}
            />
          </Form.Group>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <Form.Label>File Input (CSV)</Form.Label>
            <OverlayTrigger
              placement="right"
              overlay={(props) =>
                renderTooltip(
                  props,
                  visualizationOption !== 0 && visualizationOption !== 1
                    ? "The Input file must contain 3 columns. The first column represents the starting vertex, the second column represents the ending vertex, and the third column represents the weight of the edge, and it should only contain numeric values."
                    : "The Input file must contain 2 columns. The first column represents the starting vertex, the second column represents the ending vertex, and it should only contain numeric values."
                )
              }
            >
              <Button onClick={uploadCSVFile}>Upload CSV File</Button>
            </OverlayTrigger>
            <input
              ref={fileInputRef}
              type="file"
              style={{
                display: "none",
              }}
              accept=".csv, text/csv"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div
          ref={graphRef}
          style={{
            position: "relative",
            width: 800,
            height: 800,
            borderStyle: "solid",
            cursor: cursor,
          }}
          onMouseMove={(e) => {
            if (path && graphRef.current) {
              var bounds = graphRef.current.getBoundingClientRect();
              var x = e.clientX - bounds.left;
              var y = e.clientY - bounds.top;
              let newPath: PathInterface = {
                x1: currentPathInitialCoordiantes.x,
                y1: currentPathInitialCoordiantes.y,
                x2: x.toString(),
                y2: y.toString(),
              };
              setCurrentPath(newPath);
            }
          }}
          onMouseUp={(e) => {
            if (path) {
              if (finalVertex !== "") {
                handleValueOfFinalVertex(finalVertex);
              }
            }
            handleSetPath(false, "", "");
            setCurrentPath({
              x1: "",
              x2: "",
              y1: "",
              y2: "",
            });
          }}
        >
          <svg
            width={800}
            height={800}
            style={{
              position: "absolute",
            }}
          >
            {path && currentPath !== undefined && (
              <Path
                x1={currentPath.x1}
                y1={currentPath.y1}
                x2={currentPath.x2}
                y2={currentPath.y2}
              />
            )}
          </svg>
          <Xwrapper>
            {paths.map((path, index) => {
              return (
                <div
                  key={index}
                  onMouseDown={(e) => {
                    if (cursor === "crosshair") {
                      deletePath(index);
                    }
                  }}
                  id={index.toString()}
                >
                  <Xarrow
                    start={path.startNodeId}
                    end={path.endNodeId}
                    color="black"
                    strokeWidth={5}
                    path="straight"
                    labels={{
                      middle:
                        visualizationOption !== 0 &&
                        visualizationOption !== 1 ? (
                          <div
                            style={{
                              position: "absolute",
                              margin: "10px",
                            }}
                          >
                            <input
                              type="number"
                              style={{
                                backgroundColor: "transparent",
                                color: "black",
                                width: "fit-content",
                                borderStyle: "none",
                              }}
                              onChange={(e) => {
                                let newPath = { ...path };
                                newPath.weigth = Number(e.target.value);
                                let newPaths = [...paths];
                                newPaths[index] = newPath;
                                setPaths(newPaths);
                              }}
                              value={path.weigth}
                            />
                          </div>
                        ) : (
                          <></>
                        ),
                    }}
                  />
                </div>
              );
            })}
            {nodes.map((node, index) => {
              return (
                <Node
                  key={index}
                  id={node.id}
                  value={node.value}
                  position={node.position}
                  handleDrag={handleDrag}
                  handleDragEnd={handleDragEnd}
                  index={index}
                  handleSetPath={handleSetPath}
                  graphRef={graphRef}
                  path={path}
                  handleValueOfInitialVertex={handleValueOfInitialVertex}
                  handleValueOfFinalVertex={handleValueOfFinalVertex}
                  handleFinalNode={handleFinalNode}
                  changeValueOfVertex={changeValueOfVertex}
                  cursor={cursor}
                  deleteNode={deleteNode}
                />
              );
            })}
          </Xwrapper>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={hanldeSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditGraphModal;
