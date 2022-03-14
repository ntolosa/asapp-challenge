import { ACTION_TYPES } from "../constants/actionTypes";
import { useGlobalState } from "../context/globalState";
import { get, patch } from "../helper/fetch";
import { API_STATUS, serverUrl } from '../constants/constants';

const usePreferences = () => {
  const { dispatch, state } = useGlobalState();
  const addPreference = async (id, selected) => {
    const addPreferenceUrl = `${serverUrl}/preferences/cities`;
    const body = JSON.stringify({[id]: selected});
    const getCityUrl = `${serverUrl}/cities/${id}`;
    const promises = [
      patch(addPreferenceUrl, body),
      get(getCityUrl),
    ];

    const result = await addPreferenceWithRetry(addPreferenceUrl, body, getCityUrl, promises);

    dispatch({
      type: selected ? ACTION_TYPES.ADD_PREFERENCE : ACTION_TYPES.REMOVE_PREFERENCE,
      payload: result[1].value,
    });
  };

  const clearPreferences = async() => {
    const preferences = state.preferences.reduce((result, preference) => {
      result[preference.geonameid] = false;
      return result;
    }, {});
    const { status } = await patch(`${serverUrl}/preferences/cities`, JSON.stringify(preferences));
      if (status === API_STATUS.SUCCESS) {
        dispatch({
          type: ACTION_TYPES.CLEAR_PREFERENCES,
        });
      }
      return status;
  };

  return { addPreference, clearPreferences };
}

const addPreferenceWithRetry = async (addPreferenceUrl, body, getCityUrl, promises) => {
  let resolved = await Promise.allSettled(promises);
  if (resolved.every(prom => prom.status === 'fulfilled' && prom.value.status === 'SUCCESS')) {
    // when all promises finish successfully it returns the data
    return resolved;
  }
  // create a new array of promises to retry the failed ones (for successful ones, it just return the data)
  const newPromises = [
    patch(addPreferenceUrl, body),
    get(getCityUrl),
  ];
  return addPreferenceWithRetry(addPreferenceUrl, body, getCityUrl, newPromises);
};

export default usePreferences;