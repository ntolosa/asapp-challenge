import './filters.scss';
import InputSearch from '../inputSearch/inputSearch';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';

const Filters = () => {
  const { dispatch, state } = useCities();
  const filterCities = async (filter) => {
    dispatch({
      type: ACTION_TYPES.SET_FILTER,
      payload: filter,
    });
    try {
      const response = await fetch(`http://localhost:3030/cities?limit=100&filter=${filter}`)
      const result = await response.json();
      dispatch({
        type: ACTION_TYPES.SET_CITIES,
        payload: result,
      });
    } catch(e) {
      console.error(e);
    }
  }
  const clearPreferences = async () => {
    const body = state.preferences.map((preference) => ({[preference]: false}));
    try {
      await fetch('http://localhost:3030/preferences/cities', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      dispatch({
        type: ACTION_TYPES.CLEAR_PREFERENCES,
      });
    } catch(e) {
      console.error(e);
    }
  }
  return (<section>
    <div className='filters'>
      <InputSearch handleSearch={filterCities}/>
      <div className='filter-buttons'>
        <button>Show all</button>
        <button>Show selected ({state.preferences.length})</button>
        <button className='filter-buttons__clear' onClick={clearPreferences}>Clear selection</button>
      </div>
    </div>
  </section>);
}

export default Filters;
