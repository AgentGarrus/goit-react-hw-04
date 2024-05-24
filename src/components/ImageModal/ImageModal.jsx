import Modal from 'react-modal';
import './ImageModal.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    overlayClassName="modal-overlay"
    className="modal-content"
  >{image && (
      <div>
        <img className="modal-image" src={image.urls.regular} alt={image.alt_description} />
      </div>
    )}
  </Modal>
);

export default ImageModal;