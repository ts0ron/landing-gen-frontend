import { ApiService } from "./ApiService";

export interface GooglePlaceGeometry {
  location: {
    lat: number;
    lng: number;
  };
}

export interface GooglePlace {
  placeId: string;
  name: string;
  formattedAddress: string;
  geometry: GooglePlaceGeometry;
}

export class GooglePlaceService extends ApiService {
  async searchPlaces(query: string): Promise<GooglePlace[]> {
    return this.get<GooglePlace[]>(
      `/gplace/search?q=${encodeURIComponent(query)}`
    );
  }

  async getPlaceDetails(placeId: string): Promise<GooglePlace> {
    return this.get<GooglePlace>(`/gplace/${placeId}`);
  }

  async getNearbyPlaces(
    lat: number,
    lng: number,
    radius: number = 1000
  ): Promise<GooglePlace[]> {
    return this.get<GooglePlace[]>(
      `/gplace/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
    );
  }

  async registerPlace(place: GooglePlace): Promise<{ id: string }> {
    return this.post<{ id: string }, GooglePlace>("api/gplace/register", place);
  }
}
