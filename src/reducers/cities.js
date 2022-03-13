import { ACTION_TYPES } from "../constants/actionTypes"
import { API_STATUS, pageSize, serverUrl, VIEW_TYPE } from "../constants/constants";

export const INITIAL_STATE = {
  cities: {
    data: [],
    nextPage: `${serverUrl}/cities?limit=${pageSize}`,
  },
  preferences: {
    data: [],
    nextPage: '',
  },
  filter: {
    searchTerm: '',
    viewType: VIEW_TYPE.ALL,
  },
  status: API_STATUS.LOADING,
};
const sortFunction = (({ name: nameA }, { name: nameB }) =>
  nameA.toLowerCase().localeCompare(nameB.toLowerCase())
);

export const citiesReducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.INITIALIZE_DATA:
      return {
        ...state,
        cities: {
          ...state.newCities,
          data: action.payload.cities.data.data.map(city=> ({
            ...city,
            selected: action.payload.preferences.find(preference => preference.geonameid === city.geonameid),
          })),
          nextPage: action.payload.cities.data.links.next,
        },
        preferences: {
          ...state.newPreferences,
          data: action.payload.preferences.map(preference => ({
            ...preference,
            selected: true,
          })).sort(sortFunction),
        },
        status: API_STATUS.SUCCESS,
      }
    case ACTION_TYPES.SET_CITIES:
      return {
        ...state,
        cities: {
          ...state.cities,
          data: [...state.cities.data, ...action.payload.data.map(city=> ({
            ...city,
            selected: state.preferences.data.find(preference => preference.geonameid === city.geonameid),
          }))],
          nextPage: action.payload.links.next,
        },
        status: API_STATUS.SUCCESS,
      }
    case ACTION_TYPES.SEARCH_CITIES:
      return {
        ...state,
        filter: {
          ...state.filter,
          searchTerm: action.payload,
        },
        nextPage: action.payload,
        cities: {
          ...state.cities,
          data: [],
          nextPage: action.payload,
        },
        status: API_STATUS.LOADING,
      }
    case ACTION_TYPES.SELECT_VIEW_TYPE:
      return {
        ...state,
        filter: {
          ...state.filter,
          viewType: action.payload,
        },
      }
    case ACTION_TYPES.CLEAR_PREFERENCES:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          data: [],
        },
        cities: {
          ...state.cities,
          data: [...state.cities.data.map(city => ({
            ...city,
            selected: false,
          }))]
        },
      }
    case ACTION_TYPES.ADD_PREFERENCE:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          data: [...state.preferences.data, {...action.payload.data, selected: true}],
        },
        cities: {
          ...state.cities,
          data: [...state.cities.data.map(city => ({
            ...city,
            selected: city.geonameid === action.payload.data.geonameid ? true : city.selected,
          }))].sort(sortFunction),
        },
      };
    case ACTION_TYPES.REMOVE_PREFERENCE:  
      return {
        ...state,
        preferences: {
          ...state.preferences,
          data: state.preferences.data.filter(preference => preference.geonameid !== action.payload),
        },
        cities: {
          ...state.cities,
          data: [...state.cities.data.map(city => ({
            ...city,
            selected: city.geonameid === action.payload ? false : city.selected,
          }))],
        }
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
