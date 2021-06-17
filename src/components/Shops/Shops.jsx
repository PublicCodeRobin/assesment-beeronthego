import React, { Component } from 'react';
import Shop from '../Shop/Shop';
import { Skeleton, Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import haversine from 'haversine-distance';

import { getOpenShops, getOsmGeoData } from '../../utils/api';
import { handleError } from '../../utils/utils';


class Shops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      loading: false,
    };
  }

  setLoading = loading => (this.setState({ loading }))

  hydratedShopPromises = (shops) => {
    return shops.map((shop) => {
      return getOsmGeoData(shop.zipcode)
        .then((resp) => {
          const firstZipcodeResult = resp[0] || {};
          const { lat, lon } = firstZipcodeResult;
          return {
            ...shop,
            geoData: {
              ...firstZipcodeResult,
              distance: this.distanceFromQuery(lat, lon),
            },
          };
        })
        .catch(err => handleError(err));
    });
  }


  setShopGeodata = (shops) => {
    const combinedPromises = this.hydratedShopPromises(shops);
    return Promise.all(combinedPromises)
      .then((response) => {
        const sortedShops = response.sort((a, b) => (
          this.compareDistances(a, b)
        ));
        return this.setState({
          shops: sortedShops,
        });
      })
      .catch(err => handleError(err));
  }


  /*
   * !! NOTE for OSM:
   * To limit requests for development you should limit the amount in setShopGeoData
   */
  setShops = () => {
    this.setLoading(true);
    getOpenShops
      .then(res => (
        this.hasCoordinatesQuery ?
          (
            this.setShopGeodata(res)) // => here [res[0],res[1] to limit]
          :
          (
            this.setState({
              shops: res,
            })
          )
      ))
      .then(() => {
        this.setLoading(false);
      });
  }

  componentDidMount() {
    this.setShops();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { zipcodeResult } = this.props;
    if (prevProps.zipcodeResult?.lat !== zipcodeResult?.lat) {
      this.setShops();
    }
  }

  get zipcodeResult() {
    const { zipcodeResult = {} } = this.props;
    return zipcodeResult;
  }

  get hasCoordinatesQuery() {
    return !!(this.zipcodeResult?.lat && this.zipcodeResult?.lon);
  }

  get latLngQuery() {
    if (this.hasCoordinatesQuery) {
      return this.hasCoordinatesQuery && { lat: this.zipcodeResult?.lat, lon: this.zipcodeResult?.lon };
    }
  }

  compareDistances = (a, b) => {
    const distA = a.geoData.distance;
    const distB = b.geoData.distance;
    if (distA < distB) {
      return -1;
    }
    if (distA > distB) {
      return 1;
    }
    return 0;
  }

  distanceFromQuery = (lat, lon) => {
    const kmDistance = haversine({ lat, lon }, { lat: this.latLngQuery.lat, lon: this.latLngQuery.lon }) / 1000;
    return Math.round(kmDistance);
  };


  render() {
    const { shops, loading } = this.state;
    return (
      !loading ? (
        <Stack spacing="3" py="3">
          {!!shops?.length && shops.map((shopData, i) => {
            return (
              <Shop
                key={i}
                {...shopData}
              />
            );
          })}
        </Stack>
      ) : (
        <Skeleton
          height="300px"
        />
      )
    );
  }
}

export default Shops;
Shops.propTypes = {
  zipcodeResult: PropTypes.object,
};
