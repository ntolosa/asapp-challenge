import './cities.scss';
import { useEffect } from 'react';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';
import City from '../city/city';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { API_STATUS } from '../../constants/constants';

const Cities = () => {
  const {dispatch, state} = useCities();
  const getCities = async () => {
    dispatch({
      type: ACTION_TYPES.LOAD_MORE,
    })
    try {
      const response = await fetch(state.nextPage);
      if (!response.ok) {
        throw new Error(response.status)
      }
      const data = await response.json();
  
      dispatch({
        type: ACTION_TYPES.SET_CITIES,
        payload: data,
      });
    } catch(e) {
      console.error(e);
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
      });
    }
    
  }
  useEffect(() => {
    getCities();
  }, []);
  return (
    <section>
      <div className='cities'>
        {
          state.cities.map(city => (
            <City key={city.geonameid} {...city} />
          ))
        }
        {
          state.status === API_STATUS.LOADING && <Skeleton count={10} />
        }
        {
          state.nextPage && state.status !== API_STATUS.ERROR ?
          <div>
            <button onClick={getCities}>Load More</button>
            Or try searching by city, state or country to find what you are looking for
          </div>
          :
          <div>
            No more cities to display!
          </div>
        }
        {
          state.status === API_STATUS.ERROR && <div>There was an error loading cities.<button onClick={getCities}>Retry</button></div>
        }
      </div>
    </section>
  );
}

export default Cities;