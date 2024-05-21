import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
    {image && (
      <div>
        <img src={image.urls.regular} alt={image.alt_description} />
        <p>{image.description || image.alt_description}</p>
        <p>By: {image.user.name}</p>
        <p>Likes: {image.likes}</p>
      </div>
    )}
  </Modal>
);

export default ImageModal;