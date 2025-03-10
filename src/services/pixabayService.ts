import axios from 'axios';
import { Image } from '../types';

const API_KEY = import.meta.env.VITE_APP_PIXABAY_API_KEY;
const BASE_URL = 'https://pixabay.com/api/';

export interface FetchImageParams {
  query?: string;
  image_type?: string;
  orientation?: string;
  category?: string | null;
  colors?: string | null;
  editors_choice?: boolean;
  order?: string;
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
      image_type: params.image_type,
      orientation: params.orientation,
      category: params.category,
      colors: params.colors,
      editors_choice: params.editors_choice,
      order: params.order,
      page: params.page || 1,
      per_page: params.per_page || 20,
      safesearch: params.safesearch || false,
    },
  });

  return response.data.hits;
};
