import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmitHendler }) => {
  const [state, setState] = useState({
    imgName: '',
  });

  const onInputHendler = e => {
    setState({ imgName: e.currentTarget.value });
  };

  const SubmitHendler = e => {
    e.preventDefault();
    onSubmitHendler(state.imgName);
    setState({ imgName: '' });
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
          value={state.imgName}
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
