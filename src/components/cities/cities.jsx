import './cities.scss';
import { useEffect } from 'react';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';
import City from '../city/city';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Cities = () => {
  const {dispatch, state} = useCities();
  const getCities = async () => {
    const response = await fetch(state.nextPage);
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
          state.loading ? <Skeleton count={10} /> : 
          state.cities.map(city => (
            <City key={city.geonameid} {...city} />
          ))
        }
        {
          state.nextPage ?
          <div>
            <button onClick={loadMore}>Load More</button>
            Or try searching by city, state or country to find what you are looking for
          </div>
          :
          <div>
            No more cities to display!
          </div>
        }
      </div>
    </section>
  );
}

export default Cities;