import { ACTION_TYPES } from "../constants/actionTypes";
import { API_STATUS, VIEW_TYPE } from "../constants/constants";
import { useGlobalState } from "../context/globalState";
import { get } from "../helper/fetch";

const useGetCities = () => {
  const { dispatch, state } = useGlobalState();
  const getList = async (url, viewType) => {
    if (viewType === VIEW_TYPE.ALL) {
      return get(url);
    } else {
      // since preferred cities are stored in memory, this code simulates the server response
      return Promise.resolve({
        data: {
          data: state.preferences.filter(preference => preference.name.toLowerCase().trim().indexOf(state.filter.searchTerm) >= 0 ||
            preference.country.toLowerCase().trim().indexOf(state.filter.searchTerm) >= 0 ||
            preference.subcountry.toLowerCase().trim().indexOf(state.filter.searchTerm) >= 0),
          links: {},
        },
        status: API_STATUS.SUCCESS,
      });
    }
  }
  return async () => {
    const { status, data } = await getList(state.nextPage, state.filter.viewType);
    if (status === API_STATUS.SUCCESS) {
      dispatch({
        type: ACTION_TYPES.SET_CITIES,
        payload: data,
      });
    } else {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
      });
    }
  }
}

export default useGetCities;