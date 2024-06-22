import React from "react";
const WORD_LENGTH = 5;

const Line = ({ guess, isFinal, solution }) => {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];

    let className =
      "w-10 h-10 border border-black border-solid flex justify-center uppercase items-center ";
    if (isFinal) {
      if (char === solution[i]) {
        className += "bg-green-400";
      } else if (solution.includes(char)) {
        className += "bg-yellow-400";
      } else {
        className += "bg-gray-400";
      }
    }

    tiles.push(
      <div key={i} className={className}>
        {char}
      </div>
    );
  }
  return <div className="flex gap-4 uppercase">{tiles}</div>;
};

export default Line;
