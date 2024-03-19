import { ChangeEvent, JSX, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, RefAttributes, useContext, useEffect, useRef, useState } from "react";
import AppContext from "@/context";
import { Button, Form, OverlayTrigger, Tooltip, TooltipProps } from "react-bootstrap";
import Papa from 'papaparse';

const renderTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>, tooltipText: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined) => (
  <Tooltip id="button-tooltip" {...props}>
    {tooltipText}
  </Tooltip>
);


const InputBox = () => {
  const [inputTextBox, setInputTextBox] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const uploadCSVFile = () =>{
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if(event && event.target && event.target.files)
    {
        const file = event.target.files[0];
        if (file) {
          Papa.parse(file, {
            complete: (result) => {
              console.log('Parsed Result', result.data);
              // Here, result.data is the CSV file content parsed into an array of arrays or objects,
              // depending on the options provided to Papa.parse.
              // You can now use this data in your application.
              const csvData  = result.data;
              try{
                let numArray : string[] = [];
                for(let i=0;i<csvData.length;i++)
                {
                  const csvArray : any = csvData[i];
                  if (csvArray.length!=1)
                  {

                    throw 1;
                  }
                  numArray.push(csvArray[0]);
                }
                setInput(convertInputToArray(numArray.join(',')));
              }
              catch{
                alert("Please make sure the CSV file only contains numeric values and only one column");
              }
            },
            header: false, // Set to true if the first row of the CSV contains column headers
          });
        }
        event.target.value = '';
    }
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
      {visualizationCategory === 1 && visualizationOption === 4 && (
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
            <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          alignItems: "center",
          marginTop: '10px'
        }}
      >
        <Form.Label>File Input (CSV)</Form.Label>
        <Button
          onClick={() => {
            //processInput();
          }}
        >
          Run
        </Button>
      </div>
      <OverlayTrigger
      placement="right"
      overlay={(props) => renderTooltip(props, "File must contain only 1 column, and it should only contain numeric values")}
    >
      <Button 
      onClick={uploadCSVFile}
        >
          Upload CSV File
        </Button>
        </OverlayTrigger>
      <input ref={fileInputRef} type="file" style={{
        display: 'none'
      }} accept=".csv, text/csv" onChange={handleFileChange}/>
    </Form.Group>
  );
};

export default InputBox;
