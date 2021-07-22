import React, { useState, FC, FormEvent } from 'react';

import Container from '../Container/Container';
import Searchbar from '../Searchbar/Searchbar';
import Shops from '../Shops/Shops';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ResultDescription from '../ResultDescription/ResultDescription';

import { getGeoDataByZip } from '../../utils/api';
import { useError } from '../Hooks/useError';
import { handleError } from '../../utils/utils';

import { TLocation } from '../../models/OsmApiRes';

const ShopFinder: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [zipcodeResults, setZipcodeResults] = useState<TLocation | undefined| null>(undefined);

  const { errorMsg, setError, resetError } = useError();

  const resetZipcode = () => setZipcodeResults(null);

  // Start looking for geo info based on zipcode after form submission
  const startSearch = (e: FormEvent, zipcode: string) => {
    e.preventDefault();
    resetError();
    if (zipcode.length >= 4) {
      setGeoInfo(zipcode);
    }
    if (zipcode.length === 0) {
      resetZipcode();
    }
  };

  // Get geodata of zipcode from open street maps
  const setGeoInfo = (zipcode: string) => {
    setLoading(true);
    getGeoDataByZip(zipcode)
      .then((res) => {
        return setZipcodeResults(res);
      })
      .catch((err) => {
        handleError(err);
        setError(err?.message || 'Shops could not be found');
      })
      .finally(() => setLoading(false));
  };

  // Make the location name somewhat shorter and less repetitive with postal code
  const locationName = (displayName?: string) => {
    if (!!displayName) {
      return displayName
        .split(', ')
        .splice(0, 3)
        .join(', ');
    }
  };

  const firstZipRes = !!zipcodeResults ?  zipcodeResults : null;

  return (
    <Container>
      <header>
        <Searchbar
          startSearch={startSearch}
        />
        {!errorMsg && (
          <>
            <ResultDescription
              loading={loading}
              loadingText="checking zipcode..."
              introText="Breweries nearby"
              noResultText={!!firstZipRes?.display_name ? 'Zipcode not found... showing all breweries' : 'Showing all breweries'}
              resultText={locationName(firstZipRes?.display_name)}
            />
          </>
        )}
        {!!errorMsg && (
          <ErrorMessage
            message={errorMsg}
          />
        )}
      </header>
      <main>
        <Shops
          zipcodeResult={firstZipRes}
        />
      </main>
    </Container>
  );
};
export default ShopFinder;

