import { ApiService } from "./ApiService";

interface LandingPageData {
  placeId: string;
  name: string;
  address: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: Array<{
    text: string;
    rating: number;
    author: string;
  }>;
}

export class LandingPageService extends ApiService {
  async createLandingPage(data: LandingPageData): Promise<{ id: string }> {
    return this.post<{ id: string }>("/landing-pages", data);
  }
}
