import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { FetchImageParams, fetchImages } from '../services/pixabayService';
import { Image } from '../types';

const useImages = (params: FetchImageParams) => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(params.page || 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [
    params.query,
    params.image_type,
    params.orientation,
    params.category,
    params.colors,
    params.editors_choice,
    params.order,
  ]);

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      try {
        const fetchedImages = await fetchImages({ ...params, page });
        setImages((prev) =>
          page === 1 ? fetchedImages : [...prev, ...fetchedImages]
        );
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

    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.query,
    params.image_type,
    params.orientation,
    params.category,
    params.colors,
    params.editors_choice,
    params.order,
    page,
  ]);

  const loadMore = () => setPage((prev) => prev + 1);

  return { images, isLoading, error, loadMore };
};

export default useImages;
