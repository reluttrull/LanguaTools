import { useEffect, useState, useRef } from "react";
import { TextToSpeech, Positions } from 'tts-react'
import { DailyLocalStorageKeys } from "../utils/utils";

const Pronunciation = ({ jsonData }) => {
  const audioRef = useRef();
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [showFinished, setShowFinished] = useState(false);
  const [displayCurrentQuestion, setDisplayCurrentQuestion] = useState(0);
  let currentQuestion = 0;
  let today = new Date().toDateString();

  const getNextStartingAt = (index) => {
    console.log('current index: ' + index);
    let nextCard = index + 1;
    console.log('next index: ' + nextCard);
		if (nextCard < jsonData.length) {
			currentQuestion = nextCard;
		} else {
			setShowFinished(true);
      currentQuestion = -1;
		}
    setDisplayCurrentQuestion(currentQuestion);
    
    let dailyTotalPronunciationCards = localStorage.getItem(today + ',' + DailyLocalStorageKeys.TOTALPRONUNCIATIONCARDS);
    if (!dailyTotalPronunciationCards) dailyTotalPronunciationCards = '1';
    dailyTotalPronunciationCards++;
    localStorage.setItem(today + ',' + DailyLocalStorageKeys.TOTALPRONUNCIATIONCARDS, dailyTotalPronunciationCards);
  }

  useEffect(() => {
    // action on update of audio url
    if (audioURL && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.load();
        audioRef.current.play();
    }
}, [audioURL]);

  const startRecording = async () => {
    let newAudioUrl = "";
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      newAudioUrl = URL.createObjectURL(audioBlob);
      setAudioURL(newAudioUrl);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    let dailyTotalRecordings = localStorage.getItem(today + ',' + DailyLocalStorageKeys.TOTALRECORDINGS);
    dailyTotalRecordings++;
    localStorage.setItem(today + ',' + DailyLocalStorageKeys.TOTALRECORDINGS, dailyTotalRecordings);
  };

  return (
    <div>
      <div className="card-block" onClick={() => getNextStartingAt(displayCurrentQuestion)}>
        <h3 className="card up">{jsonData[displayCurrentQuestion].tltext}</h3>
      </div> 
      <div>You: </div>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      {audioURL && (
        <div>
          <audio controls ref={audioRef} style={{display:"none"}}>
            <source src={audioURL} type="audio/wav" />
          </audio>
        </div>
      )}
      <hr />
    <div>Text-to-speech: </div>
      <TextToSpeech lang="es-MX" position={Positions.BC} markTextAsSpoken>
        <p style={{display:"none"}}>{jsonData[displayCurrentQuestion].tltext}</p>
      </TextToSpeech>
    </div>
  );
};

export default Pronunciation;