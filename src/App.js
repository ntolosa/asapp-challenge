import './App.scss';
import { useReducer } from 'react';
import Filters from './components/filters/filters';
import Cities from './components/cities/cities';
import { INITIAL_STATE, globalStateReducer } from './reducers/globalState';
import { globalStateContext } from './context/globalState';

function App() {
  const [state, dispatch] = useReducer(globalStateReducer, INITIAL_STATE);
  return (
    <main className="challenge">
      <globalStateContext.Provider value={{state, dispatch}}>
        <Filters/>
        <Cities/>
      </globalStateContext.Provider>
    </main>
  );
}

export default App;
