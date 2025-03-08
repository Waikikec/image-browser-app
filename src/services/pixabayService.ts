import axios from 'axios';
import { Image } from '../types';

const API_KEY = import.meta.env.VITE_APP_PIXABAY_API_KEY;
const BASE_URL = 'https://pixabay.com/api/';

export interface FetchImageParams {
  query?: string;
  category?: string;
  page?: number;
  per_page?: number;
  safesearch?: boolean;
}

// EXAMPLE from documentation:
// https://pixabay.com/api/?key=49191738-faa77380f7c2d7e7c3ecc6aaa&q=yellow+flowers&image_type=photo

export const fetchImages = async (
  params: FetchImageParams
): Promise<Image[]> => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: params.query,
      category: params.category,
      page: params.page || 1,
      per_page: params.per_page || 20,
      safesearch: params.safesearch || false,
      image_type: 'photo',
    },
  });

  return response.data.hits;
};
