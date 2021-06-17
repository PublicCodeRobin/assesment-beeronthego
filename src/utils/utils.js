/**
 * Get open shops
 * @param zipcode {string}
 * @returns Promise open shops
 */
export const osmZipcodeSearchUrl = (zipcode) => {
  const zipWithoutSpaces = !!zipcode && zipcode.split(' ').join('');
  if (!!zipWithoutSpaces) {
    return `/osm?postalcode=${zipWithoutSpaces}&countrycodes=nl,be&format=json`;
  }
};

/**
 * Sanitize zipcode
 * @param {object} e data from input
 * @returns {string} clean postal code
 */
export const zipcodeCleaner = (e) => {
  const rawPostal = e.target.value;
  const cleanPostal = rawPostal.replace(/[^0-9a-z]+/gi, '');
  let validatedPostal = '';
  let stringLength = Math.min(4, cleanPostal.length);

  // numbers
  for (let i = 0; i < stringLength; i++) {
    if (isNaN(parseInt(cleanPostal.charAt(i), 10))) {
      break;
    } else {
      validatedPostal += cleanPostal.charAt(i);
    }
  }

  // chars
  if (validatedPostal.length === 4 && cleanPostal.length > 4) {
    stringLength = Math.min(6, cleanPostal.length);
    for (let i = 4; i < stringLength; i++) {
      const char = cleanPostal.charAt(i);
      if (/[a-z]/i.test(char)) {
        validatedPostal += char.toUpperCase();
      } else {
        break;
      }
    }
  }
  return validatedPostal;
};

/**
 * Handle errors
 * @param err {object} raw error obj from request
 * @returns {function} clean postal code
 */
export const handleError = (err) => {
  return console.error('Request failed', err.message);
};
