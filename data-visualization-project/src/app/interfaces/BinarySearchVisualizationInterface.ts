import { IMarker } from "react-ace";

export interface BinarySearchAnimationInterface {
index: number;
color: string;
value ?: number;
type?: "low" | "high" | "mid" | "result" | "none";
currentLineMarkers : IMarker[];
}

