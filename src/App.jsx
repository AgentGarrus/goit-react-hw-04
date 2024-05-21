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
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&page=${pageNumber}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      setImages((prevImages) =>
        pageNumber === 1 ? response.data.results : [...prevImages, ...response.data.results]
      );
      setError(null);
    } catch (err) {
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
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  return (
    <div className="App">
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} />
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