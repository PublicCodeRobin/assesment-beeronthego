import haversine from 'haversine-distance';

const _baseURL = process.env.PUBLIC_URL;

export const osmZipcodeSearchUrl = (zipcode:string) => {
  const zipWithoutSpaces = zipcode.split(' ').join('');
  return `/osm?postalcode=${zipWithoutSpaces}&countrycodes=nl,be&format=json`;
};

export const shopsUrl = `${_baseURL}/shops.json`;

/**
 * Handle errors
 * @param err {object} raw error obj from request
 */
export const handleError = (err?:Error) => {
  if (!!err?.message) {
    return console.error('Request failed...', err?.message);
  }
  return console.error('Error! Unknown error');
};

/**
 * Return the distance in kilometers
 * @param a - first location
 * @param b - second location
 */
export const formattedDistance = (a: number[], b: number[]) => {
  const [userLat, userLon] = a;
  const [shopLat, shopLon] = b;


  if (!!userLat && !!userLon && !!shopLat && !!shopLon) {
    const havDist = haversine(
      [userLat, userLon],
      [shopLat, shopLon]
    ) / 1000;
    return Math.round(havDist);
  }
};
