import React, { FC, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Stack } from '@chakra-ui/react';

import Shop from '../Shop/Shop';
import { getGeoDataByZip, getShops } from '../../utils/api';
import { formattedDistance, handleError } from '../../utils/utils';

import { TLocation } from '../../models/OsmApiRes';
import { TShopData } from '../../models/ShopData';

const Shops: FC<{ zipcodeResult: TLocation | null }> = (props) => {
  const { zipcodeResult } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [shops, setShops] = useState<TShopData[]>([]);

  const sortOnDistance = (a: TShopData, b: TShopData) => {
    if (!!a?.geoData && !!b?.geoData) {
      const { distance: distA = 0 } = a.geoData;
      const { distance: distB = 0 } = b.geoData;

      if (distA < distB) {
        return -1;
      }
      if (distA > distB) {
        return 1;
      }
      return 0;
    }
    return 0;
  };

  // use callback to stop eslint from yelling
  const fetchShopsAndGeoData = useCallback(async (userLat, userLon) => {
    setLoading(true);
    return getShops().then((shops) => {
      // const shopsToGet = shops.splice(0, 0); // !UNCOMMENT FOR DEVELOPMENT, OTHERWISE YOU MIGHT GET BLOCKED FROM OPEN STREET MAPS
      const shopsToGet = shops; // !!important: set this to prevent too many requests in OpenStreetMaps
      if (!!userLat && !!userLon) {
        const promises = shopsToGet.map((shop) => {
          return getGeoDataByZip(shop.zipcode)
            .then((geoData) => {
              if (!!geoData?.lat && !!geoData?.lon && userLat && userLon) {
                geoData.distance = formattedDistance(
                  [userLat, userLon],
                  [geoData.lat, geoData.lon]
                );
              }
              return {
                ...shop,
                geoData,
              };
            });
        });
        return Promise.all(promises)
          .then((res) => {
            return res.sort((a, b) => sortOnDistance(a, b));
          });
      }
      return shops; // Just return the normal shops without geoLocation info if no geoData.lat/lon provided
    });
  }, []);


  useEffect(() => {
    const firstZipRes = !!zipcodeResult ? zipcodeResult : null;
    const { lat: userLat, lon: userLon } = firstZipRes || {};
    fetchShopsAndGeoData(userLat, userLon)
      .then((res) => {
        setShops(res);
      })
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  }, [zipcodeResult, fetchShopsAndGeoData]);


  return (
    !loading ? (
      <Stack spacing="3" py="3">
        {!!shops?.length && shops.map((TShopData, i) => {
          return (
            <Shop
              key={i}
              {...TShopData}
            />
          );
        })}
      </Stack>
    ) : (
      <Skeleton
        py="3"
        height="300px"
      />
    )
  );
};

Shops.propTypes = {
  zipcodeResult: PropTypes.object,
};
export default Shops;
