import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';

const Searchbar = ({ onSubmitHendler }) => {
  const [imgName, setImgName] = useState('');

  const onInputHendler = e => {
    setImgName(e.currentTarget.value);
  };

  const SubmitHendler = e => {
    e.preventDefault();
    if (imgName.trim() === '') {
      return Notiflix.Notify.failure('Please type search and try again.');
    }
    onSubmitHendler(imgName);
    setImgName('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={SubmitHendler}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imgName}
          onChange={onInputHendler}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmitHendler: PropTypes.func.isRequired,
};

export default Searchbar;
