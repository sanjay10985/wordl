import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Line from "./components/Line";
import confetti from "canvas-confetti";
import Sidebar from "./components/Sidebar";

const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

const App = () => {
  const [words, setWords] = useState([]);
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [warning, setWarning] = useState("");

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

  console.log(solution);

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameOver) return;

      if (event.key === "Enter") {
        if (currentGuess.length !== 5) {
          setShake(true);
          setWarning("Guess must be 5 letters");
          setTimeout(() => setShake(false), 500);
          return;
        }

        if (!words.includes(currentGuess.toUpperCase())) {
          setShake(true);
          setWarning("Not a valid word");
          setTimeout(() => setShake(false), 500);
          return;
        }

        const newGuesses = [...guesses];
        const currentGuessIndex = newGuesses.findIndex(
          (guess) => guess === null
        );
        if (currentGuessIndex === -1) return;

        newGuesses[currentGuessIndex] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");
        setWarning("");

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
  }, [currentGuess, gameOver, guesses, solution, words]);

  const resetGame = () => {
    setGuesses(Array(6).fill(null));
    setCurrentGuess("");
    setGameOver(false);
    setWon(false);
    setWarning("");
    fetchWords();
  };

  return (
    <div className="flex  items-center relative justify-center min-h-screen bg-zinc-900 p-4 flex-col-reverse md:flex-row">
      <Sidebar />
      <div className="flex flex-col items-center justify-center flex-1">
        <motion.h1
          className="text-4xl font-bold mb-8 text-gray-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Wordle
        </motion.h1>
        <motion.div
          className="grid gap-2 p-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {guesses.map((guess, i) => {
            const isCurrentGuess =
              i === guesses.findIndex((val) => val === null);
            return (
              <Line
                key={i}
                guess={isCurrentGuess ? currentGuess : guess ?? ""}
                isFinal={!isCurrentGuess && guess !== null}
                solution={solution}
                shake={isCurrentGuess && shake}
              />
            );
          })}
        </motion.div>
        {warning && (
          <motion.div
            className="text-red-500 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {warning}
          </motion.div>
        )}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              className="mt-8 text-center bg-zinc-700 p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-zinc-100">
                {won ? "Congratulations! You won!" : "Game Over"}
              </h2>
              <p className="mb-4 text-gray-100">
                The word was:{" "}
                <span className="font-bold text-gray-100">
                  {solution.toUpperCase()}
                </span>
              </p>
              <motion.button
                className="px-4 py-2 bg-zinc-800 text-white rounded-md text-lg font-semibold hover:bg-zinc-900 transition-colors"
                onClick={resetGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
