import './filters.scss';
import InputSearch from '../inputSearch/inputSearch';
import { useGlobalState } from '../../context/globalState';
import { ACTION_TYPES } from '../../constants/actionTypes';
import {serverUrl, pageSize, VIEW_TYPE} from '../../constants/constants';
import usePreferences from '../../hooks/usePreferences';
import { useEffect, useState } from 'react';
import ButtonGroup from '../buttonGroup/buttonGroup';

const Filters = () => {
  const { dispatch, state } = useGlobalState();
  const { clearPreferences } = usePreferences();
  const [disableClearPreferences, setDisableClearPreferences] = useState(true);
  const [viewTypeButtons, setViewTypeButtons] = useState([]);
  const filterCities = async (filter) => {
    const url = `${serverUrl}/cities?limit=${pageSize}&filter=${filter}`;
    dispatch({
      type: ACTION_TYPES.SEARCH_CITIES,
      payload: {
        url,
        searchTerm: filter,
      },
    });
  }
  const handleViewClicked = (button) => {
    dispatch({
      type: ACTION_TYPES.SELECT_VIEW_TYPE,
      payload: button.viewType,
    })
  }
  const onClearPreferences = () => {
    setDisableClearPreferences(true);
    clearPreferences();
  }
  useEffect(()=> {
    setDisableClearPreferences(state.preferences.length === 0);
    setViewTypeButtons([
      {
        name: 'Show All',
        viewType: VIEW_TYPE.ALL,
        selected: state.filter.viewType === VIEW_TYPE.ALL,
      },
      {
        name: `Show Selected (${state.preferences.length})`,
        viewType: VIEW_TYPE.SELECTED,
        selected: state.filter.viewType === VIEW_TYPE.SELECTED,
      },
    ])
  }, [state.preferences.length, state.filter.viewType]);
  return (
    <section>
      <div className='filters'>
        <InputSearch handleSearch={filterCities}/>
        <div className='filter-buttons'>
          <ButtonGroup buttons={viewTypeButtons} handleClick={handleViewClicked}/>
          <button className='filter-buttons__clear' disabled={disableClearPreferences} onClick={onClearPreferences}>Clear selection</button>
        </div>
      </div>
    </section>
  );
}

export default Filters;
