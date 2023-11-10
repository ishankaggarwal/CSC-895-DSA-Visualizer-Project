import { ArrayVisualizationAnimationInterface, ArrayVisualizationInterface } from "@/app/interfaces/ArrayVIsualizationInterface";
import { BubbleSort } from "@/app/visualization-algorithms/bubblesort";
import AppContext from "@/context";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const ArrayVisualizer = () =>{

    const {
        visualizationOption,
        speedValue,
        isPlaying,
        input
    }  = useContext(AppContext);

    const [arrayVisualization,setArrayVisualization] = useState<ArrayVisualizationInterface[]>([]);
    const [animations,setAnimations] = useState<ArrayVisualizationAnimationInterface[]>([]);
    const [speed, setSpeed] = useState<number>(1);
    const [isPlayingValue,setIsPlayingValue] = useState<boolean>(true);
    const speedRef = useRef<number>(speed);
    const isPlayingRef = useRef<boolean>(isPlayingValue);

    useEffect(()=>{
        isPlayingRef.current = isPlayingValue;
        processAnimations(animations);
    },[isPlayingValue])

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    useEffect(()=>{
        setIsPlayingValue(isPlaying);
   },[isPlaying])

    useEffect(()=>{
        setSpeed(speedValue);
   },[speedValue])

    useEffect(()=>{
        createArrayVisualization(input);
        setAnimations([]);
    },[input])


    const createArrayVisualization = (array: number[]) =>{
        const newArray = array.map((value,index)=>{
            const newValue : ArrayVisualizationInterface = {
                'color': 'transparent',
                value: value,
                index: index
            }
            return newValue;
        })
        setArrayVisualization(newArray);
    }

    const visualizeArray = async (array: number[]) =>{
        let animations : ArrayVisualizationAnimationInterface[] = [];
        createArrayVisualization([...array]);
        if(visualizationOption===0)
        {
            animations = BubbleSort([...array]);
        }
        setAnimations(animations);
        processAnimations(animations);
    }

    const processAnimations = async (animations: ArrayVisualizationAnimationInterface[])=>{
        const newAnimations = [...animations];
        while(newAnimations.length>0)
        {
            if(isPlayingRef.current)
            {
                const animation = newAnimations.shift();
                if(animation)
                {
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
                setAnimations(newAnimations);
                await sleep(1000/speedRef.current);
                }
            }
            else{
                break;
            }
        }
    }
    return(
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
                    await visualizeArray(input);
                }}>
                    Visualize
                </Button>
            </div>
        </div>
    )
}

export default ArrayVisualizer;