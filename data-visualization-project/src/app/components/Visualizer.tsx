import { useContext} from "react";
import AppContext from "@/context";
import ArrayVisualizer from "./VisualizationComponents/ArrayVisualizer";
import SpeedComponent from "./Utils/SpeedComponent";
import PlayPauseComponent from "./Utils/PlayPause";
import InputBox from "./Utils/InputBox";
import CodeEditor from "./Utils/CodeEditor";
import BinaryTree from "./Utils/BinaryTree";
import BinaryTreeVisualizer from "./VisualizationComponents/BinaryTreeVisualizer";


const Visualizer = () =>{

    const {
        visualizationCategory
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
                visualizationCategory ===0 && <ArrayVisualizer/>
            }
            {
                visualizationCategory === 1 && <BinaryTreeVisualizer/>
            }
            <InputBox/>
        </div>
    )
}

export default Visualizer;