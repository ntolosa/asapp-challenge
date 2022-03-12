import { ACTION_TYPES } from "../constants/actionTypes"
import { API_STATUS, pageSize, serverUrl } from "../constants/constants";

export const INITIAL_STATE = {
  cities: [],
  preferences: [],
  filter: '',
  nextPage: `${serverUrl}/cities?limit=${pageSize}`,
  status: API_STATUS.LOADING,
};

export const citiesReducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_CITIES:
      return {
        ...state,
        cities: [...state.cities, ...action.payload.data.map(city=> ({
          ...city,
          selected: state.preferences.includes(city.geonameid),
        }))],
        nextPage: action.payload.links.next,
        status: API_STATUS.SUCCESS,
      }
    case ACTION_TYPES.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
        cities: [],
        status: API_STATUS.LOADING,
      }
    case ACTION_TYPES.CLEAR_PREFERENCES:
      return {
        ...state,
        preferences: [],
        cities: [...state.cities.map(city => ({
          ...city,
          selected: false,
        }))],
      }
    case ACTION_TYPES.ADD_PREFERENCE:
      return {
        ...state,
        preferences: [...state.preferences, action.payload],
        cities: [...state.cities.map(city => ({
          ...city,
          selected: city.geonameid === action.payload ? true : city.selected,
        }))],
      };
    case ACTION_TYPES.REMOVE_PREFERENCE:
      return {
        ...state,
        preferences: state.preferences.filter(preference => preference !== action.payload),
        cities: [...state.cities.map(city => ({
          ...city,
          selected: city.geonameid === action.payload ? false : city.selected,
        }))],
      };
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        status: API_STATUS.ERROR,
      }
    case ACTION_TYPES.LOAD_MORE:
      return {
        ...state,
        status: API_STATUS.LOADING,
      }
    default: {
      return state;
    }
  }
}
