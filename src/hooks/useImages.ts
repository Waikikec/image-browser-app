import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { FetchImageParams, fetchImages } from '../services/pixabayService';
import { Image } from '../types';

interface UseImagesProps extends FetchImageParams {}

const useImages = (params: UseImagesProps) => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(params.page || 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadImages = async () => {
    console.log('Loading images for page:', page);
    setIsLoading(true);
    try {
      const images = await fetchImages(params);
      setImages((prev) => [...prev, ...images]);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => setPage((prev) => prev + 1);

  useEffect(() => {
    // Reset images when search parameters change
    setImages([]);
    setPage(1);
  }, [params.query, params.category]);

  useEffect(() => {
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.query, params.category]);

  useEffect(() => {
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { images, isLoading, error, loadMore };
};

export default useImages;
