import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { handleError, osmZipcodeSearchUrl } from '../utils/utils';
import haversine from 'haversine-distance';
import { getOpenShops } from '../utils/api';

export const ShopContext = React.createContext({
  zipcodeResults: [],
});

const ShopProvider = ({ children }) => {
  const [shops, setShops] = useState(undefined);
  const [zipcodeResults, setZipcodeResults] = useState(undefined);
  const [zipcode, setZipcode] = useState(undefined);
  const [loading, setLoading] = useState(undefined);
  const [errors, setErrors] = useState(undefined);

  const firstZipRes = !!zipcodeResults?.length && zipcodeResults[0];

  /*
   * User input
   */

  const userCoordinatesUrl = !!zipcode ? osmZipcodeSearchUrl(zipcode) : null;

  const setGeoInfo = () => {
    setErrors(false);
    setLoading(true);
    if (!!userCoordinatesUrl) {
      return fetch(userCoordinatesUrl, { mode: 'no-cors' })
        .then(res => res.json())
        .then((res) => {
          setZipcodeResults([...res]);
          setLoading(false);
        })
        .catch((err) => {
          setErrors({
            errorMsg: err.message,
          });
          return handleError(err);
        });
    }
  };

  const startSearch = (e) => {
    e.preventDefault();
    if (zipcode.length >= 4) {
      setGeoInfo()
        .then(() => {
          setLoading(false);
        });
    }
  };


  /*
   *End user input
   */

  const compareDistances = (a, b) => {
    const distA = a.geoData.distance;
    const distB = b.geoData.distance;
    if (distA < distB) {
      return -1;
    }
    if (distA > distB) {
      return 1;
    }
    return 0;
  };

  const distanceFromQuery = (lat, lon) => {
    const kmDistance = haversine({ lat, lon }, { lat: latLngQuery.lat, lon: latLngQuery.lon }) / 1000;
    return Math.round(kmDistance);
  };

  const latLngQuery = () => {
    if (hasCoordinatesQuery) {
      return hasCoordinatesQuery && { lat: firstZipRes.lat, lon: firstZipRes.lon };
    }
  };

  const setShopGeodata = (shops) => {
    const combinedPromises = hydratedShopPromises(shops);
    return Promise.all(combinedPromises)
      .then((response) => {
        const sortedShops = response.sort((a, b) => (
          compareDistances(a, b)
        ));
        return setShops({
          shops: sortedShops,
        });
      })
      .catch(err => handleError(err));
  };

  const hydratedShopPromises = (shops) => {
    return shops.map((shop) => {
      const osmUrl = osmZipcodeSearchUrl(shop.zipcode);
      return fetch(osmUrl, { mode: 'no-cors' })
        .then(resp => resp.json())
        .then((resp) => {
          const firstZipcodeResult = resp[0] || {};
          const { lat, lon } = firstZipcodeResult;

          return {
            ...shop,
            geoData: {
              ...firstZipcodeResult,
              distance: distanceFromQuery(lat, lon),
            },
          };
        })
        .catch(err => handleError(err));
    });
  };

  const hasCoordinatesQuery = () => {
    return !!(firstZipRes.lat && firstZipRes.lon);
  };

  useEffect(() => {
    setShops([]);
    setLoading(true);
    getOpenShops
      .then(res => (
        /*
         * TODO: REMOve THIS!
         * this.setShopGeodata(res);
         */
        hasCoordinatesQuery ?
          (
            setShopGeodata([
              res[0],
              res[1],
            ]))
          :
          (
            setShops({
              shops,
            })
          )
      ))
      .then(() => {
        setLoading(false);
      });
    // Set up event listeners from Content script


    /*
     * Put fetching here
     *
     */
  }, []);

  return (
    <ShopContext.Provider
      value={{
        firstZipRes,
        setZipcode,
        startSearch,
        loading,
        setLoading,
        shops,
        setShops,
        errors,
        setErrors,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

ShopProvider.propTypes = {
  children: PropTypes.any,
};

export default ShopProvider;
