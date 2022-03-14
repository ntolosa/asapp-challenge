import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import Button from './button';

describe('Unit: button component', () => {
  test('should render button properly', () => {
    // act
    render(<Button>Test</Button>);
    const button = screen.getByRole('button', { name: 'Test'});
  
    // assert
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });
  
  
  test('should be disabled when property disables button', () => {
    // act
    render(<Button disabled={true}>Test</Button>);
    const button = screen.getByRole('button');
  
    // assert
    expect(button).toBeDisabled();
  });
  
  test('should invoke handle when clicking on the button', () => {
    // arrange
    const handler = jest.fn();
    render(<Button disabled={false} onClick={handler}>Test</Button>);
    const button = screen.getByRole('button');
    
    // act
    userEvents.click(button);
  
    // assert
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
