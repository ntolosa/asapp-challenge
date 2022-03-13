import './filters.scss';
import InputSearch from '../inputSearch/inputSearch';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';
import useGetCities from '../../hooks/useGetCities';
import {serverUrl, pageSize} from '../../constants/constants';
import usePreferences from '../../hooks/usePreferences';

const Filters = () => {
  const { dispatch, state } = useCities();
  const { clearPreferences } = usePreferences();
  const getCities = useGetCities();
  const filterCities = async (filter) => {
    const url = `${serverUrl}/cities?limit=${pageSize}&filter=${filter}`;
    dispatch({
      type: ACTION_TYPES.SET_FILTER,
      payload: url,
    });
    getCities(url);
  }
  return (<section>
    <div className='filters'>
      <InputSearch handleSearch={filterCities}/>
      <div className='filter-buttons'>
        <button>Show all</button>
        <button>Show selected ({state.preferences.data.length})</button>
        <button className='filter-buttons__clear' disabled={state.preferences.data.length === 0} onClick={clearPreferences}>Clear selection</button>
      </div>
    </div>
  </section>);
}

export default Filters;
