import './cities.scss';
import { useEffect } from 'react';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';
import City from '../city/city';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import useGetCities from '../../hooks/useGetCities';
import ListItems from '../listItems/listItems';

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
    <section className='cities'>
      <ListItems
        loadingStatus={state.status}
        loadingComponent={<Skeleton className='cities__loading' count={10}/>}
        hasMore={state.nextPage}
        loadMore={loadMore}
        onRetry={loadMore}
        items={state.cities}
        >
          {city => <City key={city.geonameid} {...city} />}
      </ListItems>
    </section>
  );
}

export default Cities;