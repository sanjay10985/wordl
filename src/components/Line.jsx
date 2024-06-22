import React from "react";
import { motion } from "framer-motion";

const WORD_LENGTH = 5;

const Line = ({ guess, isFinal, solution, shake }) => {
  const tiles = [];

  const flipVariants = {
    hidden: { rotateY: 0 },
    visible: (i) => ({
      rotateX: 360,
      transition: {
        times: [0, 0.5, 1],
        delay: i * 0.2,
        duration: 1.2,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    }),
  };

  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];

    let bgColor = isFinal ? "bg-zinc-600" : "bg-transparent";
    let borderColor = char ? "border-zinc-400" : "border-zinc-600";
    let textColor = "text-zinc-100";

    if (isFinal) {
      if (char === solution[i]) {
        bgColor = "bg-green-500";
      } else if (solution.includes(char)) {
        bgColor = "bg-yellow-500";
      }
      borderColor = bgColor.replace("bg-", "border-");
    }

    tiles.push(
      <motion.div
        key={i}
        className={`w-14 h-14 border-2 rounded flex justify-center items-center ${borderColor} ${bgColor}`}
        initial={false}
        animate={isFinal ? "visible" : "hidden"}
        variants={flipVariants}
        custom={i}
        onAnimationStart={() => {
          // Reset the background color before animation
          if (isFinal) {
            bgColor = "bg-transparent";
          }
        }}
        onAnimationComplete={() => {
          // Set the final background color after animation
          if (isFinal) {
            if (char === solution[i]) {
              bgColor = "bg-green-500";
            } else if (solution.includes(char)) {
              bgColor = "bg-yellow-500";
            } else {
              bgColor = "bg-zinc-600";
            }
            borderColor = bgColor.replace("bg-", "border-");
          }
        }}
      >
        <span className={`text-2xl font-bold ${textColor}`}>{char}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex gap-2 mb-1 uppercase"
      animate={shake ? { x: [-2, 2, -2, 2, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {tiles}
    </motion.div>
  );
};

export default Line;
