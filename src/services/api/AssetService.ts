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
 * Asset display name interface
 */
export interface DisplayName {
  text: string;
  languageCode: string;
}

/**
 * Asset location interface
 */
export interface AssetLocation {
  latitude: number;
  longitude: number;
}

/**
 * Opening hours period interface
 */
export interface OpeningHoursPeriod {
  open: {
    day: number;
    hour: number;
    minute: number;
  };
  close: {
    day: number;
    hour: number;
    minute: number;
  };
}

/**
 * Regular opening hours interface
 */
export interface RegularOpeningHours {
  periods: OpeningHoursPeriod[];
  weekdayDescriptions: string[];
}

/**
 * Secondary opening hours interface
 */
export interface SecondaryOpeningHours extends RegularOpeningHours {
  secondaryHoursType: string;
}

/**
 * Photo author attribution interface
 */
export interface PhotoAuthorAttribution {
  displayName: string;
  uri: string;
  photoUri: string;
}

/**
 * Asset photo interface
 */
export interface AssetPhoto {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: PhotoAuthorAttribution[];
  photoUrl?: string;
}

/**
 * Parking options interface
 */
export interface ParkingOptions {
  freeParkingLot?: boolean;
  paidParkingLot?: boolean;
  freeStreetParking?: boolean;
  valetParking?: boolean;
  freeGarageParking?: boolean;
  paidGarageParking?: boolean;
}

/**
 * Payment options interface
 */
export interface PaymentOptions {
  acceptsCreditCards?: boolean;
  acceptsDebitCards?: boolean;
  acceptsCashOnly?: boolean;
  acceptsNfc?: boolean;
}

/**
 * Accessibility options interface
 */
export interface AccessibilityOptions {
  wheelchairAccessibleParking?: boolean;
  wheelchairAccessibleEntrance?: boolean;
  wheelchairAccessibleRestroom?: boolean;
  wheelchairAccessibleSeating?: boolean;
}

/**
 * Dine-in options interface
 */
export interface DineInOptions {
  reservable?: boolean;
  servesCocktails?: boolean;
  servesDessert?: boolean;
  servesCoffee?: boolean;
  outdoorSeating?: boolean;
  liveMusic?: boolean;
  menuForChildren?: boolean;
  goodForChildren?: boolean;
  goodForGroups?: boolean;
  goodForWatchingSports?: boolean;
}

/**
 * Editorial summary interface
 */
export interface EditorialSummary {
  text: string;
  languageCode: string;
}

/**
 * Review text interface
 */
export interface ReviewText {
  text: string;
  languageCode: string;
}

/**
 * Review author attribution interface
 */
export interface ReviewAuthorAttribution {
  displayName: string;
  uri: string;
  photoUri: string;
}

/**
 * Asset review interface
 */
export interface AssetReview {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: ReviewText;
  authorAttribution: ReviewAuthorAttribution;
}

/**
 * Asset document interface
 */
export interface Asset {
  _id: string;
  externalId: string;
  displayName: DisplayName;
  formattedAddress: string;
  shortFormattedAddress?: string;
  location: AssetLocation;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri: string;
  websiteUri?: string;

  // Opening hours
  regularOpeningHours?: RegularOpeningHours;
  regularSecondaryOpeningHours?: SecondaryOpeningHours[];
  currentOpeningHours?: RegularOpeningHours;

  // Types
  primaryType: string;
  types: string[];

  // Photos
  photos?: AssetPhoto[];

  // Options and features
  parkingOptions?: ParkingOptions;
  paymentOptions?: PaymentOptions;
  accessibilityOptions?: AccessibilityOptions;
  dineInOptions?: DineInOptions;

  // Summaries and descriptions
  editorialSummary?: EditorialSummary;
  priceLevel?:
    | "PRICE_LEVEL_FREE"
    | "PRICE_LEVEL_INEXPENSIVE"
    | "PRICE_LEVEL_MODERATE"
    | "PRICE_LEVEL_EXPENSIVE"
    | "PRICE_LEVEL_VERY_EXPENSIVE";

  // Reviews
  reviews?: AssetReview[];

  // Additional features
  allowsDogs?: boolean;
  hasRestroom?: boolean;

  // AI-generated content
  aiDescription?: string;
  aiTags?: string[];
  aiLandingPage?: string;

  // Document timestamps
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
