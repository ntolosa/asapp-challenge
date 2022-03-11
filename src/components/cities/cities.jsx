import './cities.scss';
import { useEffect } from 'react';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';
import City from '../city/city';

const Cities = () => {
  const {dispatch, state} = useCities();
  const getCities = async () => {
    //fetch cities
    const response = await fetch(state.nextPage)
    const data = await response.json();

    dispatch({
      type: ACTION_TYPES.SET_CITIES,
      payload: data,
    });
  }
  useEffect(() => {
    getCities();
  }, []);
  const loadMore = () => {
    getCities();
  };
  return (
    <section>
      <div className='cities'>
        {
          state.cities.map(city => (
            <City key={city.geonameid} {...city} />
          ))
        }
        <div>
          <button onClick={loadMore}>Load More</button>
          Or try searching by city, state or country to find waht you are looking for
        </div>
      </div>
    </section>
  );
}

export default Cities;