import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { Mock } from 'vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ImageCard from '../components/ImageCard';
import { Image } from '../types';
import ImageList from './ImageList';

const dummyImages = [
  {
    id: 7679117,
    pageURL:
      'https://pixabay.com/photos/flower-stamens-hypericum-macro-7679117/',
    type: 'photo',
    tags: 'flower, stamens, flower wallpaper, beautiful flowers, hypericum, flower background, macro, yellow, flower, yellow, yellow, yellow, nature, yellow, yellow',
    previewURL:
      'https://cdn.pixabay.com/photo/2022/12/26/13/50/flower-7679117_150.jpg',
    previewWidth: 150,
    previewHeight: 100,
    webformatURL:
      'https://pixabay.com/get/gc5a381a185184151775666bd8b6c8ddfa0c1168f1cb479130b5e7912ea5aad03ed77e9ea5d94278d2efc19947b24c6e1d4f699acfc58df257fb41bc44e17a3a2_640.jpg',
    webformatWidth: 640,
    webformatHeight: 427,
    largeImageURL:
      'https://pixabay.com/get/ga6b7319e78ac2adae632f50329c71a833b7eebcfce0ecff233d546a1eea7a18b20096569c1711bc06a18d4692a58cd4809feada944e3120551f37ea3c6df5cf3_1280.jpg',
    imageWidth: 6000,
    imageHeight: 4000,
    imageSize: 8137356,
    views: 27394,
    downloads: 21081,
    collections: 854,
    likes: 122,
    comments: 21,
    user_id: 4379051,
    user: '4379051',
    userImageURL: '',
  },
  {
    id: 6316445,
    pageURL: 'https://pixabay.com/photos/rapeseeds-yellow-flowers-6316445/',
    type: 'photo',
    tags: 'rapeseeds, yellow, beautiful flowers, flowers, yellow flowers, rapeseed field, bloom, flower wallpaper, blossom, flora, nature, yellow, yellow, yellow, yellow, yellow, yellow flowers, flower background, yellow flowers, yellow flowers',
    previewURL:
      'https://cdn.pixabay.com/photo/2021/06/06/21/55/rapeseeds-6316445_150.jpg',
    previewWidth: 150,
    previewHeight: 100,
    webformatURL:
      'https://pixabay.com/get/g215114d3524518c0b7f86ffe74d59873e8de8ba78d6a26f21050dd98afd0dbd9a1b05b400276b4f751d5cfa50ef2eb55c4f575315760fab7c6b4b88fcd7d3e46_640.jpg',
    webformatWidth: 640,
    webformatHeight: 427,
    largeImageURL:
      'https://pixabay.com/get/g8d5adf5795fcce000df93630c388ee6941a4d1d20433f5acc514e41b3b6dfb842a5b57e9a52631548a43fdacbbdf66427f4c5fdd5ba460c123971ee5a4b4404f_1280.jpg',
    imageWidth: 6000,
    imageHeight: 4000,
    imageSize: 7735260,
    views: 38206,
    downloads: 30567,
    collections: 956,
    likes: 88,
    comments: 21,
    user_id: 11378535,
    user: '__Tatius__',
    userImageURL:
      'https://cdn.pixabay.com/user/2020/10/16/11-47-36-873_250x250.jpeg',
  },
];

// Create a mock function for loadMore
const loadMoreMock: Mock = vi.fn();

// The mock function accepts the same parameters as the hook
const useImagesMock = vi.fn(() => {
  return {
    images: [] as Image[],
    isLoading: false,
    error: null as string | null,
    loadMore: vi.fn(),
  };
});

describe('ImageList Component', () => {
  beforeEach(() => {
    // Optionally override the default return value for each test
    // Using vi.mocked to get proper typings for the mocked function.
    const mockedUseImages = vi.mocked(useImagesMock);
    mockedUseImages.mockReturnValue({
      images: [],
      isLoading: false,
      error: null,
      loadMore: vi.fn(),
    });
  });

  it('renders search bar and search button', () => {
    render(<ImageList />);
    const searchInput = screen.getByTestId('searchbar');
    expect(searchInput).toBeInTheDocument();

    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('renders ImageCard correctly', () => {
    render(
      <MemoryRouter>
        <ImageCard image={dummyImages[0] as Image} />
      </MemoryRouter>
    );

    const card = screen.getByTestId('image-card');
    expect(card).toBeInTheDocument();
  });

  it('shows loading spinner when isLoading is true', () => {
    const mockedUseImages = vi.mocked(useImagesMock);
    mockedUseImages.mockReturnValue({
      images: [],
      isLoading: true,
      error: null,
      loadMore: loadMoreMock,
    });

    render(<ImageList />);
    // MUI's CircularProgress renders an element with role "progressbar"
    const progress = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
  });

  it('updates query when search button is clicked', () => {
    const mockedUseImages = vi.mocked(useImagesMock);
    mockedUseImages.mockReturnValue({
      images: [],
      isLoading: false,
      error: null,
      loadMore: loadMoreMock,
    });

    render(<ImageList />);
    const searchInput = screen.getByTestId('searchbar').querySelector('input');

    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: 'cat' } });
      expect(searchInput).toHaveValue('cat');
    } else {
      throw new Error('Search input not found');
    }

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
  });
});
