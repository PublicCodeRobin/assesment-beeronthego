import { handleError, osmZipcodeSearchUrl } from './utils';

const _baseURL = process.env.PUBLIC_URL;

/**
 * Get all shops
 * @returns {Promise} all shops
 */
export const getShops = fetch(`${_baseURL}/shops.json`, {
  method: 'get',
  'content-type': 'application/json',
  accept: 'application/json',
})
  .then(response => response.json()) // pass the data as promise to next then block
  .catch(err => handleError(err));

/**
 * Get open shops
 * @returns {Promise} open shops
 */
export const getOpenShops = getShops
  .then((res) => {
    const todaysName = () => {
      const fullDateTime = Date();
      const dateStr = new Date(fullDateTime);
      return dateStr.toLocaleDateString('en-GB', { weekday: 'long' });
    };

    return res.breweries.filter((shop) => {
      return shop.open.includes(todaysName());
    });
  });

/**
 * Get geo data from postal code
 * @returns {Promise} open shops
 * @param  {string} zipcode
 */
export const getOsmGeoData = (zipcode) => {
  const osmUrl = osmZipcodeSearchUrl(zipcode);
  return  fetch(osmUrl,
    {
      method: 'get',
      'content-type': 'application/json',
      accept: 'application/json',
    })
    .then(res => res.json())
    .catch(err => handleError(err));
};

