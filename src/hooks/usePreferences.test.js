import usePreferences from './usePreferences';
import * as globalState from '../context/globalState';
import * as fetchHelpers from '../helper/fetch';
import { API_STATUS, serverUrl } from '../constants/constants';
import { ACTION_TYPES } from '../constants/actionTypes';
import { toast } from 'react-toastify';

describe('Unit: usePreferences hook', () => {
  test('should clear preferences', async () => {
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
      preferences: [...cities],
    };
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
    jest.spyOn(fetchHelpers, 'patch').mockImplementation(() => Promise.resolve({status: API_STATUS.SUCCESS}));
    const toastMock = jest.fn();
    jest.spyOn(toast, 'error').mockImplementation(toastMock);
    const expectedAction = {
      type: ACTION_TYPES.CLEAR_PREFERENCES,
    }
    const patchBody = JSON.stringify({1:false, 2: false});

    // act
    const {clearPreferences} = usePreferences();
    await clearPreferences();

    // assert
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.patch).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.patch).toHaveBeenCalledWith(`${serverUrl}/preferences/cities`, patchBody);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
    expect(toast.error).toHaveBeenCalledTimes(0);
  });

  test('should display a toast when there is an error trying to clear preferences', async () => {
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
      preferences: [...cities],
    };
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
    jest.spyOn(fetchHelpers, 'patch').mockImplementation(() => Promise.resolve({status: API_STATUS.ERROR}));
    const toastMock = jest.fn();
    jest.spyOn(toast, 'error').mockImplementation(toastMock);
    const patchBody = JSON.stringify({1:false, 2: false});

    // act
    const {clearPreferences} = usePreferences();
    await clearPreferences();

    // assert
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.patch).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.patch).toHaveBeenCalledWith(`${serverUrl}/preferences/cities`, patchBody);
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(toastMock).toHaveBeenCalledTimes(1);
    expect(toastMock).toHaveBeenCalledWith('Something went wrong. Please, try again');
  });

  test('should remove a preference', async () => {
    // arrange
    const city = {
      geonameid: 2,
      name: 'Mendoza',
      country: 'Argentina',
      subcountry: 'Mendoza',
    };
    const dispatch = jest.fn();
    const state = {};
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
    jest.spyOn(fetchHelpers, 'patch').mockImplementation(() => Promise.resolve({status: API_STATUS.SUCCESS}));
    const toastMock = jest.fn();
    jest.spyOn(toast, 'error').mockImplementation(toastMock);
    const patchBody = JSON.stringify({2:false});
    const expectedAction = {
      type: ACTION_TYPES.REMOVE_PREFERENCE,
      payload: city,
    };

    // act
    const {addPreference} = usePreferences();
    await addPreference(city, false);

    // assert
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.patch).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.patch).toHaveBeenCalledWith(`${serverUrl}/preferences/cities`, patchBody);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
    expect(toastMock).toHaveBeenCalledTimes(0);
  });

  test('should display a toast when there is an error removing a preference', async () => {
    // arrange
    const dispatch = jest.fn();
    const state = {};
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
    jest.spyOn(fetchHelpers, 'patch').mockImplementation(() => Promise.resolve({status: API_STATUS.ERROR}));
    const toastMock = jest.fn();
    jest.spyOn(toast, 'error').mockImplementation(toastMock);
    const patchBody = JSON.stringify({1:false});

    // act
    const {addPreference} = usePreferences();
    await addPreference({
      geonameid: 1,
      name: 'Cordoba',
      country: 'Argentina',
      subcountry: 'Cordoba',
    }, false);

    // assert
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.patch).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.patch).toHaveBeenCalledWith(`${serverUrl}/preferences/cities`, patchBody);
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(toastMock).toHaveBeenCalledTimes(1);
    expect(toastMock).toHaveBeenCalledWith('Something went wrong. Please, try again');
  });

  test('should add a preference', async () => {
    // arrange
    const city = {
      geonameid: 1,
      name: 'Cordoba',
      country: 'Argentina',
      subcountry: 'Cordoba',
    };
    const dispatch = jest.fn();
    const state = {};
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
    jest.spyOn(fetchHelpers, 'patch').mockImplementation(() => Promise.resolve({status: API_STATUS.SUCCESS}));
    const toastMock = jest.fn();
    jest.spyOn(toast, 'error').mockImplementation(toastMock);
    const patchBody = JSON.stringify({1:true});
    const expectedAction = {
      type: ACTION_TYPES.ADD_PREFERENCE,
      payload: {
        ...city
      },
    };

    // act
    const {addPreference} = usePreferences();
    await addPreference(city, true);

    // assert
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.patch).toHaveBeenCalledTimes(1);
    expect(fetchHelpers.patch).toHaveBeenCalledWith(`${serverUrl}/preferences/cities`, patchBody);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
    expect(toastMock).toHaveBeenCalledTimes(0);
  });
});
