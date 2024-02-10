import { useContext } from "react";
import AppContext from "@/context";
import SpeedComponent from "./Utils/SpeedComponent";
import PlayPauseComponent from "./Utils/PlayPause";
import InputBox from "./Utils/InputBox";
import BinaryTreeVisualizer from "./VisualizationComponents/BinaryTreeVisualizer";
import BubbleSortArrayVisualizer from "./VisualizationComponents/BubbleSortArrayVisualizer";
import InsertionSortArrayVisualizer from "./VisualizationComponents/InsertionSortArrayVIsualizer";
import SelectionSortArrayVisualizer from "./VisualizationComponents/SelectionSortArrayVisualizer";
import MergeSortVisualizer from "./VisualizationComponents/MergeSortArrayVisualizer";
import QuickSortVisualizer from "./VisualizationComponents/QuickSortArrayVisualizer";
import DepthFirstSearchAlgorithmVisualizer from "./VisualizationComponents/DepthFirstSearchAlgorithm";
import BreadthFirstSearchAlgorithmVisualizer from "./VisualizationComponents/BreadthFirstSearchAlgorithm";
import DjikstraAlgorithmVisualizer from "./VisualizationComponents/DjikstraAlgorithmVisualizer";
import TopoLogicalSortVisualizer from "./VisualizationComponents/TopoLogicalSortVisualizer";
import FloydWarshallVisualizer from "./VisualizationComponents/FloydWarshallAlgorithm";
import PrimAlgorithmVisualizer from "./VisualizationComponents/PrimAlgorithm";
import BinarySearchVisualizer from "./VisualizationComponents/BinarySearchVisualizer";
import CycleDetectionInGraphVisualizer from "./VisualizationComponents/CycleDetectionInGraphVisualizer";
import CounterSortVisualizer from "./VisualizationComponents/CounterSortVisualizer";
import LevelOrderGraphTraversalVisualizer from "./VisualizationComponents/LevelOrderGraphTraversal";

const Visualizer = () => {
  const {
    visualizationCategory,
    visualizationOption,
    position,
    hoverValue,
    isHovered,
  } = useContext(AppContext);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "absolute",
          top: 150,
          left: 0,
          width: "70%",
        }}
      >
        <div
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-evenly",
            display: "flex",
          }}
        >
          <SpeedComponent />
          <PlayPauseComponent />
        </div>
        {visualizationCategory === 0 && visualizationOption === 0 && (
          <BubbleSortArrayVisualizer />
        )}
        {visualizationCategory === 0 && visualizationOption === 1 && (
          <InsertionSortArrayVisualizer />
        )}
        {visualizationCategory === 0 && visualizationOption === 2 && (
          <SelectionSortArrayVisualizer />
        )}
        {visualizationCategory === 0 && visualizationOption === 3 && (
          <MergeSortVisualizer />
        )}
        {visualizationCategory === 0 && visualizationOption === 4 && (
          <QuickSortVisualizer />
        )}
        {visualizationCategory === 0 && visualizationOption === 5 && (
          <BinarySearchVisualizer />
        )}
        {visualizationCategory === 0 && visualizationOption === 6 && (
          <CounterSortVisualizer />
        )}
        {visualizationCategory === 1 && <BinaryTreeVisualizer />}
        {visualizationCategory === 2 && visualizationOption === 0 && (
          <DepthFirstSearchAlgorithmVisualizer />
        )}
        {visualizationCategory === 2 && visualizationOption === 1 && (
          <BreadthFirstSearchAlgorithmVisualizer />
        )}
        {visualizationCategory === 2 && visualizationOption === 2 && (
          <DjikstraAlgorithmVisualizer />
        )}
        {visualizationCategory === 2 && visualizationOption === 3 && (
          <TopoLogicalSortVisualizer />
        )}
        {visualizationCategory === 2 && visualizationOption === 4 && (
          <FloydWarshallVisualizer />
        )}
        {visualizationCategory === 2 && visualizationOption === 5 && (
          <CycleDetectionInGraphVisualizer />
        )}
        {visualizationCategory === 2 && visualizationOption === 6 && (
          <PrimAlgorithmVisualizer />
        )}
        {visualizationCategory === 2 && visualizationOption === 7 && (
          <LevelOrderGraphTraversalVisualizer />
        )}
        {visualizationCategory !== 2 && <InputBox />}
      </div>
    </>
  );
};

export default Visualizer;
