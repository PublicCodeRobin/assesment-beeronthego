import React from 'react';
import { Box, Heading, Link, Text } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';

import PropTypes from 'prop-types';

const Shop = (props) => {
  const { name, address, zipcode, city } = props;
  /*
   * TODO: Add butotn to navigate to brewery
   *
   */
  const { geoData } = props;
  const { distance } = geoData || {};

  const distanceColors = (distance) => {
    let color = 'grey.400';
    if (distance < 35) {
      color = 'green.400';
    } if (distance >= 35) {
      color = 'orange.400';
    } if (distance >= 60) {
      color = 'red.400';
    }
    return color;
  };


  const googleDirectionsLink = `https://maps.google.com/?q=${[address, zipcode, city].join(',')}`;

  const linkContent = (

    <>

      <Link color={distanceColors(distance)} isExternal href={googleDirectionsLink}>
        <Text alignContent={'center'}>
          {distance} km | Navigate with maps <ArrowRightIcon color={distanceColors(distance)}/>
        </Text>
      </Link>
    </>
  );

  return (
    <Box
      p="4"
      rounded="md"
      boxShadow="lg"
      bg="white"
      pb="3"
    >
      {!!name && (
        <Heading as="h2" size="l">
          {name}
        </Heading>
      )}
      {!!address && (
        <Text>
          {address}
        </Text>
      )}
      {!!zipcode && (
        <Box>
          {zipcode} {city}
        </Box>
      )}

      {!!distance && (
        <Box>
          {linkContent}
        </Box>
      )}
    </Box>
  );
};

export default Shop;

Shop.propTypes = {
  geoData: PropTypes.object,
  name: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  zipcode: PropTypes.string,
  open: PropTypes.array,
};
