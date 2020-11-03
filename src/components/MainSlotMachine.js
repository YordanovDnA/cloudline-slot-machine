import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToWins, addToTries, resetTally } from "../actions/tallyActions";
import Tries from "./Tries";
import Wins from "./Wins";

const Parent = styled.div`
  
  width: 100%;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 50% 50%;
  @media (max-width: 992px) {
  }
  
`;

const SubDiv = styled.div`
  margin: 1em;
  background: #3C038C;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 0 11px #0DF205;

  @media (max-width: 992px) {
    grid-column-start: 1;
    grid-column-end: 3;
    max-width: 95%;
  }

`;

const Header = styled.div`
  height: 60px;
  width: 100%;
  padding-top: 0.2em;
  margin-bottom: 0.2em;
  text-align: center;
  font-size: 26px;
  color: #FEFFFF;
  border-bottom: 1px solid black;
`;

const Jackpot = styled.div`
  min-width: 100%;
  min-height: 150px;
  border-bottom: 1px solid;
  text-align: center;
  text-shadow: 5px 3px  2px black;
  font-size: 2.8em;
  color: #0DF205;
  padding-top: 20px;
  @media (max-width: 768px) {
    font-size: 1.7em;
    min-height: 100px;
  }
`;

const Slots = styled.div`
  width: 100%;
  margin-top: 0.8em;
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 1em;
  > * {
    border-right: 2px solid;
  }
  & :first-child {
    border-radius: 30px 0 0 30px;
  }
  & :last-child {
    border-radius: 0 30px 30px 0;
  }
`;

const Slot = styled.div`
  height: 13em;
  width: 100%;
`;

const Spin = styled.a`
  display: block;
  width: 60%;
  padding: 15px 50px;
  margin-top: 2em;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  text-shadow: 1px 1px 2px #FEFFFF;
  color: #0D0D0D;
  background-color: #3DBFF2;
  border: 1px solid #0DF205;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #0DF205;
  user-select: none;
  :hover {
    cursor: pointer;
  }
  :active {
    box-shadow: 1px 1px 5px #0DF205;
  }
  @media (max-width: 768px) {
    font-size: 1.5em;
    margin-top: 1em;
  }
`;

const Tally = styled.div`
  display: flex;
  padding: 5px;
  justify-content: space-around;
  width: 100%;
  font-size: 20px;
`;

const MainSlotMachine = () => {
  // The dispatch function for dispatching actions when we
  // call our action creators.
  const dispatch = useDispatch();

  // Getting our main tally data from redux state.
  const tally = useSelector(state => state);

  // A few random base colors. To worsen the odds of winning,
  // you can add more colors.
  /*Adding or removing a color will not affect the application.
  Give it a try. */
  const baseColors = ["#027333", "#F29F05", "#A60303"];

  // By default, the slot machine colors are all grey. You can change
  // this if you want.
  /*Adding or removin color in the defaultColors array will add / remove a slot. 
  Try to remove the last color and refresh the page to see the difference. */
  const defaultColors = ["#524D49", "#524D49", "#524D49"];
  const [newColors, setColors] = useState([...defaultColors]);
  

  //By default jackpot is false. When colors match it's change to true and 
  //"Wow, you hit the jackpot!" appear on the screen."
  const [jackpot, setJackpot] = useState(false);

  // TASK
  // Here is the main spin function which should be called
  // every time we press the Spin button. This function should:

  // 1. Add to our tally tries in the redux state. (i.e dispatch(addToTries()))

  // 2. Randomly select a color 3 times from our base colors, and
  // set them in our local state above, newColors.

  // 3. If all the colors are the same, we add to our tally wins.
  const spin = () => {
    //Clear the jackpot screen every time when spin is clicked 
    setJackpot(false)

    //Store the random selected color indexes
    const selectedIndexes = [];

    //All the random selected colors will be pushed to this array.
    const selectedColors = [];

    /* Select random color indexes based on the length of the baseColors 
    array (slots rendered in our app).
    If we want to add/ remove slot(color) to our application, we just need to 
    add/remove color into the baseColors array. This will automaticaly
    render one more slot in out app. However we still need to refactor the css */
    for(let i = 0; i < newColors.length; i++){
      selectedIndexes.push(Math.round(Math.random() * (baseColors.length - 1)))
      selectedColors.push(baseColors[selectedIndexes[i]]);
    }

    setColors(
      selectedColors
    )

    //Function to check all indexes equal each other. Returns true or false
    const check = (index) =>{
      return selectedIndexes[0] === index;
    }

    //Check for jackpot by using the above check function
    const jackpot = selectedIndexes.every(check)
    
    //If the jackpot is true and add to tally win
    if(jackpot) {
      setJackpot(true)
      dispatch(addToWins())
    }
    else dispatch(addToTries())
  }

  // TASK
  // In this lifecycle function, of the tally wins reaches 5,
  // have a window.confirm message come up telling the user to 'Stop Gambling!'.
  // on 5 wins the spin button should also become disabled.
  // On selecting 'ok', the tally wins and tries are reset.
  useEffect(() => {
    //Check the tally wins, and reset the tally,if tally reach 5, and if the user click 'ok'. 
    if(tally.tally.wins === 5){
      //Set timeout, so the React will have time to update the DOM before the
      //the confirm window pop up. 
      setTimeout(() => {
        const stop = window.confirm("Stop Gambling")
        if(stop) dispatch(resetTally())
        setColors(defaultColors)
      }, 100);
    }
  },);

  // TASK
  // Within the Slots div, create 3 slots. (Create a styled component called 'Slot'
  // and render it out 3 times). Their background colors should be those stored
  // in the newColors array. (Use inline styling)

  return (
    <Parent>
      
      <SubDiv>
        <Jackpot >{jackpot ? "Wow, you hit the jackpot!" : "Good Luck!"}</Jackpot>
        <Slots>{newColors.map((color,index)=>{
          return <Slot key={index} style={{backgroundColor: color}}></Slot>
        })}</Slots>
        <Spin disabled={tally.tally.wins === 5} onClick={()=>spin()}>Spin!</Spin>
      </SubDiv>
      <SubDiv>
        <Header>Tally</Header>
        <Tally>
          <Tries />
          <Wins />
        </Tally>
      </SubDiv>
    </Parent>
  );
};

export default MainSlotMachine;
