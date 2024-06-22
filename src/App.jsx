import React, { useEffect, useState } from "react";
import Line from "./components/Line";
import confetti from "canvas-confetti";

const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

const App = () => {
  const [words, setWords] = useState([]);
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  const fetchWords = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setWords(data);
      const randomWord = data[Math.floor(Math.random() * data.length)];
      setSolution(randomWord.toLowerCase());
    } catch (error) {
      console.error("Failed to fetch words:", error);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameOver) return;

      if (event.key === "Enter") {
        if (currentGuess.length !== 5) return;

        const newGuesses = [...guesses];
        const currentGuessIndex = newGuesses.findIndex(
          (guess) => guess === null
        );
        if (currentGuessIndex === -1) return;

        newGuesses[currentGuessIndex] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        if (currentGuess.toLowerCase() === solution) {
          setWon(true);
          setGameOver(true);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } else if (currentGuessIndex === 5) {
          setGameOver(true);
        }
      } else if (event.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (currentGuess.length < 5 && event.key.match(/^[a-z]$/i)) {
        setCurrentGuess((prev) => prev + event.key.toLowerCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, gameOver, guesses, solution]);

  const resetGame = () => {
    setGuesses(Array(6).fill(null));
    setCurrentGuess("");
    setGameOver(false);
    setWon(false);
    fetchWords();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Wordle</h1>
      <div className="grid gap-2">
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val === null);
          return (
            <Line
              key={i}
              guess={isCurrentGuess ? currentGuess : guess ?? ""}
              isFinal={!isCurrentGuess && guess !== null}
              solution={solution}
            />
          );
        })}
      </div>
      {gameOver && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {won ? "Congratulations! You won!" : "Game Over"}
          </h2>
          <p className="mb-4">The word was: {solution.toUpperCase()}</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
