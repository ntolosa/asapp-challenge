import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import ListItems from './listItems';
import { API_STATUS } from '../../constants/constants';

test('should render list items properly', () => {
  // arrange
  const mockItems = [{
    name: 'test1',
  }, {
    name: 'test2',
  }]
  const children = jest.fn().mockReturnValue();

  // act
  render(<ListItems 
    loadingStatus={API_STATUS.SUCCESS}
    hasMore={false}
    items={mockItems}>{children}</ListItems>);
  
  const noMoreItemsText = screen.getByText('No more items to display!');
  const loadMoreButton = screen.queryByRole('button', {
    name: 'Load More',
  });
  const retryButton = screen.queryByRole('button', {
    name: 'Retry',
  });

  // assert
  expect(children).toHaveBeenCalledTimes(2);
  expect(children.mock.calls[0]).toEqual([mockItems[0], 0]);
  expect(children.mock.calls[1]).toEqual([mockItems[1], 1]);
  expect(noMoreItemsText).toBeInTheDocument();
  expect(loadMoreButton).not.toBeInTheDocument();
  expect(retryButton).not.toBeInTheDocument();
});

test('should load more items when asking for get more', () => {
  // arrange
  const mockItems = [{
    name: 'test1',
  }, {
    name: 'test2',
  }]
  const children = jest.fn().mockReturnValue();
  const loadMoreHandler = jest.fn();
  render(<ListItems 
    loadingStatus={API_STATUS.SUCCESS}
    loadMore={loadMoreHandler}
    hasMore={true}
    items={mockItems}>{children}</ListItems>);
  
  const noMoreItemsText = screen.queryByText('No more items to display!');
  const loadMoreButton = screen.getByRole('button', {
    name: 'Load More',
  });
  const retryButton = screen.queryByRole('button', {
    name: 'Retry',
  });
  // act
  userEvents.click(loadMoreButton);

  // assert
  expect(children).toHaveBeenCalledTimes(2);
  expect(children.mock.calls[0]).toEqual([mockItems[0], 0]);
  expect(children.mock.calls[1]).toEqual([mockItems[1], 1]);
  expect(noMoreItemsText).not.toBeInTheDocument();
  expect(retryButton).not.toBeInTheDocument();
  expect(loadMoreButton).toBeInTheDocument();
  expect(loadMoreHandler).toHaveBeenCalledTimes(1);
});

test('should retry when there was an error and users wants to retry', () => {
  // arrange
  const mockItems = [{
    name: 'test1',
  }, {
    name: 'test2',
  }]
  const children = jest.fn().mockReturnValue();
  const retryHandler = jest.fn();
  render(<ListItems 
    loadingStatus={API_STATUS.ERROR}
    onRetry={retryHandler}
    hasMore={true}
    items={mockItems}>{children}</ListItems>);
  
  const noMoreItemsText = screen.queryByText('No more items to display!');
  const loadMoreButton = screen.queryByRole('button', {
    name: 'Load More',
  });
  const retryButton = screen.getByRole('button', {
    name: 'Retry',
  });
  // act
  userEvents.click(retryButton);

  // assert
  expect(children).toHaveBeenCalledTimes(2);
  expect(children.mock.calls[0]).toEqual([mockItems[0], 0]);
  expect(children.mock.calls[1]).toEqual([mockItems[1], 1]);
  expect(noMoreItemsText).not.toBeInTheDocument();
  expect(retryButton).toBeInTheDocument();
  expect(loadMoreButton).not.toBeInTheDocument();
  expect(retryHandler).toHaveBeenCalledTimes(1);
});

test('should display loading when data is not ready yet', () => {
  // arrange
  const mockItems = [{
    name: 'test1',
  }, {
    name: 'test2',
  }]
  const children = jest.fn().mockReturnValue();
  
  // act
  render(<ListItems 
    loadingStatus={API_STATUS.LOADING}
    loadingComponent={<span>loading...</span>}
    hasMore={true}
    items={mockItems}>{children}</ListItems>);
  
  const noMoreItemsText = screen.queryByText('No more items to display!');
  const loadMoreButton = screen.queryByRole('button', {
    name: 'Load More',
  });
  const retryButton = screen.queryByRole('button', {
    name: 'Retry',
  });
  const loadingText = screen.getByText('loading...');

  // assert
  expect(children).toHaveBeenCalledTimes(2);
  expect(children.mock.calls[0]).toEqual([mockItems[0], 0]);
  expect(children.mock.calls[1]).toEqual([mockItems[1], 1]);
  expect(noMoreItemsText).not.toBeInTheDocument();
  expect(retryButton).not.toBeInTheDocument();
  expect(loadMoreButton).not.toBeInTheDocument();
  expect(loadingText).toBeInTheDocument();
});
