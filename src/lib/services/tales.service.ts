import { WordPressAdapter } from '../adapters/worpress.adapter';
import type { WpTale,Tale } from "@/types";

export class TaleService {
  private baseUrl: string;
  private headers: Headers;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.headers = new Headers();
    this.headers.append("Authorization", `Basic ${apiKey}`);
  }

  private async fetchAPI<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/wp-json/wp/v2${endpoint}`, {
      method: "GET",
      headers: this.headers,
      redirect: "follow",
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getTales(): Promise<Tale[]> {
    try {
      const wpTales: WpTale[] = await this.fetchAPI('/tale?_embed');
      return wpTales.map(tale => WordPressAdapter.toTale(tale));
    } catch (error) {
      console.error('Error fetching tales:', error);
      throw error;
    }
  }

  async getTale( slug: string | string[] | undefined
  ): Promise<Tale | null> {
    try {
      const wpTales: WpTale[] = await this.fetchAPI(`/tale?slug=${slug}`);
      
      if (!wpTales.length) {
        return null;
      }

      return WordPressAdapter.toTale(wpTales[0]);
    } catch (error) {
      console.error(`Error fetching tale with slug ${slug}:`, error);
      throw error;
    }
  }
}