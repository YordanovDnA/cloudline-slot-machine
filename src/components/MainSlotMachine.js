import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToWins, addToTries, resetTally } from "../actions/tallyActions";
import Tries from "./Tries";
import Wins from "./Wins";

const Parent = styled.div`
  height: 100%;
  width: 100%;
  background: #dcdcf3;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SubDiv = styled.div`
  height: 80%;
  width: 40%;
  margin: 20px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background: #e09e9e;
`;

const Header = styled.div`
  height: 60px;
  width: 100%;
  background: #cc6d6d;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: white;
`;

const Jackpot = styled.div`
  display: flex;
  justify-content: center;
  min-width: 100%;
  min-height: 150px;
  border: 1px solid;
  font-size: 26px;
  padding-top: 20px;
`;

const Slots = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
`;

const Slot = styled.div`
  height: 250px;
  width: 180px;
  margin: 10px;
  border: 2px solid black;
`;

const Spin = styled.button`
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  background: blue;
  color: white;
  user-select: none;
  :hover {
    cursor: pointer;
  }
`;

const Tally = styled.div`
  display: flex;
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
  const baseColors = ["#027333", "#F29F05", "#A60303"];

  // By default, the slot machine colors are all grey. You can change
  // this if you want.
  const [newColors, setColors] = useState(["#524D49", "#524D49", "#524D49"]);

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
    If we want to add/ remove slot(color) to out application, we just need to 
    add/remove color into the newColors array. This will automaticaly
    render one more slot in out app. */
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
    //Check the tally wins, and reset the tally if the user click 'ok'. 
    if(tally.tally.wins === 5){
      //Set timeout, so the React will have time to update the DOM before the
      //the confirm window pop up. 
      setTimeout(() => {
        const stop = window.confirm("Stop Gambling")
        if(stop) dispatch(resetTally())
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
      <Jackpot>{jackpot && "Wow, you hit the jackpot!"}</Jackpot>
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
