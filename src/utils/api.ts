import { osmZipcodeSearchUrl, shopsUrl } from './utils';

import { TShopData } from '../models/ShopData';
import { TLocation } from '../models/OsmApiRes';

// Base shop data
export async function getShops() : Promise<TShopData[]> {
  const response = await fetch(shopsUrl, {
    method: 'get',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      accept: 'application/json',
    },
  });

    type JSONResponse = {
        breweries?: TShopData[],
        error? : Error,
    }

    const { breweries, error }: JSONResponse = await response.json();

    if (response.ok) {
      if (!!breweries?.length) {
        return breweries;
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
}

export async function getGeoDataByZip(zipcode:string|null|undefined): Promise<TLocation|undefined> {
  if (!!zipcode) {
    const osmUrl = osmZipcodeSearchUrl(zipcode);
    if (!!osmUrl) {
      const response = await fetch(osmUrl, {
        method: 'get',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          accept: 'application/json',
        },
      });

      const jsonRes = await response.json();

      const location: TLocation = jsonRes[0];

      if (response.ok) {
        if (!!location.lat && !!location.lon) {
          return location;
        }
        return Promise.reject(new Error(`No zipcode location info found!`));
      }
      const { error } = jsonRes;
      return Promise.reject(error);
    }
  }
}

