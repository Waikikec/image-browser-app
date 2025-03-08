import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { Image } from '../types';

interface ImageCardProps {
  image: Image;
}

const ImageCard = ({ image }: ImageCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${image.id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image={image.previewURL}
          alt={image.tags}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            Likes: {image.likes}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ImageCard;
