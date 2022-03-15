import { render, screen, waitFor } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import React from 'react';
import Filters from './filters';
import * as usePreferences from '../../hooks/usePreferences';
import * as globalState from '../../context/globalState';
import { INITIAL_STATE } from '../../reducers/globalState';
import { ACTION_TYPES } from '../../constants/actionTypes';
import { pageSize, serverUrl } from '../../constants/constants';
jest.mock('../inputSearch/inputSearch', () => ({handleSearch}) => <input onClick={(event) => handleSearch(event.target.value)}/>);
jest.mock('../button/button', () => ({disabled, onClick}) => <button disabled={disabled} onClick={onClick}>Clear preferences</button>);
jest.mock('../buttonGroup/buttonGroup', () => ({buttons, handleClick}) => buttons.map ?
  buttons.map(button => <button onClick={handleClick} disabled={button.selected}>{button.name}</button>) : <div></div>);

describe('Unit: filters component', () => {
  test('should render filters', () => {
    // arrange
    const dispatch = jest.fn();
    const state = {
      ...INITIAL_STATE,
    };
    const preferencesMock = jest.fn();
    const useStateMock = jest.fn();
    jest.spyOn(React, 'useEffect').mockImplementation((fn) => fn());
    jest.spyOn(React, 'useState').mockImplementation(() => [{}, useStateMock]);
    jest.spyOn(usePreferences, 'default').mockImplementation(() => preferencesMock);
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
  
    // act
    render(<Filters />);
    const input = screen.getByRole('textbox');
  
    // assert
    expect(input).toBeInTheDocument();
    expect(React.useEffect).toHaveBeenCalledTimes(1);
    expect(React.useState).toHaveBeenCalledTimes(2);
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(usePreferences.default).toHaveBeenCalledTimes(1);
    expect(useStateMock).toHaveBeenCalledTimes(2);
    expect(preferencesMock).toHaveBeenCalledTimes(0);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  test('should filter cities when entering a search term', () => {
    // arrange
    const dispatch = jest.fn();
    const state = {
      ...INITIAL_STATE,
    };
    const exepctedAction = {
      type: ACTION_TYPES.SEARCH_CITIES,
      payload: {
        url: `${serverUrl}/cities?limit=${pageSize}&filter=`,
        searchTerm: '',
      },
    };
    const preferencesMock = jest.fn();
    const useStateMock = jest.fn();
    jest.spyOn(React, 'useEffect').mockImplementation((fn) => fn());
    jest.spyOn(React, 'useState').mockImplementation(() => [{}, useStateMock]);
    jest.spyOn(usePreferences, 'default').mockImplementation(() => preferencesMock);
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
  
    // act
    render(<Filters />);
    const input = screen.getByRole('textbox');
    userEvents.type(input, '{enter}');
  
    // assert
    expect(input).toBeInTheDocument();
    expect(React.useEffect).toHaveBeenCalledTimes(1);
    expect(React.useState).toHaveBeenCalledTimes(2);
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(usePreferences.default).toHaveBeenCalledTimes(1);
    expect(useStateMock).toHaveBeenCalledTimes(2);
    expect(preferencesMock).toHaveBeenCalledTimes(0);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(exepctedAction);
  });

  test('should clear preferences when clicking on clear preferences button', () => {
    // arrange
    const dispatch = jest.fn();
    const state = {
      ...INITIAL_STATE,
    };
    const preferencesMock = jest.fn();
    const useStateMock = jest.fn();
    jest.spyOn(React, 'useEffect').mockImplementation((fn) => fn());
    jest.spyOn(React, 'useState').mockImplementation(() => [false, useStateMock]);
    jest.spyOn(usePreferences, 'default').mockImplementation(() => ({
      clearPreferences: preferencesMock,
    }));
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
  
    // act
    render(<Filters />);
    const button = screen.getByRole('button', {
      name: 'Clear preferences',
    });
    userEvents.click(button);
  
    // assert
    expect(button).toBeInTheDocument();
    expect(React.useEffect).toHaveBeenCalledTimes(1);
    expect(React.useState).toHaveBeenCalledTimes(2);
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(usePreferences.default).toHaveBeenCalledTimes(1);
    expect(useStateMock).toHaveBeenCalledTimes(3);
    expect(preferencesMock).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(0);
  });
});