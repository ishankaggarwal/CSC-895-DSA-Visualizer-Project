"use client"
import { useState } from 'react';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Visualizer from './components/Visualizer';
import styles from './page.module.css';
import AppContext from '@/context';

export default function Home() {

  const [visualizationCategory,setVisualizationCategory] = useState<number>(0);
  const [visualizationOption,setVisualizationOption] = useState(0);
  const [speedValue,setSpeedValue] = useState(1);
  const [isPlaying,setIsPlaying] = useState(true);
  const [input,setInput] = useState<any>([]);


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
      setInput
    }}>
    <div className={styles.main}>
      <Header />
      <div style={{
        display: 'flex'
      }}>
      <SideMenu />
      <Visualizer/>
      </div>
    </div>
    </AppContext.Provider>
  );
};