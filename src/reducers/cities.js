import { ACTION_TYPES } from "../constants/actionTypes"

export const INITIAL_STATE = {
  cities: [],
  preferencies: [],
};

export const citiesReducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_CITIES:
      return {
        ...state,
        cities: action.payload.data,
      }
    default: {
      return state;
    }
  }
}
