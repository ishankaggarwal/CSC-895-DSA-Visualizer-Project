"use client";
import {
  BubbleSortArrayVisualizationAnimationInterface,
  BubbleSortArrayVisualizationInterface,
} from "@/app/interfaces/BubbleSortArrayVIsualizationInterface";
import { BubbleSort } from "@/app/visualization-algorithms/bubblesort";
import { InsertionSort } from "@/app/visualization-algorithms/insertionsort";
import AppContext from "@/context";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const BubbleSortArrayVisualizer = () => {
  const {
    visualizationOption,
    speedValue,
    isPlaying,
    input,
    setMarkers,
    setHoverValue,
    setIsHovered,
    setPosition,
    position,
    hoverValue,
    isHovered,
    setIterations,
    setSwaps,
  } = useContext(AppContext);

  const [arrayVisualization, setArrayVisualization] = useState<
    BubbleSortArrayVisualizationInterface[]
  >([]);
  const [animations, setAnimations] = useState<
    BubbleSortArrayVisualizationAnimationInterface[]
  >([]);
  const [speed, setSpeed] = useState<number>(1);
  const [isPlayingValue, setIsPlayingValue] = useState<boolean>(true);
  const speedRef = useRef<number>(speed);
  const isPlayingRef = useRef<boolean>(isPlayingValue);
  const animationsRef = useRef<
    BubbleSortArrayVisualizationAnimationInterface[]
  >([]);
  const [barHeight, setBarHeight] = useState<number>(0);
  const [barWidth, setBarWidth] = useState<number>(100);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const marginWidth = 1;
  const itemEls = useRef<any>({});

  useEffect(() => {
    if (typeof window === "undefined" || window === null) {
      // Early return if window is not defined
      return;
    }

    // Function to update windowWidth whenever the window is resized
    const handleResize = () => {
      setContainerWidth(0.7 * window.innerWidth);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    handleResize();

    // Remove the event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const n = arrayVisualization.length;
    setBarWidth((containerWidth - 50 - 2 * marginWidth * n) / n);
  }, [containerWidth, arrayVisualization]);

  useEffect(() => {
    isPlayingRef.current = isPlayingValue;
    processAnimations();
  }, [isPlayingValue]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    setIsPlayingValue(isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    setSpeed(speedValue);
  }, [speedValue]);

  useEffect(() => {
    createArrayVisualization(input);
    setAnimations([]);
  }, [input]);

  useEffect(() => {
    async function rerender() {
      animationsRef.current = [...animations];
      await processAnimations();
    }
    rerender();
  }, [animations]);

  const createArrayVisualization = (array: number[]) => {
    let maxValue = Number.NEGATIVE_INFINITY;
    const newArray = array.map((value, index) => {
      const newValue: BubbleSortArrayVisualizationInterface = {
        color: "transparent",
        value: value,
        index: index,
      };
      maxValue = Math.max(maxValue, value);
      return newValue;
    });
    setArrayVisualization(newArray);
    setBarHeight(500 / maxValue);
  };

  const visualizeArray = async (array: number[]) => {
    let animations: BubbleSortArrayVisualizationAnimationInterface[] = [];
    if (visualizationOption === 0) {
      animations = BubbleSort([...array]);
    }
    if (visualizationOption === 1) {
      animations = InsertionSort([...array]);
    }
    createArrayVisualization([...array]);
    if (animationsRef.current.length > 0) {
      setAnimations([]);
    } else {
      setAnimations(animations);
    }
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: number
  ) => {
    setIsHovered(true);
    setPosition({ x: e.clientX, y: e.clientY });
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const processAnimations = async () => {
    if (animationsRef.current.length > 0) {
      if (isPlayingRef.current) {
        const animation = animationsRef.current.shift();
        if (animation) {
          let newArray = [...arrayVisualization];
          const {
            colorI,
            colorJ,
            valueI,
            valueJ,
            indexI,
            indexJ,
            iterations,
            swaps,
            currentLineMarkers,
          } = animation;
          newArray[indexI].value = valueI;
          newArray[indexI].color = colorI;
          newArray[indexJ].value = valueJ;
          newArray[indexJ].color = colorJ;
          setMarkers(currentLineMarkers);
          setArrayVisualization(newArray);
          setIterations(iterations);
          setSwaps(swaps);
          await sleep(3000 / speedRef.current);
          setAnimations(animationsRef.current);
        }
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "scroll",
          width: containerWidth - 50,
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
          }}
        >
          {arrayVisualization.map((value, index) => {
            return (
              <div
                key={index}
                style={{
                  alignSelf: "flex-end",
                  width: barWidth,
                  margin: marginWidth,
                  minWidth: marginWidth * 2,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: value.value * barHeight,
                    backgroundColor:
                      value.color === "transparent" ? "green" : value.color,
                  }}
                  onMouseOver={(e) => {
                    handleMouseEnter(e, value.value);
                  }}
                  onMouseMove={(e) => {
                    handleMouseEnter(e, value.value);
                  }}
                  onMouseLeave={handleMouseLeave}
                ></div>
                <div
                  style={{
                    borderStyle: "solid",
                    borderWidth: "1px",
                    backgroundColor: value.color,
                    width: "100%",
                    textAlign: "center",
                    overflow: "hidden",
                  }}
                  key={value.index}
                  id={"value" + index}
                  ref={(element) => (itemEls.current[index] = element)}
                >
                  {value.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          marginTop: "30px",
        }}
      >
        <Button
          onClick={async () => {
            await visualizeArray(input);
          }}
        >
          {animationsRef.current.length > 0 ? (
            <FontAwesomeIcon icon={faStop} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </Button>
      </div>
    </>
  );
};

export default BubbleSortArrayVisualizer;
