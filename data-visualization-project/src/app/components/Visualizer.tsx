import { useContext} from "react";
import AppContext from "@/context";
import ArrayVisualizer from "./VisualizationComponents/BubbleSortArrayVisualizer";
import SpeedComponent from "./Utils/SpeedComponent";
import PlayPauseComponent from "./Utils/PlayPause";
import InputBox from "./Utils/InputBox";
import CodeEditor from "./Utils/CodeEditor";
import BinaryTree from "./Utils/BinaryTree";
import BinaryTreeVisualizer from "./VisualizationComponents/BinaryTreeVisualizer";
import BubbleSortArrayVisualizer from "./VisualizationComponents/BubbleSortArrayVisualizer";
import InsertionSortArrayVisualizer from "./VisualizationComponents/InsertionSortArrayVIsualizer";
import SelectionSortArrayVisualizer from "./VisualizationComponents/SelectionSortArrayVisualizer";
import MergeSortVisualizer from "./VisualizationComponents/MergeSortArrayVisualizer";


const Visualizer = () =>{

    const {
        visualizationCategory,
        visualizationOption
    }  = useContext(AppContext);
    return(
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'absolute',
            top: 100,
            left: 0,
            width: '70%',
            height: '100vh'
        }}>
            <div style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                display: 'flex',
            }}>
            <SpeedComponent/>
            <PlayPauseComponent/>
            </div>
            {
                (visualizationCategory ===0 && visualizationOption===0) && <BubbleSortArrayVisualizer/>
            }
            {
                (visualizationCategory ===0 && visualizationOption===1) && <InsertionSortArrayVisualizer/>
            }
            {
                (visualizationCategory ===0 && visualizationOption===2) && <SelectionSortArrayVisualizer/>
            }
                        {
                (visualizationCategory ===0 && visualizationOption===3) && <MergeSortVisualizer/>
            }
            {
                visualizationCategory === 1 && <BinaryTreeVisualizer/>
            }
            <InputBox/>
        </div>
    )
}

export default Visualizer;