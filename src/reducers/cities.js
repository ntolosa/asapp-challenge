import { ACTION_TYPES } from "../constants/actionTypes"

export const INITIAL_STATE = {
  cities: [],
  preferencies: [],
  filter: '',
};

export const citiesReducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_CITIES:
      return {
        ...state,
        cities: action.payload.data,
      }
    case ACTION_TYPES.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      }
    default: {
      return state;
    }
  }
}