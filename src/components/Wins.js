import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Stats = styled.div`
  color: #FEFFFF;
`;
const Score = styled.span`
  color: #0DF205;
`;

// TASK
// Display the number of wins, i.e 'You've won x times'

function Wins() {
  const tally = useSelector(state => state.tally);
  return <Stats>Wins: <Score>
    {tally.wins}
  </Score></Stats>;
}

export default Wins;
