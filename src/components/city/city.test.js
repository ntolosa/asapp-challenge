import { render, screen, waitFor } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import React from 'react';
import City from './city';
import * as usePreferences from '../../hooks/usePreferences';

describe('Unit: city component', () => {
  test('should render city', () => {
    // arrange
    const city = {
      geonameid: 1,
      name: 'Cordoba',
      country: 'Argentina',
      subcountry: 'Cordoba',
      selected: false,
    };
    const setStateMock = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => [city.selected, setStateMock]);
    const addPreferenceMock = jest.fn();
    jest.spyOn(usePreferences, 'default').mockImplementation(() => ({
      addPreference: addPreferenceMock,
    }));
  
    // act
    render(<City {...city} />);
    const name = screen.getByText(city.name);
    const country = screen.getByText(`${city.subcountry} - ${city.country}`);
    const checkbox = screen.getByTestId('checkbox-1');
  
    // assert
    expect(name).toBeInTheDocument();
    expect(country).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(React.useState).toHaveBeenCalledTimes(1);
    expect(setStateMock).toHaveBeenCalledTimes(0);
    expect(usePreferences.default).toHaveBeenCalledTimes(1);
    expect(addPreferenceMock).toHaveBeenCalledTimes(0);
  });

  test('should set city as preference when clicking on checkbox', async () => {
    // arrange
    const city = {
      geonameid: 1,
      name: 'Cordoba',
      country: 'Argentina',
      subcountry: 'Cordoba',
      selected: false,
    };
    const setStateMock = jest.fn();
    jest.spyOn(React, 'useState').mockImplementation(() => [city.selected, setStateMock]);
    const addPreferenceMock = jest.fn();
    jest.spyOn(usePreferences, 'default').mockImplementation(() => ({
      addPreference: addPreferenceMock,
    }));
    render(<City {...city} />);
    const name = screen.getByText(city.name);
    const country = screen.getByText(`${city.subcountry} - ${city.country}`);
    const checkbox = screen.getByTestId('checkbox-1');

    // act
    userEvents.click(checkbox);
  
    // assert
    expect(name).toBeInTheDocument();
    expect(country).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(React.useState).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(setStateMock).toHaveBeenCalledTimes(2));
    expect(usePreferences.default).toHaveBeenCalledTimes(1);
    expect(addPreferenceMock).toHaveBeenCalledTimes(1);
    expect(addPreferenceMock).toHaveBeenCalledWith(1, true);
  });
});
