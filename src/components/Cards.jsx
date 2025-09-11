import React, { useEffect, useReducer, useRef, useState } from 'react';
import { CardFrontLanguage, LocalStorageKeys, DailyLocalStorageKeys, isDateString, addDaysToDateString } from '../utils/utils';

export default function Cards({ jsonData }) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [currentDisplayQuestion, setCurrentDisplayQuestion] = useState(0);
  let currentQuestion = useRef(0); // updates with state
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
  const [flip, setFlip] = useState(false);
  let today = new Date().toISOString().split('T')[0]; // match stored format
  // from user settings
  let cardFrontLanguage = localStorage.getItem(LocalStorageKeys.CARDFRONTLANGUAGE);
  let maxNew = localStorage.getItem(LocalStorageKeys.MAXNEW) || 10;
  let maxReview = localStorage.getItem(LocalStorageKeys.MAXREVIEW) || 40;


  const getNextStartingAt = (index) => {
    let reviewedToday = localStorage.getItem(today + ',' + DailyLocalStorageKeys.REVIEWCARDS) || 0;
    let newToday = localStorage.getItem(today + ',' + DailyLocalStorageKeys.NEWCARDS) || 0;
    let nextIsReview = reviewedToday < maxReview;
    let nextCard = -1;
    // check for available reviews first
    if (nextIsReview)
    {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        // Check if the value matches the condition
        if (isDateString(value) && value <= today) { // due before or on today's date
          nextCard = jsonData.findIndex(card => card.nlID == key.split(",")[0]);
          return nextCard;
        }
      }
    }
    // then, if we still have new cards left today, study those
    let nextIsNew = newToday < maxNew;
    if (nextIsNew) {
      nextCard = index + 1;
      while (nextCard < jsonData.length)
      {
        let currCardReviewDate = getReviewDate(nextCard);
        if (currCardReviewDate == null) return nextCard; // new card, so return it
        else nextCard++;
      }
    } else {
      // if we're out of reviews and new cards, don't show more cards today
			setShowScore(true);
      return -1;
		}
  }

  const incrementCardsStat = (key) => {
    let count = localStorage.getItem(today + ',' + key);
    if (count) {
      count++;
    } else {
      count = 1;
    }
    localStorage.setItem(today + ',' + key, count);
  }

	const answerClick = (isCorrect) => {
    //get current step
    let interval = getInterval(currentQuestion.current);
    let reviewDate = getReviewDate(currentQuestion.current);
    let isNew = reviewDate ? false : true;
    if (isNew) { 
      reviewDate = today;
    }

    //make changes based on selection
		if (isCorrect) {
			setScore(score + 1);
      interval > 0 ? interval = interval * 2 : interval = interval + 1;
		}
    else {
      interval > 1 ? interval = interval / 2 : interval = 1;
    }     
    // add interval to review date and format for storage
    reviewDate = addDaysToDateString(today, interval);
    
    //write to localstorage
    localStorage.setItem(jsonData[currentQuestion.current].nlID + ',interval', interval);
    localStorage.setItem(jsonData[currentQuestion.current].nlID + ',reviewDate', reviewDate);

    incrementCardsStat(DailyLocalStorageKeys.TOTALCARDS);
    if (isCorrect) {
      incrementCardsStat(DailyLocalStorageKeys.CORRECTCARDS);
    } else {
      incrementCardsStat(DailyLocalStorageKeys.INCORRECTCARDS);
    }

    if (isNew) {
      incrementCardsStat(DailyLocalStorageKeys.NEWCARDS);
    } else {
      incrementCardsStat(DailyLocalStorageKeys.REVIEWCARDS);
    }

    //move on
		currentQuestion.current = getNextStartingAt(currentQuestion.current);
    setCurrentDisplayQuestion(currentQuestion.current);
    setFlip(false);
	};

  const getInterval = (id) => {
    let storedInterval = localStorage.getItem(jsonData[id].nlID + ',interval');
    if (storedInterval) {
      return Number(storedInterval);
    } else {
      return 0;
    }
  };

  const getReviewDate = (id) => {
    let storedDate = localStorage.getItem(jsonData[id].nlID + ',reviewDate');
    if (storedDate) {
      return storedDate;
    } else {
      return null;
    }
  };

  useEffect(() => {
    currentQuestion.current = getNextStartingAt(-1);
    setCurrentDisplayQuestion(currentQuestion.current);
    forceUpdate();
  }, []);
   
  return (
  <div>
    {!showScore ? 
    (<div>
      <div className="card-block" onClick={() => setFlip(!flip)}>
        <h3 className={`card ${flip ? 'down' : 'up'}`}>{cardFrontLanguage == CardFrontLanguage.NATIVE ? jsonData[currentDisplayQuestion].nltext : jsonData[currentDisplayQuestion].tltext}</h3>
        <h3 className={`card ${flip ? 'up' : 'down'}`}>{cardFrontLanguage == CardFrontLanguage.NATIVE ? jsonData[currentDisplayQuestion].tltext : jsonData[currentDisplayQuestion].nltext}</h3>
      </div> 
      <div>
        <button onClick={() => answerClick(false)}>incorrect</button>
        <button onClick={() => answerClick(true)}>correct</button>
      </div>
    </div>) : <div>You finished for today!</div>}
    <p>current score = {score}</p>
  </div>
  )
}