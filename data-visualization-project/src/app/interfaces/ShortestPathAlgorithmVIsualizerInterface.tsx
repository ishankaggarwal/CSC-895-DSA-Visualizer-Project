import { IMarker } from "react-ace";

export interface DjikstraAlgorithmVisualizationInterface {
  type: "node" | "path";
  nodeId?: string;
  pathStartId?: string;
  pathEndId?: string;
  nodeColor?: string;
  pathColor?: string;
  queue: string[];
  currentLineMarkers: IMarker[];
  rowNodeID?: string;
  columnNodeID?: string;
  distance?: string;
  cellColor?: string;
}

export interface FloydWarshallVisualizationInterface {
  type: "node" | "path";
  nodeId?: string;
  pathStartId?: string;
  pathEndId?: string;
  nodeColor?: string;
  pathColor?: string;
  currentLineMarkers: IMarker[];
  rowNodeID?: string;
  columnNodeID?: string;
  distance?: string;
  cellColor?: string;
}

export interface PrimAlgorithmVisualizationInterface {
  type: "node" | "path" | "value";
  nodeId?: string;
  pathStartId?: string;
  pathEndId?: string;
  nodeColor?: string;
  pathColor?: string;
  rowNodeID?: string;
  columnNodeID?: string;
  distance?: string;
  cellColor?: string;
  searchValue?: Set<string>;
}
