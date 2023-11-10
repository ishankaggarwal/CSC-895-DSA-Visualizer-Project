import { useContext, useEffect, useState } from "react";
import { ArrayVisualizationInterface } from "../interfaces/ArrayVIsualizationInterface";
import { Button } from "react-bootstrap";
import { BubbleSort } from "../visualization-algorithms/bubblesort";
import AppContext from "@/context";
import ArrayVisualizer from "./VisualizationComponents/ArrayVisualizer";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const Visualizer = () =>{

    const {
        visualizationCategory,
        visualizationOption
    } : any = useContext(AppContext);

    const [array,setArray] = useState<number[]>([8,7,6,5,4,3,2,1]);
    const [arrayVisualization,setArrayVisualization] = useState<ArrayVisualizationInterface[]>([]);
    useEffect(()=>{
        const newArray = array.map((value,index)=>{
            const newValue : ArrayVisualizationInterface = {
                'color': 'transparent',
                value: value,
                index: index
            }
            return newValue;
        })
        setArrayVisualization(newArray);
    },[array])

    const visualizeArray = async () =>{
        const animations = BubbleSort(array);
        console.log(animations);
        for(let i=0;i<animations.length;i++)
        {
            const animation = animations[i];
            let newArray = [...arrayVisualization];
            const {
                colorI,
                colorJ,
                valueI,
                valueJ,
                indexI,
                indexJ
            } = animation;
            newArray[indexI].value=valueI;
            newArray[indexI].color=colorI;
            newArray[indexJ].value=valueJ;
            newArray[indexJ].color = colorJ;
            setArrayVisualization(newArray);
            await sleep(1000);
            
        }
    }
    return(
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            height: '100vh',
            flexDirection: 'column'
        }}>
            {
                visualizationCategory ===0 && <ArrayVisualizer/>
            }
        </div>
    )
}

export default Visualizer;