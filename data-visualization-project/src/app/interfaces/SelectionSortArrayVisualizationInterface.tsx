import { IMarker } from "react-ace";

export interface SelectionSortArrayVisualizationInterface {
  value: number;
  index: number;
  color: string;
  type: string;
}

export interface SelectionSortArrayVisualizationAnimationInterface {
  valueI: number;
  valueJ: number;
  indexI: number;
  indexJ: number;
  colorI: string;
  colorJ: string;
  currentLineMarkers: IMarker[];
  minValue: string;
  minIndex: string;
}

export interface CountingSortArrayVisualizationAnimationInterface {
  valueI: number;
  indexI: number;
  colorI: string;
  type: string;
  currentLineMarkers: IMarker[];
}

const SelectionSortArrayVisualizationInterfaceComponent = () => {
  return <div></div>;
};

export default SelectionSortArrayVisualizationInterfaceComponent;
