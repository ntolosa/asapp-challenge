import { serverUrl } from '../constants/constants';
import { INITIAL_STATE } from '../reducers/cities';
import { get } from '../helper/fetch';
import { ACTION_TYPES } from '../constants/actionTypes';
import { useCities } from '../context/cities';

const useInitialize = () => {
  const { dispatch } = useCities();
  return async () => {
    const data = await initialize();
    dispatch({
      type: ACTION_TYPES.INITIALIZE_DATA,
      payload: data,
    });
  };
}

const initialize = async () => {
  const initialData = await getInitialData();
  // create an array of preferred cities in order to get city details
  const cityUrls = initialData[0].value.data.data.map(preference => `${serverUrl}/cities/${preference}`);

  // get city details
  const result = await resolvePromisesWithRetry(cityUrls, cityUrls.map(url=>get(url)));

  // return cities and preferred ones
  return {
    cities: initialData[1].value,
    preferences: result.map(preference => preference.value.data),
  };
};

const getInitialData = async () => {
  // gets data for preferences and cities (first page)
  const urls = [`${serverUrl}/preferences/cities`, INITIAL_STATE.cities.nextPage];
  const promises = urls.map(url=>get(url));
  return await resolvePromisesWithRetry(urls, promises);
};

const resolvePromisesWithRetry = async (urls, promises) => {
  // get result for all promises
  let resolved = await Promise.allSettled(promises);
  if (resolved.every(prom => prom.status === 'fulfilled' && prom.value.status === 'SUCCESS')) {
    // when all promises finish successfully it returns the data
    return resolved;
  }
  // create a new array of promises to retry the failed ones (for successful ones, it just return the data)
  const newPromises = resolved.map((result, index) => result.status === 'fulfilled' && result.value.status === 'SUCCESS' ? {status: 'SUCCESS', data: result.value.data} : get(urls[index]))
  return resolvePromisesWithRetry(urls, newPromises);
};

export default useInitialize;