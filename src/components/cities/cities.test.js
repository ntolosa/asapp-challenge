import { render, screen, waitFor } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import React from 'react';
import Cities from './cities';
import * as useCities from '../../hooks/useCities';
import * as useInitialize from '../../hooks/useInitialize';
import * as globalState from '../../context/globalState';
import { INITIAL_STATE } from '../../reducers/globalState';
import { ACTION_TYPES } from '../../constants/actionTypes';

jest.mock('../city/city', () => (city) => {
  return (
    <div>
      <div>City component</div>
      <div>{city.name}</div>
    </div>
  )
});

jest.mock('../listItems/listItems', () => ({children, items, loadMore}) => {
  return (
    <div>
      <button onClick={loadMore}>Load More</button>
      {
        items.map((item, index)=> {
          const f = children(item);
          return (
            <div key={index}>
              {f.type(f.props)}
            </div>
          );
        })
      }
    </div>
  );
});

describe('Unit: cities component', () => {
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
  test('should render cities', () => {
    // arrange
    const dispatch = jest.fn();
    const state = {
      ...INITIAL_STATE,
      cities: [...cities],
    };
    const initializeMock = jest.fn();
    const getCitiesMock = jest.fn();
    jest.spyOn(React, 'useEffect').mockImplementation((fn) => fn());
    jest.spyOn(useInitialize, 'default').mockImplementation(() => initializeMock);
    jest.spyOn(useCities, 'default').mockImplementation(() => getCitiesMock);
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
  
    // act
    render(<Cities />);
    const listItemMock = screen.getAllByText('City component');
    const city1 = screen.getByText('Cordoba');
    const city2 = screen.getByText('Mendoza');
  
    // assert
    expect(listItemMock.length).toEqual(2);
    expect(city1).toBeInTheDocument();
    expect(city2).toBeInTheDocument();
    expect(React.useEffect).toHaveBeenCalledTimes(2);
    expect(useInitialize.default).toHaveBeenCalledTimes(1);
    expect(useCities.default).toHaveBeenCalledTimes(1);
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(initializeMock).toHaveBeenCalledTimes(1);
    expect(getCitiesMock).toHaveBeenCalledTimes(0);
  });

  test('should load more cities when user clicks on load more button', () => {
    // arrange
    const dispatch = jest.fn();
    const state = {
      ...INITIAL_STATE,
      cities: [...cities],
    };
    const expectedAction = {
      type: ACTION_TYPES.LOAD_MORE,
    };
    const initializeMock = jest.fn();
    const getCitiesMock = jest.fn();
    jest.spyOn(React, 'useEffect').mockImplementation((fn) => fn());
    jest.spyOn(useInitialize, 'default').mockImplementation(() => initializeMock);
    jest.spyOn(useCities, 'default').mockImplementation(() => getCitiesMock);
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
  
    // act
    render(<Cities />);
    const listItemMock = screen.getAllByText('City component');
    const city1 = screen.getByText('Cordoba');
    const city2 = screen.getByText('Mendoza');
    const button = screen.getByRole('button');
    userEvents.click(button);
  
    // assert
    expect(listItemMock.length).toEqual(2);
    expect(city1).toBeInTheDocument();
    expect(city2).toBeInTheDocument();
    expect(React.useEffect).toHaveBeenCalledTimes(2);
    expect(useInitialize.default).toHaveBeenCalledTimes(1);
    expect(useCities.default).toHaveBeenCalledTimes(1);
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(initializeMock).toHaveBeenCalledTimes(1);
    expect(getCitiesMock).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
