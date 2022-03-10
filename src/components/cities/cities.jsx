import './cities.scss';
import { useEffect } from 'react';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';
import City from '../city/city';

const Cities = () => {
  const {dispatch, state} = useCities();
  useEffect(() => {
    async function getCities() {
      //fetch cities
      const response = await fetch('http://localhost:3030/cities?limit=100')
      const data = await response.json();

      dispatch({
        type: ACTION_TYPES.SET_CITIES,
        payload: data,
      });
    }
    getCities();
  }, [])
  return (
    <section>
      <div className='cities'>
        {
          state.cities.map(city => (
            <City key={city.geonameid} {...city} />
          ))
        }
      </div>
    </section>
  );
}

export default Cities;