"use client"
import { useState } from 'react';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Visualizer from './components/Visualizer';
import styles from './page.module.css';
import AppContext from '@/context';
import { IMarker } from 'react-ace';
import InputBox from './components/Utils/InputBox';
import CodeEditor from './components/Utils/CodeEditor';

export default function Home() {

  const [visualizationCategory,setVisualizationCategory] = useState<number>(0);
  const [visualizationOption,setVisualizationOption] = useState(0);
  const [speedValue,setSpeedValue] = useState(1);
  const [isPlaying,setIsPlaying] = useState(true);
  const [input,setInput] = useState<any>([]);
  const [editorValue, setEditorValue] = useState('');
  const [markers,setMarkers] = useState<IMarker[]>([]);


  return (
    <AppContext.Provider value={{
      visualizationCategory,
      setVisualizationCategory,
      visualizationOption,
      setVisualizationOption,
      speedValue,
      setSpeedValue,
      isPlaying,
      setIsPlaying,
      input,
      setInput,
      editorValue,
      setEditorValue,
      markers,
      setMarkers
    }}>
    <div className={styles.main}>
      <Header />
      <SideMenu />
      <Visualizer/>
      <div style={{
                width: '30%',
                position: 'absolute',
                right: 0
            }}>
            <CodeEditor/>
            </div>
    </div>
    </AppContext.Provider>
  );
};