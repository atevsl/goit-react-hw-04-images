import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);
  const onToggleModal = () => {
    setShowModal(prevshowModal => !prevshowModal);
  };
  return (
    <>
      <li className={css.ImageGalleryItem} onClick={onToggleModal}>
        <img
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItemImage}
        />
      </li>
      {showModal && (
        <Modal onToggleModal={onToggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
