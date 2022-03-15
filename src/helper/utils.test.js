import { filterCities } from "./utils";

describe('Unit: utils', () => {
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
  }, {
    geonameid: 3,
    name: 'Villa Allende',
    country: 'Argentina',
    subcountry: 'Cordoba',
  }];
  test('should filter cities when filter is on their name', () => {
    // arrange
    const filter = 'villa';

    // act
    const result = filterCities(cities, filter);

    // assert
    expect(result.length).toEqual(1);
    expect(result[0].name).toEqual('Villa Allende');
  });

  test('should filter cities when filter is on their subcountry', () => {
    // arrange
    const filter = 'cordoba';

    // act
    const result = filterCities(cities, filter);

    // assert
    expect(result.length).toEqual(2);
    expect(result[0].subcountry).toEqual('Cordoba');
    expect(result[1].subcountry).toEqual('Cordoba');
  });
  
  test('should filter cities when filter is on their country', () => {
    // arrange
    const filter = 'arg';

    // act
    const result = filterCities(cities, filter);

    // assert
    expect(result.length).toEqual(3);
    expect(result).toEqual(cities);
  });
});
