import './cities.scss';
import React from 'react';
import { useGlobalState } from '../../context/globalState';
import { ACTION_TYPES } from '../../constants/actionTypes';
import City from '../city/city';
import ListItems from '../listItems/listItems';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import useCities from '../../hooks/useCities';
import useInitialize from '../../hooks/useInitialize';

const Cities = () => {
  const {dispatch, state} = useGlobalState();
  const getCities = useCities();
  const initialize = useInitialize();
  const loadMore = () => {
    dispatch({
      type: ACTION_TYPES.LOAD_MORE,
    });
    getCities();
  }
  React.useEffect(() => {
    initialize();
  }, []);
  React.useEffect(() => {
    if (state.isInitialized) {
      getCities();
    }
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
          {(city, index) => <City key={city.geonameid} {...city} index={index} />}
      </ListItems>
    </section>
  );
}

export default Cities;