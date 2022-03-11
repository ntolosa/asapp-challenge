import { ACTION_TYPES } from "../constants/actionTypes"

export const INITIAL_STATE = {
  cities: [],
  preferences: [],
  filter: '',
  nextPage: 'http://localhost:3030/cities?limit=100',
};

export const citiesReducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_CITIES:
      return {
        ...state,
        cities: [...state.cities, ...action.payload.data],
        nextPage: action.payload.links.next,
      }
    case ACTION_TYPES.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      }
    case ACTION_TYPES.CLEAR_PREFERENCES:
      return {
        ...state,
        preferences: [],
      }
    case ACTION_TYPES.ADD_PREFERENCE:
      return {
        ...state,
        preferences: [...state.preferences, action.payload],
      };
    case ACTION_TYPES.REMOVE_PREFERENCE:
      return {
        ...state,
        preferences: state.preferences.filter(preference => preference !== action.payload),
      };
    default: {
      return state;
    }
  }
}
