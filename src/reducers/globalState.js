import { ACTION_TYPES } from "../constants/actionTypes"
import { API_STATUS, pageSize, serverUrl, VIEW_TYPE } from "../constants/constants";

const initialUrl = `${serverUrl}/cities?limit=${pageSize}`;
export const INITIAL_STATE = {
  cities: [],
  preferences: [],
  filter: {
    searchTerm: '',
    viewType: VIEW_TYPE.ALL,
  },
  nextPage: initialUrl,
  status: API_STATUS.LOADING,
};
const sortFunction = (({ name: nameA }, { name: nameB }) =>
  nameA.toLowerCase().localeCompare(nameB.toLowerCase())
);

export const globalStateReducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.INITIALIZE_DATA:
      return {
        ...state,
        cities: action.payload.cities.data.data.map(city=> ({
          ...city,
          selected: action.payload.preferences.find(preference => preference.geonameid === city.geonameid),
        })),
        preferences: action.payload.preferences.map(preference => ({
          ...preference,
          selected: true,
        })).sort(sortFunction),
        nextPage: action.payload.cities.data.links.next,
        status: API_STATUS.SUCCESS,
      }
    case ACTION_TYPES.SET_CITIES:
      return {
        ...state,
        cities:  [...state.cities, ...action.payload.data.map(city=> ({
          ...city,
          selected: state.preferences.find(preference => preference.geonameid === city.geonameid),
        }))],
        nextPage: action.payload.links.next,
        status: API_STATUS.SUCCESS,
      }
    case ACTION_TYPES.SEARCH_CITIES:
      return {
        ...state,
        filter: {
          ...state.filter,
          searchTerm: action.payload.searchTerm,
        },
        cities: [],
        nextPage: action.payload.url,
        status: API_STATUS.LOADING,
      }
    case ACTION_TYPES.SELECT_VIEW_TYPE:
      return {
        ...state,
        filter: {
          ...state.filter,
          viewType: action.payload,
        },
        cities: [],
        nextPage: state.filter.searchTerm ? `${initialUrl}&filter=${state.filter.searchTerm}` : initialUrl,
        status: API_STATUS.LOADING,
      }
    case ACTION_TYPES.CLEAR_PREFERENCES:
      return {
        ...state,
        preferences: [],
        cities: state.filter.viewType === VIEW_TYPE.ALL ? [...state.cities.map(city => ({
          ...city,
          selected: false,
        }))] : [],
      }
    case ACTION_TYPES.ADD_PREFERENCE:
      return {
        ...state,
        preferences: [...state.preferences, {...action.payload.data, selected: true}],
        cities: [...state.cities.map(city => ({
          ...city,
          selected: city.geonameid === action.payload.data.geonameid ? true : city.selected,
        }))].sort(sortFunction),
      };
    case ACTION_TYPES.REMOVE_PREFERENCE:  
      return {
        ...state,
        preferences: state.preferences.filter(preference => preference.geonameid !== action.payload),
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
};
