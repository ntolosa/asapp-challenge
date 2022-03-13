import './cities.scss';
import { useEffect, useState } from 'react';
import { useCities } from '../../context/cities';
import { ACTION_TYPES } from '../../constants/actionTypes';
import City from '../city/city';
import ListItems from '../listItems/listItems';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import useGetCities from '../../hooks/useGetCities';
import useInitialize from '../../hooks/useUnitialize';
import { VIEW_TYPE } from '../../constants/constants';

const Cities = () => {
  const {dispatch, state} = useCities();
  const [datasource, setDatasource] = useState(state.cities);
  const getCities = useGetCities();
  const initialize = useInitialize();
  const loadMore = () => {
    dispatch({
      type: ACTION_TYPES.LOAD_MORE,
    });
    getCities(datasource.nextPage);
  }
  useEffect(() => {
    initialize();
  }, []);
  useEffect(() => {
    setDatasource(state.filter.viewType === VIEW_TYPE.ALL ? state.cities : state.preferences);
  }, [state.cities, state.preferences, state.filter.viewType]);
  return (
    <section className='cities'>
      <ListItems
        loadingStatus={state.status}
        loadingComponent={<Skeleton className='cities__loading' count={10}/>}
        hasMore={datasource.nextPage}
        loadMore={loadMore}
        onRetry={loadMore}
        items={datasource.data}
        >
          {city => <City key={city.geonameid} {...city} />}
      </ListItems>
    </section>
  );
}

export default Cities;