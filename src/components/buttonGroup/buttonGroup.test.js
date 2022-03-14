import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import ButtonGroup from './buttonGroup';

describe('Unit: button group component', () => {
  test('should render button list', () => {
    // arrange
    const mockButtons = [{
      name: 'test1',
      selected: true,
    }, {
      name: 'test2',
      selected: false,
    }];
    const handler = jest.fn();
  
    // act
    render(<ButtonGroup buttons={mockButtons} handleClick={handler}></ButtonGroup>);
    const button1 = screen.getByRole('button', {
      name: 'test1',
    });
    const button2 = screen.getByRole('button', {
      name: 'test2',
    });
  
    // assert
    expect(button1).toBeInTheDocument();
    expect(button1).toBeDisabled();
    expect(button2).toBeInTheDocument();
    expect(button2).toBeEnabled();
    expect(handler).toHaveBeenCalledTimes(0);
  });
  
  test('should invoke handler when clicking on a button', () => {
    // arrange
    const mockButtons = [{
      name: 'test1',
      selected: false,
    }, {
      name: 'test2',
      selected: false,
    }];
    const handler = jest.fn();
    render(<ButtonGroup buttons={mockButtons} handleClick={handler}></ButtonGroup>);
    const button1 = screen.getByRole('button', {
      name: 'test1',
    });
  
    // act
    userEvents.click(button1);
  
    // assert
    expect(button1).toBeInTheDocument();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(mockButtons[0]);
  });
  
  test('should not invoke handler when button is disabled', () => {
    // arrange
    const mockButtons = [{
      name: 'test1',
      selected: true,
    }, {
      name: 'test2',
      selected: false,
    }];
    const handler = jest.fn();
    render(<ButtonGroup buttons={mockButtons} handleClick={handler}></ButtonGroup>);
    const button1 = screen.getByRole('button', {
      name: 'test1',
    });
  
    // act
    userEvents.click(button1);
  
    // assert
    expect(button1).toBeInTheDocument();
    expect(handler).toHaveBeenCalledTimes(0);
  });
});
