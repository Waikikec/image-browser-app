import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import ImageCard from '../components/ImageCard';
import SearchBar from '../components/SearchBar';
import useImages from '../hooks/useImages';

const ImageList = () => {
  const [searchText, setSearchText] = useState<string>('');
  const { images, isLoading, error, loadMore } = useImages({
    query: searchText,
    safesearch: true,
  });

  console.log('Rendering ImageList with searchText:', searchText);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Pixabay Image Browser
      </Typography>

      <SearchBar value={searchText} onChange={setSearchText} />

      <Typography variant="body1">
        Click on an image to view its details.
      </Typography>

      {isLoading && <CircularProgress />}

      {error && <Typography color="error">Error fetching images.</Typography>}

      <Grid container spacing={2}>
        {images.map((img, index) => (
          <Grid item key={`${img.id}-${index}`} xs={12} sm={6} md={4} lg={3}>
            <ImageCard image={img} />
          </Grid>
        ))}
      </Grid>

      <Box my={2}>
        <Button
          variant="outlined"
          fullWidth
          loading={isLoading}
          onClick={loadMore}
        >
          Load More
        </Button>
      </Box>
    </div>
  );
};

export default ImageList;
