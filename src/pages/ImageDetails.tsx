import {
  ArrowBack,
  ChatBubbleOutline,
  CloudDownload,
  ErrorOutline,
  Favorite,
  Visibility,
} from '@mui/icons-material';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import useImages from '../hooks/useImages';

const ImageDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { images, isLoading } = useImages({ id });

  const image = images.find((img) => img.id.toString() === id);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (!image) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <ErrorOutline color="error" fontSize="large" />
        <Typography variant="h6" color="error">
          Image not found
        </Typography>
      </Box>
    );
  }

  const options = image.tags.split(',').map((tag) => tag.trim());

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        {/* Back Button */}
        <Grid item>
          <Button onClick={() => navigate(-1)}>
            <ArrowBack />
          </Button>
        </Grid>

        {/* User Information */}
        <Grid item>
          <Box display="flex" alignItems="center">
            <Avatar
              src={image.userImageURL}
              alt={image.user}
              sx={{ width: 40, height: 40 }}
            />
            <Typography ml={2} variant="h6">
              {image.user}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Image */}
      <Paper elevation={3} sx={{ mb: 2, overflow: 'hidden' }}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          style={{ width: '100%', display: 'block' }}
        />
      </Paper>

      {/* Tags */}
      <Box my={2}>
        <Autocomplete
          id="multiple-limit-tags"
          multiple
          options={options}
          defaultValue={options}
          disabled
          filterOptions={(options) => options}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField {...params} label="Tags" placeholder="Tags" />
          )}
        />
      </Box>

      {/* Image Details */}
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <Box display="flex">
            <Favorite color="error" sx={{ mr: 1 }} />
            <Typography variant="body1">{image.likes}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box display="flex">
            <Visibility color="action" sx={{ mr: 1 }} />
            <Typography variant="body1">{image.views}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box display="flex">
            <CloudDownload color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">{image.downloads}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box display="flex">
            <ChatBubbleOutline color="secondary" sx={{ mr: 1 }} />
            <Typography variant="body1">{image.comments}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageDetails;
