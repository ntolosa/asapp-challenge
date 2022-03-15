import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import * as toast from 'react-toastify';
jest.mock('./components/filters/filters', () => () => <div>Filters component</div>);
jest.mock('./components/cities/cities', () => () => <div>Cities component</div>);

describe('Unit: app component', () => {
  test('should render app component', () => {
    // arrange
    const dispatch = jest.fn();
    const toastMock = jest.fn().mockReturnValue(<div>Toast component</div>);
    jest.spyOn(React, 'useReducer').mockImplementation(() => [{}, dispatch]);
    jest.spyOn(toast, 'ToastContainer').mockImplementation(toastMock);

    // act
    render(<App />);
    const filters = screen.getByText('Filters component');
    const cities = screen.getByText('Cities component');
    const toastComp = screen.getByText('Toast component');

    // assert
    expect(filters).toBeInTheDocument();
    expect(cities).toBeInTheDocument();
    expect(toastComp).toBeInTheDocument();
    expect(React.useReducer).toHaveBeenCalledTimes(1);
    expect(toast.ToastContainer).toHaveBeenCalledTimes(1);
  });
});
