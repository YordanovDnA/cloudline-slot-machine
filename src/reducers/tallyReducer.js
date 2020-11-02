import { ADD_TO_TRIES, ADD_TO_WINS, RESET_TALLY } from "../actions/types";

const tallyState = { wins: 0, tries: 0 };

export const listTally = (state = tallyState, action) => {
  switch (action.type) {
    case ADD_TO_WINS:
      return { ...state, wins: (state.wins += 1) };

    // TASK
    // Increase the number of tries by 1 with type ADD_TO_TRIES
    case ADD_TO_TRIES:
      return { ...state, tries: (state.tries += 1) };

    // TASK
    // Reset the state values back to 0 with type RESET_TALLY
    case RESET_TALLY:
      return {...state, wins: 0, tries: 0}

    default:
      return state;
  }
};
