import { FirebaseService } from "../firebase/FirebaseService";

// Generic type for JSON-serializable data
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };
export type JsonData = { [key: string]: JsonValue };

export class ApiService {
  protected baseUrl: string;

  constructor(baseUrl: string = import.meta.env.VITE_APP_API_URL) {
    this.baseUrl = baseUrl;
  }

  private async getAuthToken(): Promise<string | null> {
    const user = FirebaseService.getInstance().getCurrentUser();
    if (!user) return null;
    return user.getIdToken();
  }

  private async buildHeaders(): Promise<HeadersInit> {
    const token = await this.getAuthToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse(response: Response) {
    if (response.status === 401) {
      await FirebaseService.getInstance().signOut();
      window.location.href = "/";
      throw new Error("Unauthorized - Please sign in again");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  protected async get<T>(endpoint: string): Promise<T> {
    const headers = await this.buildHeaders();
    const response = await fetch(`${this.baseUrl}${endpoint}`, { headers });
    return this.handleResponse(response);
  }

  protected async post<T, D extends object>(
    endpoint: string,
    data: D
  ): Promise<T> {
    const headers = await this.buildHeaders();
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  protected async put<T, D extends object>(
    endpoint: string,
    data: D
  ): Promise<T> {
    const headers = await this.buildHeaders();
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    const headers = await this.buildHeaders();
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers,
    });
    return this.handleResponse(response);
  }
}
