import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ onToggleModal, children }) => {
  const onClickHehdler = e => {
    if (e.target === e.currentTarget) {
      onToggleModal();
    }
  };
  const onEscClose = useCallback(
    e => {
      if (e.code === 'Escape') {
        onToggleModal();
      }
    },
    [onToggleModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', onEscClose);

    return () => {
      window.removeEventListener('keydown', onEscClose);
    };
  }, [onEscClose]);
  return (
    <div className={css.overlay} onClick={onClickHehdler}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
