export interface PlaceSearchResult {
  place_id: string;
  name: string;
  formatted_address: string;
}

export class GoogleMapsService {
  private placesService: google.maps.places.PlacesService;

  constructor() {
    // Create a dummy div for PlacesService (required by Google Maps API)
    const dummyElement = document.createElement("div");
    this.placesService = new google.maps.places.PlacesService(dummyElement);
  }

  searchPlaces(input: string): Promise<PlaceSearchResult[]> {
    return new Promise((resolve, reject) => {
      const request = {
        query: input,
        fields: ["place_id", "name", "formatted_address", "geometry"],
      };

      this.placesService.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const places = results.map((result) => ({
            place_id: result.place_id!,
            name: result.name!,
            formatted_address: result.formatted_address!,
          }));
          resolve(places);
        } else {
          reject(new Error(`Places search failed with status: ${status}`));
        }
      });
    });
  }

  getPlaceDetails(placeId: string): Promise<google.maps.places.PlaceResult> {
    return new Promise((resolve, reject) => {
      const request = {
        placeId,
        fields: [
          "place_id",
          "name",
          "formatted_address",
          "geometry",
          "website",
          "formatted_phone_number",
          "opening_hours",
          "rating",
          "reviews",
          "url",
        ],
      };

      this.placesService.getDetails(request, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          resolve(result);
        } else {
          reject(
            new Error(`Place details request failed with status: ${status}`)
          );
        }
      });
    });
  }
}
