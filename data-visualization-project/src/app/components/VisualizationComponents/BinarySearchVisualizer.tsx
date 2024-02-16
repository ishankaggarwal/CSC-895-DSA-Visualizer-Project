import React from "react";
import { BinarySearchAnimationInterface } from "@/app/interfaces/BinarySearchVisualizationInterface";
import { binarySearchWithAnimation } from "@/app/visualization-algorithms/BinarySearch";
import AppContext from "@/context";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const CounterSortVisualizer = () => {
  const { speedValue, isPlaying, input, target, setMarkers } =
    useContext(AppContext);

  const [arrayVisualization, setArrayVisualization] = useState<
    BinarySearchAnimationInterface[]
  >([]);
  const [animations, setAnimations] = useState<
    BinarySearchAnimationInterface[]
  >([]);
  const [speed, setSpeed] = useState<number>(1);
  const [isPlayingValue, setIsPlayingValue] = useState<boolean>(true);
  const speedRef = useRef<number>(speed);
  const isPlayingRef = useRef<boolean>(isPlayingValue);
  const animationsRef = useRef<BinarySearchAnimationInterface[]>([]);
  const [barWidth, setBarWidth] = useState<number>(100);
  const [found, setFound] = useState<number>();
  const marginWidth = 1;
  const [containerWidth, setContainerWidth] = useState<number>(
    0.7 * window.innerWidth
  );

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

  useEffect(() => {
    // Function to update windowWidth whenever the window is resized
    const handleResize = () => {
      setContainerWidth(0.7 * window.innerWidth);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const n = arrayVisualization.length;
    setBarWidth((containerWidth - 2 * marginWidth * n) / n);
  }, [containerWidth, arrayVisualization]);

  const createArrayVisualization = (array: number[]) => {
    const newArray = array.map((value, index) => {
      const newValue: BinarySearchAnimationInterface = {
        color: "transparent",
        index: index,
        value: value,
        type: "none",
        currentLineMarkers: [
          {
            startRow: 1,
            startCol: 0,
            endRow: 1,
            endCol: 1000,
            className: "myMarker",
            type: "text",
          },
        ],
      };
      return newValue;
    });

    setFound(undefined);
    setArrayVisualization(newArray);
  };

  const visualizeArray = async (array: number[], target: number) => {
    let animations: BinarySearchAnimationInterface[] = [];

    animations = binarySearchWithAnimation([...array], target);

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
          const { color, index, type, currentLineMarkers, found } = animation;

          const targetElementIndex = newArray.findIndex(
            (value) => value.index == index
          );

          if (targetElementIndex !== -1) {
            newArray[targetElementIndex].color = color;
            newArray[targetElementIndex].type = type;
          }

          if (found) {
            setFound(found);
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
          alignItems: "center",
          overflow: "scroll",
          width: containerWidth,
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
          }}
        >
          {arrayVisualization.map((value, index) => {
            if (value.value) {
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
                  <p style={{ textAlign: "center" }}>{value.index}</p>
                  <div
                    style={{
                      width: "100%",
                      height: value.value * 0.2,
                      backgroundColor: "green",
                    }}
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
                  >
                    {value.value}
                  </div>
                  <p
                    style={{
                      visibility: value.type === "none" ? "hidden" : "visible",
                      textAlign: "center",
                    }}
                  >
                    {value.type}
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div style={{ padding: "5px" }}>Result Index:</div>

        {found && (
          <div
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              textAlign: "center",
              overflow: "hidden",
              padding: "5px",
            }}
          >
            {found}
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <Button
          onClick={async () => {
            await visualizeArray(input, target);
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
