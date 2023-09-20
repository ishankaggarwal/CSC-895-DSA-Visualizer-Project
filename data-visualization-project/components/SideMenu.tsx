import React, { useState } from 'react';
import '../styles/sideMenu.css';

const SideMenu: React.FC = () => {
  const [showArraysMenu, setShowArraysMenu] = useState(false);

  const toggleArraysMenu = () => {
    setShowArraysMenu(!showArraysMenu);
  };

  return (
    <div className="side-menu">
      <div className="menu-option" onClick={toggleArraysMenu}>
        Arrays
        <i className={`fa ${showArraysMenu ? 'fa-caret-up' : 'fa-caret-down'}`} />
      </div>
      {showArraysMenu && (
        <ul className="sub-menu">
          <li>Bubble Sort</li>
          <li>Insertion Sort</li>
          <li>Selection Sort</li>
          <li>Merge Sort</li>
        </ul>
      )}
      <div className="menu-option">Trees</div>
      <div className="menu-option">Graphs</div>
    </div>
  );
};

export default SideMenu;
