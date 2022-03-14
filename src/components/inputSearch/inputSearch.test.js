import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import InputSearch from './inputSearch';

describe('Unit: input search component', () => {
  test('should render input search properly', () => {
    // act
    render(<InputSearch />);
    const input = screen.getByRole('textbox');
    const button = screen.queryByRole('button');
  
    // assert
    expect(input).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });
  
  test('should display clear button when searching', () => {
    // arrange
    render(<InputSearch />);
  
    // act
    const input = screen.getByRole('textbox');
    userEvents.type(input, "argentina");
    const button = screen.getByRole('button');
  
    // assert
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  
  test('should clear search when click on clear button', () => {
    // arrange
    const handler = jest.fn();
    render(<InputSearch handleSearch={handler} />);
    const input = screen.getByRole('textbox');
    userEvents.type(input, "argentina");
  
    // act
    const button = screen.getByRole('button');
    userEvents.click(button);
  
    // assert
    expect(input).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('');
  });
  
  test('should call search handler when hiting enter', () => {
    // arrange
    const handler = jest.fn();
    render(<InputSearch handleSearch={handler} />);
  
    // act
    const input = screen.getByRole('textbox');
    userEvents.type(input, "argentina{enter}");
    const button = screen.getByRole('button');
    // assert
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('argentina');
  });  
});
