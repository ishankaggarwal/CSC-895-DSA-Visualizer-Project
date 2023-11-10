import { useContext} from "react";
import AppContext from "@/context";
import ArrayVisualizer from "./VisualizationComponents/ArrayVisualizer";
import SpeedComponent from "./Utils/SpeedComponent";
import PlayPauseComponent from "./Utils/PlayPause";
import InputBox from "./Utils/InputBox";


const Visualizer = () =>{

    const {
        visualizationCategory
    }  = useContext(AppContext);
    return(
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '80%',
            flexDirection: 'column',
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
            <InputBox/>
        </div>
    )
}

export default Visualizer;