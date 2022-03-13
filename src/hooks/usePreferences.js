import { ACTION_TYPES } from "../constants/actionTypes";
import { API_STATUS } from "../constants/constants";
import { useCities } from "../context/cities";
import { patch } from "../helper/fetch";
import { serverUrl } from '../constants/constants';

const usePreferences = () => {
  const { dispatch, state } = useCities();
  const addPreference = async (id, selected) => {
    try {
      await patch(`${serverUrl}/preferences/cities`, JSON.stringify({[id]: selected}))
      dispatch({
        type: selected ? ACTION_TYPES.ADD_PREFERENCE : ACTION_TYPES.REMOVE_PREFERENCE,
        payload: id,
      });
    } catch(e) {
      console.error(e);
    }
  };

  const clearPreferences = async() => {
    const preferences = state.preferences.reduce((result, preference) => {
      result[preference] = false;
      return result;
    }, {});
    try {
      await patch(`${serverUrl}/preferences/cities`, JSON.stringify(preferences))
      dispatch({
        type: ACTION_TYPES.CLEAR_PREFERENCES,
      });
    } catch(e) {
      console.error(e);
    }
  }

  return {addPreference, clearPreferences};
}

export default usePreferences;