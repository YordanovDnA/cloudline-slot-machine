import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Stats = styled.div`
  color: #FEFFFF;
`;
const Score = styled.span`
  color: #F20530;
`;

// TASK
// Display the number of tries, i.e 'You've tried x times'

function Tries() {
  const tally = useSelector(state => state.tally);
return <Stats>Tries: <Score>{tally.tries}</Score></Stats>;
}

export default Tries;
