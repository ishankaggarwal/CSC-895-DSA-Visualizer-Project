import { Dispatch, SetStateAction, createContext, useState } from "react";
import { IMarker } from "react-ace";

interface ContextInterface{
    visualizationCategory: number;
    setVisualizationCategory : Dispatch<SetStateAction<number>>;
    visualizationOption: number;
    setVisualizationOption : Dispatch<SetStateAction<number>>;
    speedValue: number;
    setSpeedValue: Dispatch<SetStateAction<number>>;
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    input: any;
    setInput : Dispatch<SetStateAction<any>>;
    editorValue: string;
    setEditorValue: Dispatch<SetStateAction<string>>;
    markers: IMarker[];
    setMarkers: Dispatch<SetStateAction<IMarker[]>>;
    isHovered: boolean,
    setIsHovered: Dispatch<SetStateAction<boolean>>,
    position: {
        x: number,
        y: number,
    }
    setPosition: Dispatch<SetStateAction<{
        x: number,
        y: number,
    }>>,
    hoverValue: number,
    setHoverValue: Dispatch<SetStateAction<number>>,
    target: number;
    setTarget : Dispatch<SetStateAction<any>>;
    node1: number;
    setNode1 : Dispatch<SetStateAction<any>>;
    node2: number;
    setNode2 : Dispatch<SetStateAction<any>>;
    iterations: number;
    setIterations : Dispatch<SetStateAction<any>>;
    swaps: number;
    setSwaps : Dispatch<SetStateAction<any>>;
}


const AppContext = createContext<ContextInterface>({
    visualizationCategory: 0,
    setVisualizationCategory: function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    },
    visualizationOption: 0,
    setVisualizationOption: function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    },
    speedValue: 0,
    setSpeedValue: function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    },
    isPlaying: true,
    setIsPlaying: function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
    },
    input: "",
    setInput: function (value: SetStateAction<any>): void {
        throw new Error("Function not implemented.");
    },
    editorValue: "",
    setEditorValue: function (value: SetStateAction<string>): void {
        throw new Error("Function not implemented.");
    },
    markers: [],
    setMarkers: function (value: SetStateAction<IMarker[]>): void {
        throw new Error("Function not implemented.");
    },
    isHovered: false,
    setIsHovered: function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
    },
    position: {
        x: 0,
        y: 0
    },
    setPosition: function (value: SetStateAction<{ x: number; y: number; }>): void {
        throw new Error("Function not implemented.");
    },
    hoverValue: 0,
    setHoverValue: function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    },
    target: 0,
    setTarget : function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    },
    node1: 0,
    setNode1 : function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    },
    node2: 0,
    setNode2 : function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    },
    iterations: 0,
    setIterations : function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    },
    swaps: 0,
    setSwaps : function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    },
});

export default AppContext;