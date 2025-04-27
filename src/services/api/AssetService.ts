import { ApiService } from "./ApiService";

/**
 * Address component interface
 */
export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

/**
 * Place photo interface
 */
export interface PlacePhoto {
  photoReference: string;
  photoUri?: string;
  height: number;
  width: number;
}

/**
 * Place location interface
 */
export interface PlaceLocation {
  lat: number;
  lng: number;
}

/**
 * Place geometry interface
 */
export interface PlaceGeometry {
  location: PlaceLocation;
  viewport?: {
    northeast: PlaceLocation;
    southwest: PlaceLocation;
  };
}

/**
 * Opening hours interface
 */
export interface OpeningHours {
  open_now?: boolean;
  periods?: Array<{
    open: {
      day: number;
      time: string;
    };
    close?: {
      day: number;
      time: string;
    };
  }>;
  weekday_text?: string[];
}

/**
 * Review interface
 */
export interface Review {
  author_name: string;
  rating: number;
  relative_time_description: string;
  time: number;
  text: string;
}

/**
 * Asset document interface
 */
export interface Asset {
  _id: string;
  placeId: string;
  name: string;
  formattedAddress: string;
  addressComponents?: AddressComponent[];
  adrAddress?: string;
  businessStatus?: string;
  geometry: PlaceGeometry;
  icon?: string;
  iconBackgroundColor?: string;
  iconMaskBaseUri?: string;
  photos: PlacePhoto[];
  permanentlyClosed?: boolean;
  plusCode?: {
    global_code: string;
    compound_code: string;
  };
  types: string[];
  url?: string;
  utcOffset?: number;
  vicinity?: string;
  formattedPhoneNumber?: string;
  internationalPhoneNumber?: string;
  openingHours?: OpeningHours;
  website?: string;
  priceLevel?: number;
  rating?: number;
  userRatingsTotal?: number;
  reviews?: Review[];
  wheelchairAccessibleEntrance?: boolean;
  aiDescription?: string;
  aiTags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class AssetService extends ApiService {
  async getAsset(id: string): Promise<Asset> {
    return this.get<Asset>(`/api/asset/${id}`);
  }

  async deleteAsset(id: string): Promise<void> {
    return this.delete(`/api/asset/${id}`);
  }
}
