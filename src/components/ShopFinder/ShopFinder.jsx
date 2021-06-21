import React, { Component } from 'react';
import Container from '../Container/Container';
import Searchbar from '../Searchbar/Searchbar';
import Shops from '../Shops/Shops';

import { osmZipcodeSearchUrl } from '../../utils/utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ResultDescription from '../ResultDescription/ResultDescription';
import { getOsmGeoData } from '../../utils/api';

class ShopFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMsg: null,
      zipcodeResults: null,
    };
  }


  setLoading = loading => (this.setState({ loading }))
  resetError = () => (this.setState({ errorMsg: null }))
  setErrorMsg = error => (this.setState({ errorMsg: error.message }))


  // Start looking for geo info based on zipcode after form submission
  startSearch = (e, zipcode) => {
    e.preventDefault();
    if (zipcode.length >= 4) {
      this.setGeoInfo(zipcode);
    }
  };

  // Get geodata of zipcode from open street maps
  setGeoInfo = (zipcode) => {
    this.resetError();
    this.setLoading(true);
    if (!!osmZipcodeSearchUrl(zipcode)) {
      getOsmGeoData(zipcode)
        .then((res) => {
          this.setState({ zipcodeResults: !!res ? res : [] });
          this.setLoading(false);
        })
        .catch((err) => {
          this.setLoading(false);
          this.setErrorMsg(err);
        });
    }
  }


  locationName(displayName) {
    if (!!displayName) {
      return displayName.split(', ')
        .splice(0, 3)
        .join(', ');
    }
  }

  render() {
    const { loading, errorMsg, zipcodeResults } = this.state;
    const firstZipcode = !!zipcodeResults?.length ? zipcodeResults[0] : null; // would otherwise be an empty array

    return (
      <Container>
        <header>
          <Searchbar
            startSearch={this.startSearch}
            setZipcode={this.setZipcode}
          />
          {!errorMsg && (
            <ResultDescription
              loading={loading}
              loadingText="checking zipcode..."
              introText="Breweries nearby"
              noResultText={!!firstZipcode ? 'Zipcode not found... showing all breweries' : 'Showing all breweries'}
              resultText={this.locationName(firstZipcode?.display_name)}
            />)}
          {!!errorMsg && (
            <ErrorMessage
              message={errorMsg}
            />
          )}
        </header>
        <main>
          <Shops
            zipcodeResult={firstZipcode}
          />
        </main>
      </Container>
    );
  }
}
export default ShopFinder;

