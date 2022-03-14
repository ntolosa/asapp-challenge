import './cities.scss';
import { useEffect } from 'react';
import { useGlobalState } from '../../context/globalState';
import { ACTION_TYPES } from '../../constants/actionTypes';
import City from '../city/city';
import ListItems from '../listItems/listItems';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import useGetCities from '../../hooks/useGetCities';
import useInitialize from '../../hooks/useUnitialize';

const Cities = () => {
  const {dispatch, state} = useGlobalState();
  const getCities = useGetCities();
  const initialize = useInitialize();
  const loadMore = () => {
    dispatch({
      type: ACTION_TYPES.LOAD_MORE,
    });
    getCities();
  }
  useEffect(() => {
    initialize();
  }, []);
  useEffect(() => {
    getCities();
  }, [state.filter]);
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