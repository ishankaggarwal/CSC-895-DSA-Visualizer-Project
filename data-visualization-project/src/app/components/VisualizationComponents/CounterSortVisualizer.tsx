import React from "react";
import {
  CountingSortArrayVisualizationAnimationInterface,
  SelectionSortArrayVisualizationInterface,
} from "@/app/interfaces/SelectionSortArrayVisualizationInterface";
import { counterSort } from "@/app/visualization-algorithms/CounterSort";
import AppContext from "@/context";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { setMaxIdleHTTPParsers } from "http";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const CounterSortVisualizer = () => {
  const {
    speedValue,
    isPlaying,
    input,
    setHoverValue,
    setIsHovered,
    setPosition,
    setMarkers,
  } = useContext(AppContext);

  const [arrayVisualization, setArrayVisualization] = useState<
    SelectionSortArrayVisualizationInterface[]
  >([]);
  const [animations, setAnimations] = useState<
    CountingSortArrayVisualizationAnimationInterface[]
  >([]);
  const [speed, setSpeed] = useState<number>(1);
  const [isPlayingValue, setIsPlayingValue] = useState<boolean>(true);
  const speedRef = useRef<number>(speed);
  const isPlayingRef = useRef<boolean>(isPlayingValue);
  const animationsRef = useRef<
    CountingSortArrayVisualizationAnimationInterface[]
  >([]);

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

  const createArrayVisualization = (array: number[]) => {
    const newArray = array.map((value, index) => {
      const newValue: SelectionSortArrayVisualizationInterface = {
        color: "transparent",
        value: value,
        index: index,
        type: "output",
      };
      return newValue;
    });

    if (array.length > 0) {
      const max = Math.max(...array);

      const count = Array(max + 1).fill(0);

      count.forEach((value, index) => {
        const newValue: SelectionSortArrayVisualizationInterface = {
          color: "transparent",
          value: 0,
          index: index,
          type: "count",
        };
        newArray.push(newValue);
      });
    }

    setArrayVisualization(newArray);
  };

  const visualizeArray = async (array: number[]) => {
    let animations: CountingSortArrayVisualizationAnimationInterface[] = [];

    animations = counterSort([...array]);

    console.log(animations);
    createArrayVisualization([...array]);
    if (animationsRef.current.length > 0) {
      setAnimations([]);
    } else {
      setAnimations(animations);
    }
  };

  const processAnimations = async () => {
    if (animationsRef.current.length > 0) {
      if (isPlayingRef.current) {
        const animation = animationsRef.current.shift();
        if (animation) {
          let newArray = [...arrayVisualization];
          const { colorI, valueI, indexI, type, currentLineMarkers } =
            animation;

          const targetElementIndex = newArray.findIndex(
            (value) => value.index === indexI && value.type === type
          );

          if (targetElementIndex !== -1) {
            newArray[targetElementIndex].value = valueI;
            newArray[targetElementIndex].color = colorI;
            newArray[targetElementIndex].type = type;
          }
          await sleep(3000 / speedRef.current);
          setAnimations(animationsRef.current);
          setMarkers(currentLineMarkers);
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
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "100%",
          overflow: "scroll",
        }}
      >
        <span>Count Array</span>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
          }}
        >
          {arrayVisualization.map((value, index) => {
            if (value.type === "count") {
              return (
                <div
                  key={index}
                  style={{
                    margin: "1px",
                    alignSelf: "flex-end",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      {value.index}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: value.value * 0.2,
                      backgroundColor: "green",
                    }}
                  ></div>
                  <div
                    style={{
                      padding: "3px",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      fontSize: "10px",
                      backgroundColor: value.color,
                      width: "fit-content",
                    }}
                    key={value.index}
                    id={"value" + index}
                  >
                    {value.value}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <span
          style={{
            marginTop: "5px",
          }}
        >
          Output Array
        </span>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
          }}
        >
          {arrayVisualization.map((value, index) => {
            if (value.type === "output") {
              return (
                <div
                  key={index}
                  style={{
                    margin: "1px",
                    alignSelf: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: value.value * 0.1,
                      backgroundColor: "green",
                    }}
                    onMouseMove={(e) => {
                      handleMouseEnter(e, value.value);
                    }}
                    onMouseLeave={handleMouseLeave}
                  ></div>
                  <div
                    style={{
                      padding: "3px",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      fontSize: "10px",
                      backgroundColor: value.color,
                      width: "fit-content",
                    }}
                    onMouseMove={(e) => {
                      handleMouseEnter(e, value.value);
                    }}
                    onMouseLeave={handleMouseLeave}
                    key={value.index}
                    id={"value" + index}
                  >
                    {value.value}
                  </div>
                </div>
              );
            }
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

export default CounterSortVisualizer;
