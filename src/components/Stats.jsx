import React, { useState, useEffect } from 'react';
import { ReviewSpeed, LocalStorageKeys, addDaysToDateString } from '../utils/utils';
import DailyStats from './DailyStats.jsx';

export default function Stats({ jsonData }) {
  const [totalFuture, setTotalFuture] = useState(0);
  const [totalDue, setTotalDue] = useState(0);
  const [totalLearning, setTotalLearning] = useState(0);
  const [totalMastered, setTotalMastered] = useState(0);
  const [thisDay, setThisDay] = useState(new Date().toISOString().split('T')[0]);
  let maxNew = localStorage.getItem(LocalStorageKeys.MAXNEW) || 10;
  let maxReview = localStorage.getItem(LocalStorageKeys.MAXREVIEW) || 40;

  const incrementDate = (num) => {
    setThisDay(addDaysToDateString(thisDay, num));
  }

  useEffect(() => {
    let settingsInterval = localStorage.getItem(LocalStorageKeys.SPEED);
    if (!settingsInterval) settingsInterval = ReviewSpeed.NORMAL;
    let localTotalFuture = 0;
    let localTotalDue = 0;
    let localTotalLearning = 0;
    let localTotalMastered = 0;
    let index = 0;
    let now = Date.now();
    // go through user stored review data
    while (index < jsonData.length) {
      let dateStr = localStorage.getItem(jsonData[index].nlID + ",reviewDate");
      let storedInterval = localStorage.getItem(jsonData[index].nlID + ",interval");
      // count future
      if (dateStr && storedInterval && Date.parse(dateStr) > now && Number(storedInterval) < Number(settingsInterval)) {
        localTotalFuture = localTotalFuture + 1;
      }
      // count mastered
      if (storedInterval && Number(storedInterval) >= Number(settingsInterval)) {
        localTotalMastered = localTotalMastered + 1;
      }
      // count learning
      if (storedInterval && Number(storedInterval) > 0 && Number(storedInterval) < Number(settingsInterval)) {
        localTotalLearning = localTotalLearning + 1;
      }
      // count due
      if ((dateStr && Date.parse(dateStr) < now) // date before now
        && (!storedInterval || Number(storedInterval) < Number(settingsInterval))) { //not mastered
          localTotalDue = localTotalDue + 1;
      }
      index = index + 1;
    }
    setTotalFuture(localTotalFuture);
    setTotalMastered(localTotalMastered);
    setTotalLearning(localTotalLearning);
    setTotalDue(localTotalDue > maxReview ? maxReview : localTotalDue);
  }, []);
  return (
  <div>
    <h2>Stats</h2>
    <div>
      <h3>Deck</h3>
      <hr />
      <p>Total future = {totalFuture || 0}</p>
      <p>Total due = {totalDue || 0}</p>
      <p>Total currently learning = {totalLearning || 0}</p>
      <p>Total mastered = {totalMastered || 0}</p>
    </div>
    <button onClick={() => incrementDate(-1)}>-</button>
    <button onClick={() => incrementDate(1)}>+</button>
    <DailyStats jsonData={jsonData} thisDay={thisDay} />
  </div>
  )
}