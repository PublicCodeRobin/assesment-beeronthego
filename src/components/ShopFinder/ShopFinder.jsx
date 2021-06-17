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
      zipcode: '',
      zipcodeResults: null,
    };
  }

  get userCoordinatesUrl() {
    const { zipcode } = this.state;
    return !!zipcode ? osmZipcodeSearchUrl(zipcode) : null;
  }

  setLoading = loading => (this.setState({ loading }))
  resetError = () => (this.setState({ errorMsg: null }))
  setErrorMsg = error => (this.setState({ errorMsg: error.message }))
  setZipcode = zipcode => (this.setState({ zipcode: zipcode.target.value }));


  // Start looking for geo info based on zipcode after form submission
  startSearch = (e) => {
    e.preventDefault();
    const { zipcode } = this.state;
    if (zipcode.length >= 4) {
      this.setGeoInfo().then(() => {
        this.setLoading(false);
      });
    }
  };

  // Get geodata of zipcode from open street maps
  setGeoInfo = () => {
    this.resetError();
    this.setLoading(true);
    if (!!this.userCoordinatesUrl) {
      const { zipcode } = this.state;
      return getOsmGeoData(zipcode).then((res) => {
        this.setState({ zipcodeResults: !!res ? res : [] });
        this.setLoading(false);
      })
        .catch(this.setErrorMsg);
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
    const { zipcode, loading, errorMsg, zipcodeResults } = this.state;
    const firstZipcode = !!zipcodeResults?.length ? zipcodeResults[0] : null; // would otherwise be an empty array

    return (
      <Container>
        <header>
          <Searchbar
            startSearch={this.startSearch}
            zipcode={zipcode}
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

