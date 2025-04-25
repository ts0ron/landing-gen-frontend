import { ApiService } from "./ApiService";

interface PlaceGeometry {
  location: {
    lat: number;
    lng: number;
  };
}

interface OpeningHours {
  open_now: boolean;
  weekday_text: string[];
}

interface Review {
  text: string;
  rating: number;
  author: string;
}

export interface Asset {
  id: string;
  placeId: string;
  name: string;
  formattedAddress: string;
  geometry: PlaceGeometry;
  formattedPhoneNumber?: string;
  openingHours?: OpeningHours;
  website?: string;
  rating?: number;
  reviews?: Review[];
  url?: string;
}

export class AssetService extends ApiService {
  async getAsset(id: string): Promise<Asset> {
    return this.get<Asset>(`/assets/${id}`);
  }

  async deleteAsset(id: string): Promise<void> {
    return this.delete(`/assets/${id}`);
  }
}
