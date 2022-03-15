import './App.scss';
import React from 'react';
import Filters from './components/filters/filters';
import Cities from './components/cities/cities';
import { INITIAL_STATE, globalStateReducer } from './reducers/globalState';
import { globalStateContext } from './context/globalState';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [state, dispatch] = React.useReducer(globalStateReducer, INITIAL_STATE);
  return (
    <main className="challenge">
      <globalStateContext.Provider value={{state, dispatch}}>
        <ToastContainer/>
        <Filters/>
        <Cities/>
      </globalStateContext.Provider>
    </main>
  );
}

export default App;
