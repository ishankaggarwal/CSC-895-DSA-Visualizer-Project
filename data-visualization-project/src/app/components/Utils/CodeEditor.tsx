import { useContext, useEffect, useState } from 'react';
import AceEditor, { IMarker } from 'react-ace';
import 'ace-builds/src-noconflict/mode-python'; // or any other mode you need
import 'ace-builds/src-noconflict/theme-xcode';
import '../../../../styles/CodeEditor.css';
import ace from 'react-ace';
import AppContext from '@/context';

const CodeEditor = () =>{

    const {
        markers,
        editorValue,
        setEditorValue,
        visualizationCategory,
        visualizationOption
    } = useContext(AppContext);

    function fetchFile(filePath: string) {
        fetch(filePath)
          .then(response => response.blob())
          .then(blob => {
            return blob.text();
          }).then(text=>{
            console.log(text);
            setEditorValue(text);
          })
          .catch(error => {
            console.error('Error fetching the file:', error);
          });
      }
      

    useEffect(()=>{
        if(visualizationCategory===0 && visualizationOption===0)
        {
            fetchFile('/codefiles/bubblesort.py');
        }
    },[visualizationCategory,visualizationOption]);

    return(
        <AceEditor
        mode="python"
        theme="xcode"
        name="UNIQUE_ID_OF_DIV"
        value={editorValue}
        readOnly={true}
        style={{
            width: '90%'
        }}
        markers={markers}
        />
    )
}

export default CodeEditor;