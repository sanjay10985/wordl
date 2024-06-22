import React from "react";
import { motion } from "framer-motion";

const WORD_LENGTH = 5;

const Line = ({ guess, isFinal, solution }) => {
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];

    let className =
      "w-12 h-12 border-2 border-gray-300 rounded-md flex justify-center items-center text-2xl font-bold ";
    let bgColor = "bg-white";

    if (isFinal) {
      if (char === solution[i]) {
        bgColor = "bg-green-500";
        className += "text-white";
      } else if (solution.includes(char)) {
        bgColor = "bg-yellow-500";
        className += "text-white";
      } else {
        bgColor = "bg-gray-400";
        className += "text-white";
      }
    }

    tiles.push(
      <motion.div
        key={i}
        className={`${className} ${bgColor}`}
        initial={{ scale: 1 }}
        animate={{ scale: isFinal ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        {char}
      </motion.div>
    );
  }

  return <div className="flex gap-2 mb-2 uppercase">{tiles}</div>;
};

export default Line;
