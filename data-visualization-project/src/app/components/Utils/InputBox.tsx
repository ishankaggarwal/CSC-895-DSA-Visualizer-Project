import { useContext, useEffect, useState } from "react";
import AppContext from "@/context";
import { Button, Form } from "react-bootstrap";

const InputBox = () => {
  const [inputTextBox, setInputTextBox] = useState("");

  const {
    setInput,
    setTarget,
    setNode1,
    setNode2,
    target,
    node1,
    node2,
    visualizationCategory,
    visualizationOption,
  } = useContext(AppContext);

  const processInput = () => {
    if (visualizationCategory === 0 || visualizationCategory === 1) {
      setInput(convertInputToArray(inputTextBox));
    }
  };

  const processTarget = (target: string) => {
    setTarget(parseInt(target));
  };

  const convertInputToArray = (input: string) => {
    const elements = input
      .replace(/[\[\]]/g, "")
      .trim()
      .replace(" ", "")
      .split(",");
    console.log(elements);
    // Convert each element to a number and return the array
    return elements.map((element) => parseFloat(element));
  };

  return (
    <Form.Group
      className="mb-3"
      controlId="exampleForm.ControlTextarea1"
      style={{
        width: "90%",
      }}
    >
      {visualizationCategory === 0 && visualizationOption === 5 && (
        <>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <Form.Label>Target Element</Form.Label>
            <Form.Control
              type="number"
              value={target}
              onChange={(event) => {
                processTarget(event.target.value);
              }}
            />
          </div>
        </>
      )}
      {visualizationCategory === 1 && visualizationOption === 5 && (
        <>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div style={{ width: "45%" }}>
              <Form.Label>Node 1</Form.Label>
              <Form.Control
                type="number"
                value={node1}
                onChange={(event) => {
                  setNode1(parseInt(event.target.value));
                }}
              />
            </div>
            <div style={{ width: "45%", marginLeft: "1%" }}>
              <Form.Label>Node 2</Form.Label>
              <Form.Control
                type="number"
                value={node2}
                onChange={(event) => {
                  setNode2(parseInt(event.target.value));
                }}
              />
            </div>
          </div>
        </>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        <Form.Label>Array Input</Form.Label>
        <Button
          onClick={() => {
            processInput();
          }}
        >
          Run
        </Button>
      </div>
      <Form.Control
        as="textarea"
        rows={10}
        value={inputTextBox}
        onChange={(event) => {
          setInputTextBox(event.target.value);
        }}
      />
    </Form.Group>
  );
};

export default InputBox;
