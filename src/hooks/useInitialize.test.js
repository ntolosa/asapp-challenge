import useInitialize from './useInitialize';
import * as globalState from '../context/globalState';
import * as fetchHelpers from '../helper/fetch';
import { API_STATUS, serverUrl } from '../constants/constants';
import { ACTION_TYPES } from '../constants/actionTypes';
import { INITIAL_STATE } from '../reducers/globalState';

describe('Unit: useInitialize hook', () => {
  test('should initialize app', async () => {
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
    const preferredCity = {
      geonameid: 3,
      name: 'Orlando',
      country: 'United States',
      subcountry: 'Florida',
    };
    const getResponses = {
      [`${serverUrl}/preferences/cities`]: [3],
      [INITIAL_STATE.nextPage]: [...cities],
      [`${serverUrl}/cities/3`]: {...preferredCity},
    };
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({dispatch}));
    jest.spyOn(fetchHelpers, 'get').mockImplementation((url) => Promise.resolve({status: API_STATUS.SUCCESS, data: {data: getResponses[url]}}));
    const expectedAction = {
      type: ACTION_TYPES.INITIALIZE_DATA,
      payload: {
        cities: {
          data: {data: [...cities]},
          status: API_STATUS.SUCCESS,
        },
        preferences: [{data: {...preferredCity}}],
      },
    };

    // act
    const initialize = useInitialize();
    await initialize();

    // assert
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.get).toHaveBeenCalledTimes(3);
    expect(fetchHelpers.get.mock.calls[0]).toEqual([`${serverUrl}/preferences/cities`]);
    expect(fetchHelpers.get.mock.calls[1]).toEqual([INITIAL_STATE.nextPage]);
    expect(fetchHelpers.get.mock.calls[2]).toEqual([`${serverUrl}/cities/3`]);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
