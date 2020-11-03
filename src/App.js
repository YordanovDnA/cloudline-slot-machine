import styled from "styled-components";
import MainSlotMachine from "./components/MainSlotMachine";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";

const Main = styled.div`
  height: 100vh;
  width: 100vw;
  background: #0D0D0D;
  padding: 30px;
  @media (max-width: 992px) {
    padding:0;
  }
`;

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

export const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(reduxThunk))
);

function App() {
  return (
    <Provider store={store} className="App">
      <Main className="App">
        <MainSlotMachine />
      </Main>
    </Provider>
  );
}

export default App;
