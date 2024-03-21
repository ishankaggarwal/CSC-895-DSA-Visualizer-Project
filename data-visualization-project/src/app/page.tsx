"use client";
import { useState } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Visualizer from "./components/Visualizer";
import styles from "./page.module.css";
import AppContext from "@/context";
import { IMarker } from "react-ace";
import CodeEditor from "./components/Utils/CodeEditor";
import HoverComponent from "./components/Utils/HoverComponent";
import Counter from "./components/Utils/Counter";

export default function Home() {
  const [visualizationCategory, setVisualizationCategory] = useState<number>(0);
  const [visualizationOption, setVisualizationOption] = useState(0);
  const [speedValue, setSpeedValue] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [input, setInput] = useState<any>([]);
  const [editorValue, setEditorValue] = useState("");
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverValue, setHoverValue] = useState<number>(0);
  const [target, setTarget] = useState<number>(0);
  const [node1, setNode1] = useState<number>(0);
  const [node2, setNode2] = useState<number>(0);
  const [iterations, setIterations] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);

  return (
    <AppContext.Provider
      value={{
        visualizationCategory,
        setVisualizationCategory,
        visualizationOption,
        setVisualizationOption,
        speedValue,
        setSpeedValue,
        isPlaying,
        setIsPlaying,
        input,
        setInput,
        editorValue,
        setEditorValue,
        markers,
        setMarkers,
        isHovered,
        setIsHovered,
        position,
        setPosition,
        hoverValue,
        setHoverValue,
        target,
        setTarget,
        node1,
        setNode1,
        node2,
        setNode2,
        iterations,
        setIterations,
        swaps,
        setSwaps,
      }}
    >
      <div className={styles.main}>
        <HoverComponent
          positionX={position.x}
          positionY={position.y}
          value={hoverValue}
          showHover={isHovered}
        />
        <Header />
        <SideMenu />
        <Visualizer />
        <div
          style={{
            width: "30%",
            position: "absolute",
            right: 0,
            height: "100%",
          }}
        >
          <CodeEditor />
          {visualizationCategory === 0 &&
            (visualizationOption === 0 ||
              visualizationOption === 1 ||
              visualizationOption === 2) && <Counter />}
        </div>
      </div>
    </AppContext.Provider>
  );
}
