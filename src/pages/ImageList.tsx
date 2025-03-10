import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import ImageCard from '../components/ImageCard';
import SearchBar from '../components/SearchBar';
import useImages from '../hooks/useImages';
import {
  categoryOptions,
  colorOptions,
  editorOptions,
  imageTypeOptions,
  orderOptions,
  orientationOptions,
} from '../types';

const ImageList = () => {
  const [searchText, setSearchText] = useState<string>('');

  const [query, setQuery] = useState<string>('');
  const [imageType, setImageType] = useState<string>(imageTypeOptions[0]);
  const [orientation, setOrientation] = useState<string>(orientationOptions[0]);
  const [category, setCategory] = useState<string | null>(null);
  const [colors, setColors] = useState<string | null>(null);
  const [editorsChoice, setEditorsChoice] = useState<string>(editorOptions[0]);
  const [order, setOrder] = useState<string>(orderOptions[0]);

  const { images, isLoading, error, loadMore } = useImages({
    query,
    safesearch: true,
    image_type: imageType,
    orientation,
    category,
    colors,
    editors_choice: editorsChoice === 'Yes',
    order,
  });

  const handleSearch = () => setQuery(searchText);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Pixabay Image Browser
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={8} lg={10}>
          <SearchBar value={searchText} onChange={setSearchText} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Button
            size="large"
            variant="outlined"
            fullWidth
            onClick={handleSearch}
            sx={{ padding: 1.7 }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} my={2}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Autocomplete
            options={imageTypeOptions}
            defaultValue={imageTypeOptions[0]}
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label="Image Type" />
            )}
            value={imageType}
            onChange={(_: SyntheticEvent, newValue: string) => {
              setImageType(newValue);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Autocomplete
            options={orientationOptions}
            defaultValue={orientationOptions[0]}
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label="Orientation" />
            )}
            value={orientation}
            onChange={(_: SyntheticEvent, newValue: string) => {
              setOrientation(newValue);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Autocomplete
            options={categoryOptions}
            renderInput={(params) => <TextField {...params} label="Category" />}
            value={category}
            onChange={(_: SyntheticEvent, newValue: string | null) => {
              setCategory(newValue);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Autocomplete
            options={colorOptions}
            renderInput={(params) => <TextField {...params} label="Colors" />}
            value={colors}
            onChange={(_: SyntheticEvent, newValue: string | null) => {
              setColors(newValue);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Autocomplete
            options={editorOptions}
            defaultValue={editorOptions[0]}
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label="Editors Choice" />
            )}
            value={editorsChoice}
            onChange={(_: SyntheticEvent, newValue: string) => {
              setEditorsChoice(newValue);
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Autocomplete
            options={orderOptions}
            defaultValue={orderOptions[0]}
            disableClearable
            renderInput={(params) => <TextField {...params} label="Order" />}
            value={order}
            onChange={(_: SyntheticEvent, newValue: string) => {
              setOrder(newValue);
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="body1">
        Click on an image to view its details.
      </Typography>

      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && <Typography color="error">Error fetching images.</Typography>}

      <Grid container spacing={2}>
        {images.map((img, index) => (
          <Grid item key={`${img.id}-${index}`} xs={12} sm={6} md={4} lg={3}>
            <ImageCard image={img} />
          </Grid>
        ))}
      </Grid>

      {!isLoading && images.length > 0 && (
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
      )}
    </div>
  );
};

export default ImageList;
