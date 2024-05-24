import ImageCard from '../ImageCard/ImageCard.jsx';
import './ImageGallery.css';

const ImageGallery = ({ images, setSelectedImage }) => {
  return (
    <ul className="image-gallery">
      {images.map((image) => (
        <li key={image.id} onClick={() => setSelectedImage(image)}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;