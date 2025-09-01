import { useState } from 'react';
import { ReviewSpeed, CardFrontLanguage, CardOrder, LocalStorageKeys } from '../utils/utils.js';

export default function Settings() {
  const [speed, setSpeed] = useState(localStorage.getItem(LocalStorageKeys.SPEED));
  const [cardFront, setCardFront] = useState(localStorage.getItem(LocalStorageKeys.CARDFRONTLANGUAGE));
  const [cardOrder, setCardOrder] = useState(localStorage.getItem(LocalStorageKeys.CARDORDER));
  const [maxNew, setMaxNew] = useState(localStorage.getItem(LocalStorageKeys.MAXNEW));
  const [maxReview, setMaxReview] = useState(localStorage.getItem(LocalStorageKeys.MAXREVIEW));
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
    setHasUnsavedChanges(true);
  };
  const handleCardFrontChange = (event) => {
    setCardFront(event.target.value);
    setHasUnsavedChanges(true);
  };
  const handleCardOrderChange = (event) => {
    setCardOrder(event.target.value);
    setHasUnsavedChanges(true);
  };
  const handleMaxNewChange = (event) => {
    setMaxNew(event.target.value);
    setHasUnsavedChanges(true);
  };
  const handleMaxReviewChange = (event) => {
    setMaxReview(event.target.value);
    setHasUnsavedChanges(true);
  };
  const saveChanges = () => {
    if (speed) localStorage.setItem(LocalStorageKeys.SPEED, speed);
    if (cardFront) localStorage.setItem(LocalStorageKeys.CARDFRONTLANGUAGE, cardFront);
    if (cardOrder) localStorage.setItem(LocalStorageKeys.CARDORDER, cardOrder);
    if (maxNew) localStorage.setItem(LocalStorageKeys.MAXNEW, maxNew);
    if (maxReview) localStorage.setItem(LocalStorageKeys.MAXREVIEW, maxReview);
    setHasUnsavedChanges(false);
  }

  return (
  <div>
    <h2>Settings</h2>    
    <div>
      <label htmlFor="reviewSpeedDropdown">Review speed:</label>
      <select id="reviewSpeedDropdown" value={speed ? speed : ReviewSpeed.NORMAL} onChange={handleSpeedChange}>
        <option value={ReviewSpeed.SLOW}>Slow</option>
        <option value={ReviewSpeed.NORMAL}>Normal</option>
        <option value={ReviewSpeed.FAST}>Fast</option>
      </select>  
    </div>
    <div>
      <label htmlFor="cardFrontLanguageDropdown">Language on card front:</label>
      <select id="cardFrontLanguageDropdown" value={cardFront ? cardFront : CardFrontLanguage.TARGET} onChange={handleCardFrontChange}>
        <option value={CardFrontLanguage.TARGET}>Target language</option>
        <option value={CardFrontLanguage.NATIVE}>Native language</option>
      </select>
    </div>  
    <div>
      <label htmlFor="cardOrderDropdown">Card order:</label>
      <select id="cardOrderDropdown" value={cardOrder ? cardOrder : CardOrder.INORDER} onChange={handleCardOrderChange}>
        <option value={CardOrder.INORDER}>In order</option>
        <option value={CardOrder.SHUFFLED}>Shuffled</option>
      </select>  
    </div>
    <div>
      <label htmlFor="maxNewSlider">Max new per day:</label>
      <input id="maxNewSlider" type="range" min="0" max="100" step="5" 
          value={maxNew ? maxNew : 10} onChange={handleMaxNewChange} />
      <span>{maxNew ? maxNew : 10}</span>
    </div>
    <div>
      <label htmlFor="maxReviewSlider">Max review per day:</label>
      <input id="maxReviewSlider" type="range" min="0" max="200" step="5" 
          value={maxReview ? maxReview : 40} onChange={handleMaxReviewChange} />
      <span>{maxReview ? maxReview : 40}</span>
    </div>

    <button className={hasUnsavedChanges ? "up" : "down"} onClick={() => saveChanges()}>Save Changes</button>
  </div>
  )
}