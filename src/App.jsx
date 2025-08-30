import { useEffect, useState } from 'react'
import './App.css';
import { FaBookOpen, FaChartLine, FaGear, FaMicrophone } from 'react-icons/fa6';
import { CardOrder, LocalStorageKeys } from './utils/utils.js';
import Cards from './components/Cards.jsx';
import Settings from './components/Settings.jsx';
import Stats from './components/Stats.jsx';
import LoginForm from './components/LoginForm.jsx';
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
    PRONUNCIATION: 'pronunciation'
  };
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(Tabs.REVIEW);
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
      <div id="tabbar">
        <button onClick={() => {setTab(Tabs.REVIEW)}}><FaBookOpen /></button>
        <button onClick={() => {setTab(Tabs.SETTINGS)}}><FaGear /></button>
        <button onClick={() => {setTab(Tabs.STATS)}}><FaChartLine /></button>
        <button onClick={() => {setTab(Tabs.PRONUNCIATION)}}><FaMicrophone /></button>
      </div>
      { tab == Tabs.REVIEW ? <Cards jsonData={stateJsonData} /> : <div></div>}
      { tab == Tabs.SETTINGS ? <Settings /> : <div></div>}
      { tab == Tabs.STATS ? <Stats jsonData={stateJsonData} /> : <div></div>}
      { tab == Tabs.PRONUNCIATION ? <Pronunciation jsonData={stateJsonData} /> : <div></div>}
    </div>
  )
}
