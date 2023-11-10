import { ArrayVisualizationAnimationInterface, ArrayVisualizationInterface } from "@/app/interfaces/ArrayVIsualizationInterface";
import { BubbleSort } from "@/app/visualization-algorithms/bubblesort";
import AppContext from "@/context";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const ArrayVisualizer = () =>{

    const {
        visualizationOption
    } : any = useContext(AppContext);
    const [array,setArray] = useState<number[]>([3,2,1]);
    const [arrayVisualization,setArrayVisualization] = useState<ArrayVisualizationInterface[]>([]);
    useEffect(()=>{
        const newArrayVisualization = createArrayVisualization(array);
        setArrayVisualization(newArrayVisualization);
    },[array])

    const createArrayVisualization = (array: number[]) =>{
        const newArray = array.map((value,index)=>{
            const newValue : ArrayVisualizationInterface = {
                'color': 'transparent',
                value: value,
                index: index
            }
            return newValue;
        })
        return newArray;
    }

    const visualizeArray = async (array: number[]) =>{
        let animations : ArrayVisualizationAnimationInterface[] = [];
        let newArrayVisualization = createArrayVisualization([...array]);
        setArrayVisualization(newArrayVisualization);
        if(visualizationOption===0)
        {
            animations = BubbleSort([...array]);
        }
        processAnimations(animations,newArrayVisualization);
    }

    const processAnimations = async (animations: ArrayVisualizationAnimationInterface[],arrayVisualization: ArrayVisualizationInterface[])=>{
        for(let i=0;i<animations.length;i++)
        {
            const animation = animations[i];
            console.log([...arrayVisualization]);
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
            arrayVisualization = [...newArray];
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
            <div style={{
                display: 'flex'
            }}>
            {
                arrayVisualization.map(value=>{
                    return (
                        <div style={{
                            padding: '20px',
                            borderStyle: 'solid',
                            borderWidth: '2px',
                            fontSize: '35px',
                            backgroundColor: value.color
                        }} key={value.index}>
                            {value.value}
                            </div>
                    )
                })
            }
            </div>
            <div style={{
                marginTop: '30px'
            }}>
                <Button onClick={async ()=>{
                    await visualizeArray(array);
                }}>
                    Visualize
                </Button>
            </div>
        </div>
    )
}

export default ArrayVisualizer;