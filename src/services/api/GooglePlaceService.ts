import { ApiService } from "./ApiService";

export interface GooglePlaceGeometry {
  location: {
    lat: number;
    lng: number;
  };
}

export interface GPlaceRegisterInput {
  placeId: string;
}

export class GooglePlaceService extends ApiService {
  async registerPlace(place: GPlaceRegisterInput): Promise<{ id: string }> {
    return this.post<{ id: string }, GPlaceRegisterInput>(
      "/gplace/register",
      place
    );
  }
}
