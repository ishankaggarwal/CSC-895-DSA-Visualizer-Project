import { BubbleSortArrayVisualizationAnimationInterface, BubbleSortArrayVisualizationInterface } from "@/app/interfaces/BubbleSortArrayVIsualizationInterface";
import { BubbleSort } from "@/app/visualization-algorithms/bubblesort";
import { InsertionSort } from "@/app/visualization-algorithms/insertionsort";
import AppContext from "@/context";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import EditGraphModal from "../Utils/EditGraphModal";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



const DjikstraAlgorithmVisualizer = () =>{

    const {
        visualizationOption,
        speedValue,
        isPlaying,
        input,
        setMarkers
    }  = useContext(AppContext);

    const [speed, setSpeed] = useState<number>(1);
    const [isPlayingValue,setIsPlayingValue] = useState<boolean>(true);
    const speedRef = useRef<number>(speed);
    const isPlayingRef = useRef<boolean>(isPlayingValue);
    const [showEditGraphModal,setShowEditGraphModal] = useState<boolean>(false);

    useEffect(()=>{
        isPlayingRef.current = isPlayingValue;
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


    return(
        <>
        <EditGraphModal show={showEditGraphModal} handleClose={()=>{
            setShowEditGraphModal(false);
        } }/>
            <div style={{
                marginTop: '30px',
            }}>
                <Button onClick={ ()=>{
                   setShowEditGraphModal(true);
                }}>
                    Edit Graph
                </Button>
            </div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100%',
            overflow: 'scroll',
        }}>

            <div style={{
                display: 'flex',
                alignSelf: 'flex-start'
            }}>
            </div>
            <div style={{
                marginTop: '30px',
            }}>
                <Button onClick={async ()=>{
                    //await visualizeArray(input);
                }}>
                    {
                        <FontAwesomeIcon icon={faPlay}/>
}
                </Button>
            </div>
        </div>
        </>
    )
}

export default DjikstraAlgorithmVisualizer;