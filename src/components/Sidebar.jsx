import React from "react";
import { motion } from "framer-motion";

const Sidebar = () => {
  return (
    <motion.div
      className="w-full md:w-1/4 bg-zinc-800 absolute p-6 right-8 rounded-lg shadow-md mb-8 md:mb-0 md:mr-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-100 mb-4">How to Play</h2>
      <p className="text-gray-300 mb-4">
        Wordle is a word guessing game. You have 6 attempts to guess a 5-letter
        word.
      </p>
      <h3 className="text-xl font-bold text-gray-100 mb-2">Instructions:</h3>
      <ul className="list-disc list-inside text-gray-300 mb-4">
        <li>Enter a valid 5-letter word and press Enter.</li>
        <li>
          Each guess will show feedback:
          <ul className="ml-4">
            <li>
              <span className="text-green-500 font-bold">Green:</span> Correct
              letter in the correct position.
            </li>
            <li>
              <span className="text-yellow-500 font-bold">Yellow:</span> Correct
              letter in the wrong position.
            </li>
            <li>
              <span className="text-gray-500 font-bold">Gray:</span> Incorrect
              letter.
            </li>
          </ul>
        </li>
      </ul>
      <h3 className="text-xl font-bold text-gray-100 mb-2">Rules:</h3>
      <ul className="list-disc list-inside text-gray-300">
        <li>You have 6 attempts to guess the word.</li>
        <li>Only valid 5-letter words are accepted.</li>
        <li>Press Backspace to delete the last letter.</li>
      </ul>
    </motion.div>
  );
};

export default Sidebar;
