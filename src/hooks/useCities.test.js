import useCities from './useCities';
import * as globalState from '../context/globalState';
import * as fetchHelpers from '../helper/fetch';
import { API_STATUS, VIEW_TYPE } from '../constants/constants';
import { ACTION_TYPES } from '../constants/actionTypes';

describe('Unit: useCities hook', () => {
  test('should update cities list with preferred ones when getting cities and view type is SELECTED', async () => {
    // arrange
    const dispatch = jest.fn();
    const city = {
      geonameid: 1,
      name: 'Cordoba',
      country: 'Argentina',
      subcountry: 'Cordoba',
    };
    const state = {
      filter: {
        viewType: VIEW_TYPE.SELECTED,
        searchTerm: '',
      },
      preferences: [{...city}],
    };
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
    const expectedAction = {
      type: ACTION_TYPES.SET_CITIES,
      payload: {
        data: [{...city}],
        links: {},
      },
    }

    // act
    const getCities = useCities();
    await getCities();

    // assert
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  test('should update cities list with cities from server when getting cities and view type is ALL', async () => {
    // arrange
    const dispatch = jest.fn();
    const cities = [{
      geonameid: 1,
      name: 'Cordoba',
      country: 'Argentina',
      subcountry: 'Cordoba',
    }, {
      geonameid: 2,
      name: 'Mendoza',
      country: 'Argentina',
      subcountry: 'Mendoza',
    }];
    const state = {
      filter: {
        viewType: VIEW_TYPE.ALL,
        searchTerm: '',
      },
      nextPage: 'http://localhost/cities',
      preferences: [],
    };
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
    jest.spyOn(fetchHelpers, 'get').mockImplementation(() => Promise.resolve({
      status: API_STATUS.SUCCESS,
      data: [...cities],
    }));
    const expectedAction = {
      type: ACTION_TYPES.SET_CITIES,
      payload: [...cities],
    }

    // act
    const getCities = useCities();
    await getCities();

    // assert
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.get).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.get).toHaveBeenCalledWith(state.nextPage);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
