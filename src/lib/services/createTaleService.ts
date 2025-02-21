
import { TaleService } from './tales.service';

export function createTaleService() {
  if (!process.env.WP_API_URL || !process.env.WP_API_KEY) {
    throw new Error('WordPress API configuration is missing');
  }

  return new TaleService(process.env.WP_API_URL, process.env.WP_API_KEY);
}