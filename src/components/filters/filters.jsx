import './filters.scss';
import InputSearch from '../inputSearch/inputSearch';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';

const Filters = () => {
  const { dispatch } = useCities();
  const handleFilterCities = (filter) => {
    dispatch({
      type: ACTION_TYPES.SET_FILTER,
      payload: filter,
    });
  }
  return (<section>
    <div className='filters'>
      <InputSearch handleSearch={handleFilterCities}/>
      <div className='filter-buttons'>
        <button>Show all</button>
        <button>Show selected</button>
        <button className='filter-buttons__clear'>Clear selection</button>
      </div>
    </div>
  </section>);
}

export default Filters;
