import { render, screen, waitFor } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import React from 'react';
import Cities from './cities';
import * as useCities from '../../hooks/useCities';
import * as useInitialize from '../../hooks/useInitialize';
import * as globalState from '../../context/globalState';
import { INITIAL_STATE } from '../../reducers/globalState';

jest.mock('../listItems/listItems', () => () => <div>List items component</div>);

describe('Unit: cities component', () => {
  test('should render cities', () => {
    // arrange
    const dispatch = jest.fn();
    const state = {
      ...INITIAL_STATE,
    };
    const initializeMock = jest.fn();
    const getCitiesMock = jest.fn();
    jest.spyOn(React, 'useEffect').mockImplementation((fn) => fn());
    jest.spyOn(useInitialize, 'default').mockImplementation(() => initializeMock);
    jest.spyOn(useCities, 'default').mockImplementation(() => getCitiesMock);
    jest.spyOn(globalState, 'useGlobalState').mockImplementation(() => ({state, dispatch}));
  
    // act
    render(<Cities />);
    const listItemMock = screen.getByText('List items component');
  
    // assert
    expect(listItemMock).toBeInTheDocument();
    expect(React.useEffect).toHaveBeenCalledTimes(2);
    expect(useInitialize.default).toHaveBeenCalledTimes(1);
    expect(useCities.default).toHaveBeenCalledTimes(1);
    expect(globalState.useGlobalState).toHaveBeenCalledTimes(1);
    expect(initializeMock).toHaveBeenCalledTimes(1);
    expect(getCitiesMock).toHaveBeenCalledTimes(0);
    
  });
});
