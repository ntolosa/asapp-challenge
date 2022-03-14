import './App.scss';
import { useReducer } from 'react';
import Filters from './components/filters/filters';
import Cities from './components/cities/cities';
import { INITIAL_STATE, citiesReducer } from './reducers/state';
import { citiesContext } from './context/cities';

function App() {
  const [state, dispatch] = useReducer(citiesReducer, INITIAL_STATE);
  return (
    <main className="challenge">
      <citiesContext.Provider value={{state, dispatch}}>
        <Filters/>
        <Cities/>
      </citiesContext.Provider>
    </main>
  );
}

export default App;
