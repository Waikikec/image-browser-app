import { Avatar, Box, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import useImages from '../hooks/useImages';

const ImageDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { images } = useImages({});
  const image = images.find((img) => img.id.toString() === id);

  if (!image) {
    return <Typography>Image not found.</Typography>;
  }

  return (
    <Box>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <img
        src={image.webformatURL}
        alt={image.tags}
        style={{ width: '100%' }}
      />
      <Typography variant="h6" gutterBottom>
        {image.tags}
      </Typography>

      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src={image.userImageURL} alt={image.user} />
        <Typography ml={1}>{image.user}</Typography>
      </Box>
      <Typography>Likes: {image.likes}</Typography>
      <Typography>Views: {image.views}</Typography>
      <Typography>Downloads: {image.downloads}</Typography>
      <Typography>Comments: {image.comments}</Typography>
    </Box>
  );
};

export default ImageDetails;
