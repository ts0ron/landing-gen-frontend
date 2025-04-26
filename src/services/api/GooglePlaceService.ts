import { ApiService } from "./ApiService";
import { Asset } from "../api/AssetService";

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
  async registerPlace(place: GPlaceRegisterInput): Promise<Asset> {
    return this.post<Asset, GPlaceRegisterInput>("/gplace/register", place);
  }
}
