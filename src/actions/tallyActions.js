import { ADD_TO_WINS,ADD_TO_TRIES, RESET_TALLY } from "./types";

export const addToWins = () => dispatch => {
  dispatch({ type: ADD_TO_WINS, payload: null });
};

// TASK
// Create an action creator called addToTries, which dispatches
// a type of ADD_TO_TRIES (which should be exported from types.js)
// The payload can simply be null, as we're counting in the reducer.
export const addToTries = () => dispatch => {
  dispatch({type: ADD_TO_TRIES , payload: null});
}

// TASK
// Create an action creator called resetTally, which dispatches
// a type of RESET_TALLY.
// The payload can simply be null, as we're resetting values in the reducer.

export const resetTally = () => dispatch =>{
  dispatch({type: RESET_TALLY, payload: null})
}