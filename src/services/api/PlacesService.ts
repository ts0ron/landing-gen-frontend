import { ApiService } from "./ApiService";

interface PlaceDetails {
  placeId: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  phone?: string;
  website?: string;
  rating?: number;
  photos?: string[];
  openingHours?: {
    weekdayText: string[];
    isOpenNow: boolean;
  };
}

export class PlacesService extends ApiService {
  async searchPlaces(query: string): Promise<PlaceDetails[]> {
    return this.get<PlaceDetails[]>(
      `/places/search?q=${encodeURIComponent(query)}`
    );
  }

  async getPlaceDetails(placeId: string): Promise<PlaceDetails> {
    return this.get<PlaceDetails>(`/places/${placeId}`);
  }

  async getNearbyPlaces(
    lat: number,
    lng: number,
    radius: number = 1000
  ): Promise<PlaceDetails[]> {
    return this.get<PlaceDetails[]>(
      `/places/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
    );
  }
}
