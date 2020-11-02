import React from "react";
import { useSelector } from "react-redux";

// TASK
// Display the number of wins, i.e 'You've won x times'

function Wins() {
  const tally = useSelector(state => state.tally);
  return <div>Wins: {tally.wins}</div>;
}

export default Wins;
