import { ACTION_TYPES } from "../constants/actionTypes";
import { API_STATUS, VIEW_TYPE } from "../constants/constants";
import { globalStateReducer, INITIAL_STATE } from "./globalState";

describe('Unit: global state reducer', () => {
  const cities = [{
    geonameid: '1',
    name: 'Cordoba',
    country: 'Argentina',
    subcountry: 'Cordoba',
  }, {
    geonameid: 2,
    name: 'Mendoza',
    country: 'Argentina',
    subcountry: 'Mendoza'
  }];
  const preferences = [{
    geonameid: 3,
    name: 'Orlando',
    country: 'United States',
    subcountry: 'Florida',
  }, {
    geonameid: 4,
    name: 'San Francisco',
    country: 'United States',
    subcountry: 'California',
  }];
  test('should update state whit initialization data', () => {
    // arrange
    const action = {
      type: ACTION_TYPES.INITIALIZE_DATA,
      payload: {
        cities: {
          data: {
            data: [...cities],
            links: {
              next: 'http://localhost/cities?offset=10&limit=10',
            },
          },
        },
        preferences: [],
      },
    };
    const expectedState = {
      ...INITIAL_STATE,
      cities: [...cities.map(city=>({...city, selected: false}))],
      preferences: [],
      nextPage: action.payload.cities.data.links.next,
      status: API_STATUS.SUCCESS,
    };

    // act
    const newSate = globalStateReducer(INITIAL_STATE, action);

    // assert
    expect(newSate).toEqual(expectedState);
  });

  test('should mark cities as selected when included in the preffered list and app is initialized', () => {
    // arrange
    const action = {
      type: ACTION_TYPES.INITIALIZE_DATA,
      payload: {
        cities: {
          data: {
            data: [...cities],
            links: {
              next: 'http://localhost/cities?offset=10&limit=10',
            },
          },
        },
        preferences: [...cities.filter(city=>city.geonameid === 1)],
      },
    };
    const expectedState = {
      ...INITIAL_STATE,
      cities: [...cities.map(city=>({...city, selected: false}))],
      preferences: [...cities.filter(city=>city.geonameid === 1)],
      nextPage: action.payload.cities.data.links.next,
      status: API_STATUS.SUCCESS,
    };

    // act
    const newSate = globalStateReducer(INITIAL_STATE, action);

    // assert
    expect(newSate).toEqual(expectedState);
  });

  test('should update state when action is set cities', () => {
    // arrange
    const state = {
      ...INITIAL_STATE,
      cities: [...cities],
      preferences: [...preferences],
      status: API_STATUS.LOADING,
    };
    const action = {
      type: ACTION_TYPES.SET_CITIES,
      payload: {
        data: [...preferences],
        links: {
          next: 'http:localhost/cities?limit=10&offset=10',
        }
      },
    };
    const expectedState = {
      ...state,
      cities: [...cities, ...preferences.map(city=>({...city, selected: true}))],
      status: API_STATUS.SUCCESS,
      nextPage: action.payload.links.next,
    };

    // act
    const newSate = globalStateReducer(state, action);

    // assert
    expect(newSate).toEqual(expectedState);
  });

  test('should update state when action is search cities', () => {
    // arrange
    const action = {
      type: ACTION_TYPES.SEARCH_CITIES,
      payload: {
        searchTerm: 'argentina',
        url: 'http://localhost/cities?filter=argentina&limit=10',
      },
    };
    const expectedState = {
      ...INITIAL_STATE,
      cities: [],
      status: API_STATUS.LOADING,
      nextPage: action.payload.url,
      filter: {
        ...INITIAL_STATE.filter,
        searchTerm: action.payload.searchTerm,
      },
    };

    // act
    const newSate = globalStateReducer(INITIAL_STATE, action);

    // assert
    expect(newSate).toEqual(expectedState);
  });

  test('should update state when action is select view type', () => {
    // arrange
    const action = {
      type: ACTION_TYPES.SELECT_VIEW_TYPE,
      payload: VIEW_TYPE.ALL,
    };
    const expectedState = {
      ...INITIAL_STATE,
      cities: [],
      status: API_STATUS.LOADING,
      filter: {
        ...INITIAL_STATE.filter,
        viewType: action.payload,
      },
    };

    // act
    const newSate = globalStateReducer(INITIAL_STATE, action);

    // assert
    expect(newSate).toEqual(expectedState);
  });

  test('should update state when action is clear preferences', () => {
    // arrange
    const state = {
      ...INITIAL_STATE,
      cities: [...preferences.map(city=>({...city, selected: true}))],
      preferences: [...preferences],
    };
    const action = {
      type: ACTION_TYPES.CLEAR_PREFERENCES,
    };
    const expectedState = {
      ...INITIAL_STATE,
      cities: [...preferences.map(city=>({...city, selected: false}))],
      preferences: [],
    };

    // act
    const newSate = globalStateReducer(state, action);

    // assert
    expect(newSate).toEqual(expectedState);
  });

  test('should update state when action is add preference', () => {
    // arrange
    const state = {
      ...INITIAL_STATE,
      cities: [...preferences.map(city=>({...city, selected: false}))],
      preferences: [],
    };
    const action = {
      type: ACTION_TYPES.ADD_PREFERENCE,
      payload: {
        ...preferences[0]
      }
    };
    const expectedState = {
      ...INITIAL_STATE,
      cities: [{
        ...preferences[0],
        selected: true,
      }, {
        ...preferences[1],
        selected: false,
      }],
      preferences: [{
        ...preferences[0],
        selected: true,
      }],
    };  

    // act
    const newSate = globalStateReducer(state, action);

    // assert
    expect(newSate).toEqual(expectedState);
  });

  test('should update state when action is remove preference', () => {
    // arrange
    const state = {
      ...INITIAL_STATE,
      cities: [...preferences.map(city=>({...city, selected: true}))],
      preferences: [...preferences.map(city=>({...city, selected: true}))],
    };
    const action = {
      type: ACTION_TYPES.REMOVE_PREFERENCE,
      payload: {
        geonameid: 4,
      }
    };
    const expectedState = {
      ...INITIAL_STATE,
      cities: [{
        ...preferences[0],
        selected: true,
      }, {
        ...preferences[1],
        selected: false,
      }],
      preferences: [{
        ...preferences[0],
        selected: true,
      }],
    };  

    // act
    const newSate = globalStateReducer(state, action);

    // assert
    expect(newSate).toEqual(expectedState);
  });

  test('should update state when action is set error', () => {
    // arrange
    const action = {
      type: ACTION_TYPES.SET_ERROR,
    };
    const expectedState = {
      ...INITIAL_STATE,
      status: API_STATUS.ERROR,
    };  

    // act
    const newSate = globalStateReducer(INITIAL_STATE, action);

    // assert
    expect(newSate).toEqual(expectedState);
  });

  test('should update state when action is load more', () => {
    // arrange
    const state = {
      ...INITIAL_STATE,
      status: API_STATUS.SUCCESS,
    }
    const action = {
      type: ACTION_TYPES.LOAD_MORE,
    };
    const expectedState = {
      ...INITIAL_STATE,
      status: API_STATUS.LOADING,
    };  

    // act
    const newSate = globalStateReducer(state, action);

    // assert
    expect(newSate).toEqual(expectedState);
  });
});
