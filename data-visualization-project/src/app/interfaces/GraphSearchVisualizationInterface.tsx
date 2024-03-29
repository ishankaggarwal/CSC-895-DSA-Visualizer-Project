import { IMarker } from "react-ace";

export interface GraphSearchVisualizationInterface {
  type: "node" | "path";
  nodeId?: string;
  pathStartId?: string;
  pathEndId?: string;
  nodeColor?: string;
  pathColor?: string;
  searchValue: string[];
  currentLineMarkers: IMarker[];
}

export interface BreadthFirstSearchVisualizationInterface {
  type: "node" | "path" | "none";
  nodeId?: string;
  pathStartId?: string;
  pathEndId?: string;
  nodeColor?: string;
  pathColor?: string;
  searchValue?: string[];
  queue?: string[];
  currentLineMarkers: IMarker[];
}

export interface topoLogicalSortVisualizationInterface {
  type: "node" | "path" | "result" | "none";
  nodeId?: string;
  pathStartId?: string;
  pathEndId?: string;
  nodeColor?: string;
  pathColor?: string;
  searchValue?: string[];
  currentLineMarkers: IMarker[];
  resultOrder?: string[];
}

export interface CycleDetectionVisulizationInterface {
  type: "node" | "path" | "cycle" | "none";
  nodeId?: string;
  pathStartId?: string;
  pathEndId?: string;
  nodeColor?: string;
  pathColor?: string;
  searchValue?: string[];
  currentLineMarkers: IMarker[];
}
