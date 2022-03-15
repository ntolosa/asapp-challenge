export const filterCities = (cities, filter) => {
  return cities.filter(preference => preference.name.toLowerCase().trim().indexOf(filter) >= 0 ||
  preference.country.toLowerCase().trim().indexOf(filter) >= 0 ||
  preference.subcountry.toLowerCase().trim().indexOf(filter) >= 0)
};
