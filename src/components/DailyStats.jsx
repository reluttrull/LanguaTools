import React, { useState, useEffect } from 'react';
import { ReviewSpeed, LocalStorageKeys, DailyLocalStorageKeys, isDateString } from '../utils/utils';

export default function Stats({ jsonData, thisDay }) {
  const [totalFuture, setTotalFuture] = useState(0);
  const [totalDue, setTotalDue] = useState(0);
  const [totalLearning, setTotalLearning] = useState(0);
  const [totalMastered, setTotalMastered] = useState(0);
  //let thisDay = new Date().toISOString().split('T')[0];
  const [dailyTotalCards, setDailyTotalCards] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.TOTALCARDS));
  const [dailyCorrectCards, setDailyCorrectCards] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.CORRECTCARDS));
  const [dailyIncorrectCards, setDailyIncorrectCards] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.INCORRECTCARDS));
  const [dailyNewCards, setDailyNewCards] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.NEWCARDS));
  const [dailyReviewCards, setDailyReviewCards] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.REVIEWCARDS));
  const [dailyTotalRecordings, setDailyTotalRecordings] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.TOTALRECORDINGS));
  const [dailyTotalPronunciationCards, setDailyTotalPronunciationCards] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.TOTALPRONUNCIATIONCARDS));

  return (
  <div>
    <h2>Stats {thisDay}</h2>
    <div className="container">
      <div className="column">
        <h3>Cards</h3>
        <hr />
        <p>Total cards = {dailyTotalCards || 0}</p>
        <p>Total correct = {dailyCorrectCards || 0}</p>
        <p>Total incorrect = {dailyIncorrectCards || 0}</p>
        <p>Total new = {dailyNewCards || 0}</p>
        <p>Total reviewed = {dailyReviewCards || 0}</p>
      </div>
      <div className="column">
        <h3>Pronunciation</h3>
        <hr />
        <p>Total recordings = {dailyTotalRecordings || 0}</p>
        <p>Total pronunciation cards = {dailyTotalPronunciationCards || 0}</p>
      </div>
    </div>
  </div>
  )
}