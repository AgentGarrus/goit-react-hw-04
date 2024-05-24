import { useState } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import Loader from './components/Loader/Loader.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx';
import ImageModal from './components/ImageModal/ImageModal.jsx';
import './App.css';

const UNSPLASH_ACCESS_KEY = 'damSXsYO3haIF3zVdDRjFn4nmJjfuJu9B3PxqRSByT4';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async (searchQuery, pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: searchQuery,
          page: pageNumber,
          client_id: UNSPLASH_ACCESS_KEY,
        },
      });
      setImages((prevImages) =>
        pageNumber === 1 ? response.data.results : [...prevImages, ...response.data.results]
      );
      setError(null);
    } catch (error) {
      setError('Failed to fetch images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    fetchImages(searchQuery, 1);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchImages(query, page + 1);
  };

  return (
    <div className="App">
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} setSelectedImage={setSelectedImage} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onRequestClose={() => setSelectedImage(null)}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default App;