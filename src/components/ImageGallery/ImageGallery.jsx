import ImageCard from '../ImageCard/ImageCard.jsx';

const ImageGallery = ({ images }) => {
  return (
    <ul className="image-gallery">
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;