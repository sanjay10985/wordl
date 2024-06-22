const Stats = ({ guesses, won }) => (
  <div className="text-center mt-4">
    <h2 className="text-2xl font-bold mb-2">
      {won ? "Congratulations!" : "Game Over"}
    </h2>
    <p>
      You {won ? "guessed" : "didn't guess"} the word in {guesses}{" "}
      {guesses === 1 ? "try" : "tries"}.
    </p>
  </div>
);

export default Stats;
