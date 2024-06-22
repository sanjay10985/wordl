import React, { useEffect, useState } from "react";
import Line from "./Line";

const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

const App = () => {
  const [words, setWords] = useState([]);
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  useEffect(() => {
    const fetchWords = async () => {
      const respose = await fetch(API_URL);
      const data = await respose.json();
      const randomWord = data[Math.floor(Math.random() * data.length)];
      setWords(words);
      setSolution(randomWord.toLowerCase());
    };
    fetchWords();
  }, []);

  console.log(solution);

  useEffect(() => {
    const handleType = (event) => {
      if (gameOver) {
        return;
      }

      if (event.key === "Enter") {
        if (currentGuess.length !== 5) {
          return;
        }
        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
        const isCorrect = solution === currentGuess;
        if (isCorrect) {
          setGameOver(true);
        }
      }

      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }
      if (currentGuess.length >= 5) {
        return;
      }
      const isLetter = event.key.match(/^[a-z]{1}$/) != null;
      if (isLetter) {
        setCurrentGuess((prevData) => prevData + event.key);
      }
    };

    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, gameOver, solution]);

  return (
    <div className="flex gap-2 flex-col ">
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex((val) => val == null);
        return (
          <Line
            key={i}
            guess={isCurrentGuess ? currentGuess : guess ?? ""}
            isFinal={!isCurrentGuess && guess != null}
            solution={solution}
          />
        );
      })}
    </div>
  );
};

export default App;
