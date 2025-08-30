import React, { useState, useEffect } from 'react';
import { ReviewSpeed, LocalStorageKeys, DailyLocalStorageKeys } from '../utils/utils';

export default function Stats({ jsonData }) {
  const [totalFuture, setTotalFuture] = useState(0);
  const [totalDue, setTotalDue] = useState(0);
  const [totalLearning, setTotalLearning] = useState(0);
  const [totalMastered, setTotalMastered] = useState(0);
  let today = new Date().toDateString();
  const [dailyTotalCards, setDailyTotalCards] = useState(localStorage.getItem(today + ',' + DailyLocalStorageKeys.TOTALCARDS));
  const [dailyCorrectCards, setDailyCorrectCards] = useState(localStorage.getItem(today + ',' + DailyLocalStorageKeys.CORRECTCARDS));
  const [dailyIncorrectCards, setDailyIncorrectCards] = useState(localStorage.getItem(today + ',' + DailyLocalStorageKeys.INCORRECTCARDS));
  const [dailyNewCards, setDailyNewCards] = useState(localStorage.getItem(today + ',' + DailyLocalStorageKeys.NEWCARDS));
  const [dailyReviewCards, setDailyReviewCards] = useState(localStorage.getItem(today + ',' + DailyLocalStorageKeys.REVIEWCARDS));
  const [dailyTotalRecordings, setDailyTotalRecordings] = useState(localStorage.getItem(today + ',' + DailyLocalStorageKeys.TOTALRECORDINGS));
  const [dailyTotalPronunciationCards, setDailyTotalPronunciationCards] = useState(localStorage.getItem(today + ',' + DailyLocalStorageKeys.TOTALPRONUNCIATIONCARDS));

  useEffect(() => {
    let settingsInterval = localStorage.getItem(LocalStorageKeys.SPEED);
    if (!settingsInterval) settingsInterval = ReviewSpeed.NORMAL;
    let localTotalFuture = 0;
    let localTotalDue = 0;
    let localTotalLearning = 0;
    let localTotalMastered = 0;
    let index = 0;
    let now = Date.now();
    // go through user stored card data
    while (index < jsonData.length) {
      // count future
      let dateStr = localStorage.getItem(jsonData[index].nlID + ",reviewDate");
      let storedInterval = localStorage.getItem(jsonData[index].nlID + ",interval");
      if (dateStr && storedInterval && Date.parse(dateStr) > now && Number(storedInterval) < Number(settingsInterval)) {
        localTotalFuture = localTotalFuture + 1;
        setTotalFuture(localTotalFuture);
      }
      // count mastered
      if (storedInterval && Number(storedInterval) >= Number(settingsInterval)) {
        localTotalMastered = localTotalMastered + 1;
        setTotalMastered(localTotalMastered);
      }
      // count learning
      if (storedInterval && Number(storedInterval) > 0 && Number(storedInterval) < Number(settingsInterval)) {
        localTotalLearning = localTotalLearning + 1;
        setTotalLearning(localTotalLearning);
      }
      // count due
      if ((!dateStr || Date.parse(dateStr) < now) // date before now
        && (!storedInterval || Number(storedInterval) < Number(settingsInterval))) { //not mastered
          localTotalDue = localTotalDue + 1;
          setTotalDue(localTotalDue);
      }
      index = index + 1;
    }
  }, []);
  return (
  <div>
    <h2>Stats</h2>
    <div class="container">
      <div class="column">
        <h3>Deck</h3>
        <hr />
        <p>Total future = {totalFuture || 0}</p>
        <p>Total due = {totalDue || 0}</p>
        <p>Total currently learning = {totalLearning || 0}</p>
        <p>Total mastered = {totalMastered || 0}</p>
      </div>
      <div class="column">
        <h3>Cards Today</h3>
        <hr />
        <p>Total cards today = {dailyTotalCards || 0}</p>
        <p>Total correct today = {dailyCorrectCards || 0}</p>
        <p>Total incorrect today = {dailyIncorrectCards || 0}</p>
        <p>Total new today = {dailyNewCards || 0}</p>
        <p>Total reviewed today = {dailyReviewCards || 0}</p>
      </div>
      <div class="column">
        <h3>Pronunciation today</h3>
        <hr />
        <p>Total recordings today = {dailyTotalRecordings || 0}</p>
        <p>Total pronunciation cards today = {dailyTotalPronunciationCards || 0}</p>
      </div>
    </div>
  </div>
  )
}