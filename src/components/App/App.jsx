import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Searchbar from '../Searchbar/Searchbar';
import Oops from 'components/Oops/Oops';
import css from './App.module.css';
import onFetchHendler from '../../services/onFetchHendler';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  const [imgSearchName, setImgSearchName] = useState('');
  const [imgsToDisplay, setImgsToDisplay] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [total, setTotal] = useState(0);

  const totalPage = imgsToDisplay.length / (page * total);

  const onLoadMoreHendler = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSubmitHendler = SearchName => {
    setImgSearchName(SearchName);
    setPage(1);
    setImgsToDisplay([]);
    setStatus(Status.PENDING);
  };

  useEffect(() => {
    if (!imgSearchName) {
      setStatus(Status.IDLE);
      return;
    }
    setStatus(Status.PENDING);
    onFetchHendler(imgSearchName, page)
      .then(data => {
        if (data.total === 0) {
          setStatus(Status.REJECTED);
          return;
        }
        setImgsToDisplay(prevdata => [...prevdata, ...data.hits]);
        setTotal(data.totalHits);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
      });
  }, [imgSearchName, page]);

  return (
    <div className={css.AppWrap}>
      <Searchbar onSubmitHendler={onSubmitHendler}></Searchbar>

      {imgsToDisplay.length > 0 && (
        <ImageGallery imgsToDisplay={imgsToDisplay}></ImageGallery>
      )}
      {status === 'pending' && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Loader></Loader>
        </div>
      )}
      {status === 'rejected' && <Oops imgSearchName={imgSearchName}></Oops>}
      {totalPage < 1 && status === 'resolved' && (
        <Button onLoadMoreHendler={onLoadMoreHendler}></Button>
      )}
    </div>
  );
};

export default App;
