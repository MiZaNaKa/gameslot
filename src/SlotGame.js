// src/SlotGame.js
import React, { useState } from "react";
import { motion } from "framer-motion";

const symbols = ["🍒", "🍋", "🔔", "💎", "🍉"]; // Symbol array for the reels

const SlotGame = () => {
  const [reels, setReels] = useState(
    Array(5).fill(Array(3).fill(symbols[0])) // 5 reels with 3 rows each
  );
  const [paylines, setPaylines] = useState(1);
  const [betPerLine, setBetPerLine] = useState(1);
  const [balance, setBalance] = useState(100);
  const [winningLines, setWinningLines] = useState([]);

  // Spin Function
  const spinReels = () => {
    const newReels = reels.map(() =>
      Array(3)
        .fill(null)
        .map(() => symbols[Math.floor(Math.random() * symbols.length)])
    );
    setReels(newReels);
    calculateWinnings(newReels);
  };

  // Determine Winning Lines and Calculate Payout
  const calculateWinnings = (newReels) => {
    const newWinningLines = [];

    // Check each row for matching symbols across reels based on paylines
    for (let row = 0; row < 3; row++) {
      let isWinningLine = true;
      for (let reel = 1; reel < newReels.length; reel++) {
        if (newReels[reel][row] !== newReels[0][row]) {
          isWinningLine = false;
          break;
        }
      }
      if (isWinningLine) {
        newWinningLines.push(row);
      }
    }

    // Update balance based on winning lines and reset winning lines
    if (newWinningLines.length > 0) {
      const winnings = betPerLine * newWinningLines.length * 5;
      setBalance((prevBalance) => prevBalance + winnings);
      setWinningLines(newWinningLines);
    } else {
      setBalance((prevBalance) => prevBalance - betPerLine * paylines);
      setWinningLines([]);
    }
  };

  return (
    <div className="slot-game">
      <h1>Slot Machine Game (KHIN KHIN THANT)</h1>
      <p>Balance: ${balance}</p>

      {/* Bet and Payline Controls */}
      <div className="controls">
        <label>
          Bet per line:
          <input
            type="number"
            min="1"
            max="10"
            value={betPerLine}
            onChange={(e) => setBetPerLine(Number(e.target.value))}
          />
        </label>
        <label>
          Paylines:
          <input
            type="number"
            min="1"
            max="25"
            value={paylines}
            onChange={(e) => setPaylines(Number(e.target.value))}
          />
        </label>
        <button onClick={spinReels}>Spin</button>
      </div>

      {/* Reels Display with 3 Rows */}
      <div className="reels">
        {reels.map((reel, reelIndex) => (
          <div key={reelIndex} className="reel">
            {reel.map((symbol, rowIndex) => (
              <motion.div
                key={rowIndex}
                animate={{ y: [0, -100, 0] }} // Simple animation
                transition={{ duration: 1 }}
                className={
                  winningLines.includes(rowIndex) ? "win" : ""
                }
              >
                {symbol}
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Display Winning Lines */}
      {winningLines.length > 0 && <p>Winning Rows: {winningLines.join(", ")}</p>}
    </div>
  );
};

export default SlotGame;
