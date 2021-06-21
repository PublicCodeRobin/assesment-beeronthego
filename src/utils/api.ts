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
        errors? : Array<{ message: string }>
    }

    const { breweries, errors }: JSONResponse = await response.json();

    if (response.ok) {
      if (!!breweries?.length) {
        return breweries;
      }
      return Promise.reject(errors);
    }

    const error = new Error(errors?.map(e => e.message)
      .join('\n') ?? 'unknown error');
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

      const jsonRes: TLocation[] = await response.json();
      const location: TLocation = jsonRes[0];

      if (response.ok) {
        if (!!location) {
          return location;
        }
        return Promise.reject(new Error(`no breweries found`));
      }

      const error = new Error('no good');
      return Promise.reject(error);
    }
  }
}

