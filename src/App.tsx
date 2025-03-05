import { useEffect, useState } from 'react';
import { fetchImages, Image } from './services/pixabayService';

function App() {
  const [images, setImages] = useState<Image[]>([]);

  const fetchData = async () => {
    const images = await fetchImages({ query: 'yellow flowers' });
    console.log('🚀 ~ App ~ images:', images);

    setImages(images);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Images</h1>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img src={image.previewURL} alt={image.tags} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
