"use client"
import { useState } from 'react';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Visualizer from './components/Visualizer';
import styles from './page.module.css';
import AppContext from '@/context';

export default function Home() {

  const [visualizationCategory,setVisualizationCategory] = useState(0);
  const [visualizationOption,setVisualizationOption] = useState(0);

  return (
    <AppContext.Provider value={{
      visualizationCategory,
      setVisualizationCategory,
      visualizationOption,
      setVisualizationOption
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