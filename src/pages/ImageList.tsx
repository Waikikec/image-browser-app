import { Grid2, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ImageCard from '../components/ImageCard';
import { fetchImages } from '../services/pixabayService';
import { Image } from '../types';

const ImageList = () => {
  const [images, setImages] = useState<Image[]>([]);

  const fetchData = async () => {
    const images = await fetchImages({ query: 'yellow flowers' });

    setImages(images);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Pixabay Image Browser
      </Typography>

      <Typography variant="body1">
        Click on an image to view its details.
      </Typography>

      <Grid2 container spacing={2}>
        {/* Image details go here */}
        {images.map((img) => (
          <Grid2>
            <ImageCard image={img} />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default ImageList;
