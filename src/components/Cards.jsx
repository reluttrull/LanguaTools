import React, { useEffect, useReducer, useRef, useState } from 'react';
import { CardFrontLanguage, LocalStorageKeys, DailyLocalStorageKeys } from '../utils/utils';

export default function Cards({ jsonData }) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [currentDisplayQuestion, setCurrentDisplayQuestion] = useState(0);
  let currentQuestion = useRef(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
  const [flip, setFlip] = useState(false);
  let cardFrontLanguage = localStorage.getItem(LocalStorageKeys.CARDFRONTLANGUAGE);

  const getNextStartingAt = (index) => {
    let nextCard = index + 1;
    while (nextCard < jsonData.length)
    {
      let currCardReviewDate = getReviewDate(nextCard);
      if (currCardReviewDate == null || Date.parse(currCardReviewDate) <= Date.now()) {
        break;
      } else {
      nextCard = nextCard + 1;
      }
    }
		if (nextCard < jsonData.length) {
			return nextCard;
		} else {
			setShowScore(true);
      return -1;
		}
  }

	const answerClick = (isCorrect) => {
    //get current step
    let today = new Date().toDateString();
    let interval = getInterval(currentQuestion.current);
    let reviewDate = getReviewDate(currentQuestion.current);
    let isNew = reviewDate ? false : true;
    let dailyTotalCards = localStorage.getItem(today + ',' + DailyLocalStorageKeys.TOTALCARDS);
    let dailyCorrectCards = localStorage.getItem(today + ',' + DailyLocalStorageKeys.CORRECTCARDS);
    let dailyIncorrectCards = localStorage.getItem(today + ',' + DailyLocalStorageKeys.INCORRECTCARDS);
    let dailyNewCards = localStorage.getItem(today + ',' + DailyLocalStorageKeys.NEWCARDS);
    let dailyReviewCards = localStorage.getItem(today + ',' + DailyLocalStorageKeys.REVIEWCARDS);
    if (!reviewDate) { 
      reviewDate = today;
    }

    //make changes based on selection
		if (isCorrect) {
			setScore(score + 1);
      interval > 0 ? interval = interval * 2 : interval = interval + 1;
		}
    else {
      setScore(score);
      interval > 1 ? interval = interval / 2 : interval = interval - 1;
    }     
    reviewDate = new Date(new Date(reviewDate).setDate(new Date(reviewDate).getDate() + interval)).toDateString();
    
    console.log(jsonData[currentQuestion.current].nlID + ',interval');
    console.log(interval);
    //write to localstorage
    localStorage.setItem(jsonData[currentQuestion.current].nlID + ',interval', interval);
    localStorage.setItem(jsonData[currentQuestion.current].nlID + ',reviewDate', reviewDate);
    if (dailyTotalCards) {
      dailyTotalCards++;
    } else {
      dailyTotalCards = 1;
    }
    localStorage.setItem(today + ',' + DailyLocalStorageKeys.TOTALCARDS, dailyTotalCards);
    if (isCorrect) {
      if (dailyCorrectCards) {
        dailyCorrectCards++;
      } else {
        dailyCorrectCards = 1;
      }
      localStorage.setItem(today + ',' + DailyLocalStorageKeys.CORRECTCARDS, dailyCorrectCards);
    } else {
      if (dailyIncorrectCards) {
        dailyIncorrectCards++;
      } else {
        dailyIncorrectCards = 1;
      }
      localStorage.setItem(today + ',' + DailyLocalStorageKeys.INCORRECTCARDS, dailyIncorrectCards);
    }

    if (isNew) {
      dailyNewCards++;
      localStorage.setItem(today + ',' + DailyLocalStorageKeys.NEWCARDS, dailyNewCards);
    } else {
      dailyReviewCards++;
      localStorage.setItem(today + ',' + DailyLocalStorageKeys.REVIEWCARDS, dailyReviewCards);
    }
    localStorage.setItem(today + ',' + DailyLocalStorageKeys.TOTALCARDS, dailyTotalCards);

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
    forceUpdate();
  }, []);
   
  return (
  <div>
    <div className="card-block" onClick={() => setFlip(!flip)}>
      <h3 className={`card ${flip ? 'down' : 'up'}`}>{cardFrontLanguage == CardFrontLanguage.NATIVE ? jsonData[currentDisplayQuestion].nltext : jsonData[currentDisplayQuestion].tltext}</h3>
      <h3 className={`card ${flip ? 'up' : 'down'}`}>{cardFrontLanguage == CardFrontLanguage.NATIVE ? jsonData[currentDisplayQuestion].tltext : jsonData[currentDisplayQuestion].nltext}</h3>
    </div> 
    <div>
      <button onClick={() => answerClick(false)}>incorrect</button>
      <button onClick={() => answerClick(true)}>correct</button>
    </div>
    <p>current score = {score}</p>
  </div>
  )
}