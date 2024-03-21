import { useContext, useEffect, useState } from "react";
import AceEditor, { IMarker } from "react-ace";
import "ace-builds/src-noconflict/mode-python"; // or any other mode you need
import "ace-builds/src-noconflict/theme-xcode";
import "../../../../styles/CodeEditor.css";
import AppContext from "@/context";

const CodeEditor = () => {
  const {
    markers,
    editorValue,
    setEditorValue,
    visualizationCategory,
    visualizationOption,
  } = useContext(AppContext);

  useEffect(() => {
    function fetchFile(filePath: string) {
      fetch(filePath)
        .then((response) => response.blob())
        .then((blob) => {
          return blob.text();
        })
        .then((text) => {
          console.log(text);
          setEditorValue(text);
        })
        .catch((error) => {
          console.error("Error fetching the file:", error);
        });
    }
    if (visualizationCategory === 0 && visualizationOption === 0) {
      fetchFile("/codefiles/bubblesort.py");
    }
    if (visualizationCategory === 0 && visualizationOption === 1) {
      fetchFile("/codefiles/insertionsort.py");
    }
    if (visualizationCategory === 0 && visualizationOption === 2) {
      fetchFile("/codefiles/selectionsort.py");
    }
    if (visualizationCategory === 0 && visualizationOption === 3) {
      fetchFile("/codefiles/mergesort.py");
    }
    if (visualizationCategory === 0 && visualizationOption === 4) {
      fetchFile("/codefiles/quicksort.py");
    }
    if (visualizationCategory === 0 && visualizationOption === 5) {
      fetchFile("/codefiles/binarysearch.py");
    }
    if (visualizationCategory === 0 && visualizationOption === 6) {
      fetchFile("/codefiles/countsort.py");
    }
    if (visualizationCategory === 1 && visualizationOption === 0) {
      fetchFile("/codefiles/inordertraversal.py");
    }
    if (visualizationCategory === 1 && visualizationOption === 1) {
      fetchFile("/codefiles/preordertraversal.py");
    }
    if (visualizationCategory === 1 && visualizationOption === 2) {
      fetchFile("/codefiles/postordertraversal.py");
    }
    if (visualizationCategory === 1 && visualizationOption === 3) {
      fetchFile("/codefiles/levelordertraversal.py");
    }
    if (visualizationCategory === 1 && visualizationOption === 4) {
      fetchFile("/codefiles/lowestcommonancestor.py");
    }
    if (visualizationCategory === 2 && visualizationOption === 0) {
      fetchFile("/codefiles/dfs.py");
    }
    if (visualizationCategory === 2 && visualizationOption === 1) {
      fetchFile("/codefiles/bfs.py");
    }
    if (visualizationCategory === 2 && visualizationOption === 3) {
      fetchFile("/codefiles/topologicalsort.py");
    }
    if (visualizationCategory === 2 && visualizationOption === 4) {
      fetchFile("/codefiles/floydwarshall.py");
    }
    if (visualizationCategory === 2 && visualizationOption === 5) {
      fetchFile("/codefiles/cycledetection.py");
    }
    if (visualizationCategory === 2 && visualizationOption === 6) {
      fetchFile("/codefiles/prim.py");
    }
    if (visualizationCategory === 2 && visualizationOption === 7) {
      fetchFile("/codefiles/levelordergraphtraversal.py");
    }
  }, [visualizationCategory, visualizationOption, setEditorValue]);

  return (
    <AceEditor
      mode="python"
      theme="xcode"
      name="UNIQUE_ID_OF_DIV"
      value={editorValue}
      readOnly={true}
      markers={markers}
      style={{
        height: `${visualizationCategory === 0 ? "80%" : "100%"}`,
      }}
    />
  );
};

export default CodeEditor;
