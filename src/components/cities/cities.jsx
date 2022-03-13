import './cities.scss';
import { useEffect } from 'react';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';
import City from '../city/city';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { API_STATUS } from '../../constants/constants';
import useGetCities from '../../hooks/useGetCities';

const Cities = () => {
  const {dispatch, state} = useCities();
  const getCities = useGetCities();
  const loadMore = () => {
    dispatch({
      type: ACTION_TYPES.LOAD_MORE,
    });
    getCities(state.nextPage);
  }
  useEffect(() => {
    getCities(state.nextPage);
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
            <button onClick={loadMore}>Load More</button>
            Or try searching by city, state or country to find what you are looking for
          </div>
          :
          <div>
            No more cities to display!
          </div>
        }
        {
          state.status === API_STATUS.ERROR && <div>There was an error loading cities.<button onClick={() => getCities(state.nextPage)}>Retry</button></div>
        }
      </div>
    </section>
  );
}

export default Cities;