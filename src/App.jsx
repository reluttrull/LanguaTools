import { useEffect, useState } from 'react'
import './App.css';
import { FaBookOpen, FaChartLine, FaGear, FaMicrophone } from 'react-icons/fa6';
import { CardOrder, LocalStorageKeys } from './utils/utils.js';
import Cards from './components/Cards.jsx';
import Settings from './components/Settings.jsx';
import Stats from './components/Stats.jsx';
import Pronunciation from './components/Pronunciation.jsx';
import jsonData from './data/sentencePairs.json';
import js from '@eslint/js';

export default function App () {  
  let paramJsonData = jsonData;
  const [stateJsonData, setStateJsonData] = useState(paramJsonData);
  const Tabs = {
    REVIEW: 'review',
    SETTINGS: 'settings',
    STATS: 'stats',
    DAILYSTATS: 'daily stats',
    PRONUNCIATION: 'pronunciation'
  };
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(Tabs.REVIEW);  
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
  const toggleMenu = () => setIsMenuCollapsed(!isMenuCollapsed);
  const setTabCloseMenu = (tab) => {
    setTab(tab);
    toggleMenu();
  }
  const login = (userData) => {
    setUser(userData);
  }
  const logout = () => {
    setUser(null);
  }
  useEffect(() => {
    let cardOrder = localStorage.getItem(LocalStorageKeys.CARDORDER);
    if (cardOrder != null && cardOrder == CardOrder.SHUFFLED) {
      paramJsonData.sort(() => Math.random() - 0.5);
    }
    setStateJsonData(paramJsonData);
  }, []);

  return (
    <div>
      <div id="header">
        <h1 style={{ display: "inline", paddingRight: "20px", cursor: "pointer" }}
                  onClick={() => setTab(Tabs.REVIEW)}>LanguaTools</h1>
        <span style={{ width: isMenuCollapsed ? "50px" : "200px", transition: "width 0.3s", cursor: "pointer" }}>
          <button onClick={toggleMenu}>
            {isMenuCollapsed ? "☰" : "Close"}
          </button>
          {!isMenuCollapsed && (
            <div>
              <div onClick={() => setTabCloseMenu(Tabs.REVIEW)}>Study Cards</div>
              <div onClick={() => setTabCloseMenu(Tabs.SETTINGS)}>Settings</div>
              <div onClick={() => setTabCloseMenu(Tabs.STATS)}>Statistics</div>
              <div onClick={() => setTabCloseMenu(Tabs.PRONUNCIATION)}>Pronunciation Practice</div>
            </div>
          )}
        </span>
      </div>
      { tab == Tabs.REVIEW ? <Cards jsonData={stateJsonData} /> : <div></div>}
      { tab == Tabs.SETTINGS ? <Settings /> : <div></div>}
      { tab == Tabs.STATS ? <Stats jsonData={stateJsonData} /> : <div></div>}
      { tab == Tabs.PRONUNCIATION ? <Pronunciation jsonData={stateJsonData} /> : <div></div>}
    </div>
  )
}
