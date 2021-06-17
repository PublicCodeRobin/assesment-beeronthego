import React, { Component } from 'react';
import Container from '../Container/Container';
import Searchbar from '../Searchbar/Searchbar';
import Shops from '../Shops/Shops';

import { handleError, osmZipcodeSearchUrl } from '../../utils/utils';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ResultDescription from '../ResultDescription/ResultDescription';
import ShopProvider, { ShopContext } from '../../___WIP_Contexts/ShopProvider';

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

  resetErrors = () => {
    this.setState({ errorMsg: null });
  }

  get userCoordinatesUrl() {
    const { zipcode } = this.state;
    return !!zipcode ? osmZipcodeSearchUrl(zipcode) : null;
  }

  setLoading = (loading) => {
    this.setState(() => {
      return {
        loading,
      };
    });
  }

  setErrorMsg = (error) => {
    this.setState(() => {
      return {
        errorMsg: error.message,
      };
    });
  }


  startSearch = (e) => {
    e.preventDefault();
    const { zipcode } = this.state;
    if (zipcode.length >= 4) {
      this.setGeoInfo().then(() => {
        this.setLoading(false);
      });
    }
  };

  setGeoInfo = () => {
    this.resetErrors();
    this.setLoading(true);
    if (!!this.userCoordinatesUrl) {
      return fetch(this.userCoordinatesUrl, { mode: 'no-cors' })
        .then(res => res.json())
        .then((res) => {
          this.setState({ zipcodeResults: !!res ? res : [] });
          this.setLoading(false);
        })
        .catch((err) => {
          this.setErrorMsg(err);
          return handleError(err);
        });
    }
  }

  setZipcode = (zipcode) => {
    this.setState({
      zipcode,
    });
  };

  get firsZipcode() {
    const { zipcodeResults } = this.state;
    if (zipcodeResults) {
      return { ...zipcodeResults[0] };
    }
  }

  get locationName() {
    const { display_name } = this.firsZipcode || {};
    if (!!display_name) {
      return display_name.split(', ')
        .splice(0, 3)
        .join(' ');
    }
  }

  render() {
    const { zipcode, loading, errorMsg } = this.state;
    /*
     * TODO: differentiate no results and initial results!
     */

    return (
      <ShopProvider>
        <Container>
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
              noResultText={'Showing all breweries'}
              resultText={this.locationName}

            />)}
          {!!errorMsg && (
            <ErrorMessage
              message={errorMsg}
            />
          )}
          <Shops
            zipcodeResult={this.firsZipcode}
          />
        ----
          <ShopContext.Consumer>
            {({
              firstZipres,
              startSearch,
              zipcode,
              setZipcode,
            }) => (
              <>
                <Searchbar
                  startSearch={startSearch}
                  zipcode={zipcode}
                  setZipcode={setZipcode}
                />
                <Shops
                  zipcodeResult={firstZipres}
                />
              </>
            )}
          </ShopContext.Consumer>
        </Container>
      </ShopProvider>

    );
  }
}
export default ShopFinder;

