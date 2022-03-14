import { ACTION_TYPES } from "../constants/actionTypes";
import { useGlobalState } from "../context/globalState";
import { get, patch } from "../helper/fetch";
import { API_STATUS, serverUrl } from '../constants/constants';
import { toast } from "react-toastify";

const usePreferences = () => {
  const { dispatch, state } = useGlobalState();
  const addPreference = async (id, selected) => {
    // update preference on server
    const { status } = await patch(`${serverUrl}/preferences/cities`, JSON.stringify({[id]: selected}));
    if (status === API_STATUS.ERROR) {
      toast.error('Something went wrong. Please, try again');
      return;
    }
    if (selected) {
      const getCityUrl = `${serverUrl}/cities/${id}`;
      const result = await getCityWithRetry(getCityUrl);
      dispatch({
        type: selected ? ACTION_TYPES.ADD_PREFERENCE : ACTION_TYPES.REMOVE_PREFERENCE,
        payload: result.data,
      })
    } else {
      dispatch({
        type: selected ? ACTION_TYPES.ADD_PREFERENCE : ACTION_TYPES.REMOVE_PREFERENCE,
        payload: {
          geonameid: id,
        },
      });
    }
  };

  const getCityWithRetry = async (getCityUrl) => {
    let result = await get(getCityUrl);
    if (result.status === API_STATUS.ERROR) {
      result = await getCityWithRetry(getCityUrl);
    }
    return result;
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
    } else {
      toast.error('Something went wrong. Please, try again');
    }
  };

  return { addPreference, clearPreferences };
}

export default usePreferences;