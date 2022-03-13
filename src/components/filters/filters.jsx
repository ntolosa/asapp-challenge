import './filters.scss';
import InputSearch from '../inputSearch/inputSearch';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';
import useGetCities from '../../hooks/useGetCities';
import {serverUrl, pageSize, VIEW_TYPE} from '../../constants/constants';
import usePreferences from '../../hooks/usePreferences';

const Filters = () => {
  const { dispatch, state } = useCities();
  const { clearPreferences } = usePreferences();
  const getCities = useGetCities();
  const filterCities = async (filter) => {
    const url = `${serverUrl}/cities?limit=${pageSize}&filter=${filter}`;
    dispatch({
      type: ACTION_TYPES.SEARCH_CITIES,
      payload: url,
    });
    getCities(url);
  }
  const selectViewType = (viewType) => {
    return () => {
      dispatch({
        type: ACTION_TYPES.SELECT_VIEW_TYPE,
        payload: viewType,
      });
    };
  }
  return (
    <section>
      <div className='filters'>
        <InputSearch handleSearch={filterCities}/>
        <div className='filter-buttons'>
          <button onClick={selectViewType(VIEW_TYPE.ALL)}>Show all</button>
          <button onClick={selectViewType(VIEW_TYPE.SELECTED)}>Show selected ({state.preferences.data.length})</button>
          <button className='filter-buttons__clear' disabled={state.preferences.data.length === 0} onClick={clearPreferences}>Clear selection</button>
        </div>
      </div>
    </section>
  );
}

export default Filters;
