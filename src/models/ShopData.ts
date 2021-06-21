import { TLocation } from './OsmApiRes';

export interface TShopData {
    address: string|null|undefined;
    city: string|null|undefined;
    name: string|null|undefined;
    zipcode: string|null|undefined;
    open: string[]|undefined|null; // days
    geoData?: TLocation|undefined;
}
