import { API_STATUS } from '../constants/constants';
import {get, patch} from './fetch';

describe('Unit: fetch', () => {
  const url = 'http://localhost';
  beforeEach(() => {
    fetch.resetMocks()
  })
  test('should return data properly when using get', async() => {
    // arrange
    const mockData = {data: 'test'};
    fetch.mockResponseOnce(JSON.stringify(mockData));
    
    // act
    const {status, data} = await get(url);
  
    // assert
    expect(status).toEqual(API_STATUS.SUCCESS);
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url);
  });
  
  test('should return error when using get', async() => {
    // arrange
    fetch.mockRejectOnce(new Error('testing error'));
    
    // act
    const {status, data} = await get(url);
  
    // assert
    expect(status).toEqual(API_STATUS.ERROR);
    expect(data).toBeUndefined();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test('should update properly when using patch', async() => {
    // arrange
    const mockData = {data: 'test'};
    fetch.mockResponseOnce();
    const expectedCall = {
      method: 'PATCH',
      body: mockData,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    // act
    const {status} = await patch(url, mockData);
  
    // assert
    expect(status).toEqual(API_STATUS.SUCCESS);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, expectedCall);
  });
  
  test('should return error when using patch', async() => {
    // arrange
    const mockData = {data: 'test'};
    fetch.mockRejectOnce(new Error('testing error'));
    const expectedCall = {
      method: 'PATCH',
      body: mockData,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    // act
    const {status} = await patch('http://localhost', mockData);
  
    // assert
    expect(status).toEqual(API_STATUS.ERROR);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, expectedCall);
  });
});
