import { IMarker } from "react-ace";
import { NodeTree } from "../components/Utils/DivideAndConquerArrayTree";

export interface MergeSortArrayVisualizationInterface {
  value: number[];
  valueI: number;
  valueJ: number;
  indexI: number;
  indexJ: number;
  colorI: string;
  colorJ: string;
  iterations: number;
  swaps: number;
}

export interface MergeSortArrayVisualizationAnimationInterface {
  nodeTrees: NodeTree[];
  currentLineMarkers: IMarker[];
}
