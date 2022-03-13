import { ACTION_TYPES } from "../constants/actionTypes";
import { API_STATUS } from "../constants/constants";
import { useCities } from "../context/cities";
import { get } from "../helper/fetch";

const useGetCities = () => {
  const { dispatch } = useCities();
  return async (url) => {
    const { status, data } = await get(url);
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