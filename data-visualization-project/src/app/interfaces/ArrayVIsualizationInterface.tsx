import { IMarker } from "react-ace";

export interface ArrayVisualizationInterface{
    value: number;
    index: number;
    color: string;
}

export interface ArrayVisualizationAnimationInterface{
    valueI: number;
    valueJ: number;
    indexI: number;
    indexJ: number;
    colorI: string;
    colorJ: string;
    currentLineMarkers : IMarker[]; 
}

const ArrayVisualizationInterfaceComponent = ()=>{
    return(
        <div></div>
    )
}

export default ArrayVisualizationInterfaceComponent;