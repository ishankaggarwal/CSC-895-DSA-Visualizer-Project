import { BubbleSortArrayVisualizationAnimationInterface, BubbleSortArrayVisualizationInterface } from "@/app/interfaces/BubbleSortArrayVIsualizationInterface";
import { BubbleSort } from "@/app/visualization-algorithms/bubblesort";
import { InsertionSort } from "@/app/visualization-algorithms/insertionsort";
import AppContext from "@/context";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const BubbleSortArrayVisualizer = () =>{

    const {
        visualizationOption,
        speedValue,
        isPlaying,
        input,
        setMarkers
    }  = useContext(AppContext);

    const [arrayVisualization,setArrayVisualization] = useState<BubbleSortArrayVisualizationInterface[]>([]);
    const [animations,setAnimations] = useState<BubbleSortArrayVisualizationAnimationInterface[]>([]);
    const [speed, setSpeed] = useState<number>(1);
    const [isPlayingValue,setIsPlayingValue] = useState<boolean>(true);
    const speedRef = useRef<number>(speed);
    const isPlayingRef = useRef<boolean>(isPlayingValue);
    const animationsRef = useRef<BubbleSortArrayVisualizationAnimationInterface[]>([]);
    const [barHeight,setBarHeight] = useState<number>(0);

    useEffect(()=>{
        isPlayingRef.current = isPlayingValue;
        processAnimations();
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

    useEffect(()=>{
        async function rerender(){
            animationsRef.current = [...animations];
            await processAnimations();
        }
        rerender();
    },[animations]);


    const createArrayVisualization = (array: number[]) =>{
        let maxValue = Number.NEGATIVE_INFINITY;
        const newArray = array.map((value,index)=>{
            const newValue : BubbleSortArrayVisualizationInterface = {
                'color': 'transparent',
                value: value,
                index: index
            }
            maxValue = Math.max(maxValue,value);
            return newValue;
        })
        setArrayVisualization(newArray);
        setBarHeight(500/maxValue);
    }

    const visualizeArray = async (array: number[]) =>{
        let animations : BubbleSortArrayVisualizationAnimationInterface[] = [];
        if(visualizationOption===0)
        {
            animations = BubbleSort([...array]);
        }
        if(visualizationOption===1)
        {
            animations = InsertionSort([...array]);
        }
        createArrayVisualization([...array]);
        if(animationsRef.current.length>0)
        {
            setAnimations([]);
        }
        else{
            setAnimations(animations);
        }


    }

    const processAnimations = async ()=>{
        if(animationsRef.current.length>0)
        {
            if(isPlayingRef.current)
            {
                const animation = animationsRef.current.shift();
                if(animation)
                {
                let newArray = [...arrayVisualization];
                const {
                    colorI,
                    colorJ,
                    valueI,
                    valueJ,
                    indexI,
                    indexJ,
                    currentLineMarkers
                } = animation;
                newArray[indexI].value=valueI;
                newArray[indexI].color=colorI;
                newArray[indexJ].value=valueJ;
                newArray[indexJ].color = colorJ;
                setMarkers(currentLineMarkers);
                setArrayVisualization(newArray);
                await sleep(1000/speedRef.current);
                setAnimations(animationsRef.current);
                }
            }
        }
    }

    return(
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100%',
            overflow: 'scroll',
            padding: '10px'
        }}>
            <div style={{
                display: 'flex',
                alignSelf: 'flex-start'
            }}>
            {
                arrayVisualization.map((value,index)=>{
                    return (
                        <div style={{
                            margin: '10px',
                            alignSelf: 'flex-end'
                        }}>
                                <div style={{
                                width: '100%',
                                height: value.value*barHeight,
                                backgroundColor: 'green',
                            }}>

                            </div>
                        <div style={{
                            padding: '20px',
                            borderStyle: 'solid',
                            borderWidth: '2px',
                            fontSize: '35px',
                            backgroundColor: value.color,
                            width: 'fit-content'
                        }} key={value.index} id={"value"+index}>
                            {value.value}
                            </div>
                            </div>
                    )
                })
            }
            </div>
            <div style={{
                marginTop: '30px',
            }}>
                <Button onClick={async ()=>{
                    await visualizeArray(input);
                }}>
                    {
                        animationsRef.current.length >0  ? <FontAwesomeIcon icon={faStop}/> :
                        <FontAwesomeIcon icon={faPlay}/>
}
                </Button>
            </div>
        </div>
    )
}

export default BubbleSortArrayVisualizer;