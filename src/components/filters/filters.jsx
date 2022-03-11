import './filters.scss';
import InputSearch from '../inputSearch/inputSearch';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';

const Filters = () => {
  const { dispatch, state } = useCities();
  const filterCities = (filter) => {
    dispatch({
      type: ACTION_TYPES.SET_FILTER,
      payload: filter,
    });
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
        <button>Show selected</button>
        <button className='filter-buttons__clear' onClick={clearPreferences}>Clear selection</button>
      </div>
    </div>
  </section>);
}

export default Filters;
