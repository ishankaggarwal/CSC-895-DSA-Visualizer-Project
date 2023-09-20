"use client"
import Header from '../../components/Header';
import SideMenu from '../../components/sideMenu';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <Header />
      <SideMenu />
    </div>
  );
};