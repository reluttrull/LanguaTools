import React, { useState, useEffect } from 'react';
import { DailyLocalStorageKeys } from '../utils/utils';

export default function Stats({ jsonData, thisDay }) {
  const [dailyTotalCards, setDailyTotalCards] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.TOTALCARDS));
  const [dailyCorrectCards, setDailyCorrectCards] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.CORRECTCARDS));
  const [dailyIncorrectCards, setDailyIncorrectCards] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.INCORRECTCARDS));
  const [dailyNewCards, setDailyNewCards] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.NEWCARDS));
  const [dailyReviewCards, setDailyReviewCards] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.REVIEWCARDS));
  const [dailyTotalRecordings, setDailyTotalRecordings] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.TOTALRECORDINGS));
  const [dailyTotalPronunciationCards, setDailyTotalPronunciationCards] = useState(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.TOTALPRONUNCIATIONCARDS));

  useEffect(() => {
    // update when date changes
    setDailyTotalCards(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.TOTALCARDS));
    setDailyCorrectCards(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.CORRECTCARDS));
    setDailyIncorrectCards(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.INCORRECTCARDS));
    setDailyNewCards(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.NEWCARDS));
    setDailyReviewCards(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.REVIEWCARDS));
    setDailyTotalRecordings(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.TOTALRECORDINGS));
    setDailyTotalPronunciationCards(localStorage.getItem(thisDay + ',' + DailyLocalStorageKeys.TOTALPRONUNCIATIONCARDS));
  }, [thisDay]);

  return (
  <div>
    <h3>{thisDay}</h3>
    <hr />
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