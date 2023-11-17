import { InsertionSortArrayVisualizationAnimationInterface, InsertionSortArrayVisualizationInterface } from "@/app/interfaces/InsertionSortArrayVisualizationInterface";
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

const InsertionSortArrayVisualizer = () =>{

    const {
        visualizationOption,
        speedValue,
        isPlaying,
        input,
        setMarkers
    }  = useContext(AppContext);

    const [arrayVisualization,setArrayVisualization] = useState<InsertionSortArrayVisualizationInterface[]>([]);
    const [animations,setAnimations] = useState<InsertionSortArrayVisualizationAnimationInterface[]>([]);
    const [speed, setSpeed] = useState<number>(1);
    const [isPlayingValue,setIsPlayingValue] = useState<boolean>(true);
    const speedRef = useRef<number>(speed);
    const isPlayingRef = useRef<boolean>(isPlayingValue);
    const animationsRef = useRef<InsertionSortArrayVisualizationAnimationInterface[]>([]);
    const [keyValue,setKeyValue] = useState("");

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
        const newArray = array.map((value,index)=>{
            const newValue : InsertionSortArrayVisualizationInterface = {
                'color': 'transparent',
                value: value,
                index: index
            }
            return newValue;
        })
        setArrayVisualization(newArray);
    }

    const visualizeArray = async (array: number[]) =>{
        let animations : InsertionSortArrayVisualizationAnimationInterface[] = [];
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
                    currentLineMarkers,
                    keyValue
                } = animation;
                newArray[indexI].value=valueI;
                newArray[indexI].color=colorI;
                newArray[indexJ].value=valueJ;
                newArray[indexJ].color = colorJ;
                setMarkers(currentLineMarkers);
                setArrayVisualization(newArray);
                setKeyValue(keyValue);
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
                            padding: '20px',
                            borderStyle: 'solid',
                            borderWidth: '2px',
                            fontSize: '35px',
                            margin: '10px'
                        }} >
                Key Value: {keyValue}
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

export default InsertionSortArrayVisualizer;