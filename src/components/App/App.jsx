import React from 'react';
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

export class App extends React.Component {
  state = {
    imgSearchName: '',
    imgsToDisplay: [],
    page: 1,
    img: null,
    status: Status.IDLE,
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.imgSearchName !== this.state.imgSearchName ||
      prevState.page !== this.state.page
    ) {
      if (this.state.imgSearchName.trim() === '') {
        return this.setState({ status: Status.REJECTED });
      }
      this.setState({ status: Status.PENDING });
      onFetchHendler(this.state.imgSearchName, this.state.page)
        .then(data => {
          if (data.total === 0) {
            this.setState({ status: Status.REJECTED });
            return;
          }
          this.setState(prevstate => ({
            imgsToDisplay: [...prevstate.imgsToDisplay, ...data.hits],
            total: data.totalHits,
            status: Status.RESOLVED,
          }));
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  onSubmitHendler = imgSearchName => {
    this.setState({
      imgSearchName,
      page: 1,
      imgsToDisplay: [],
    });
  };

  onLoadMoreHendler = () => {
    this.setState(prevstate => ({ page: prevstate.page + 1 }));
  };

  render() {
    const totalPage =
      this.state.imgsToDisplay.length / (this.state.page * this.state.total);
    return (
      <div className={css.AppWrap}>
        <Searchbar onSubmitHendler={this.onSubmitHendler}></Searchbar>

        <ImageGallery imgsToDisplay={this.state.imgsToDisplay}></ImageGallery>
        {this.state.status === 'pending' && (
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
        {this.state.status === 'rejected' && (
          <Oops imgSearchName={this.state.imgSearchName}></Oops>
        )}
        {totalPage < 1 && this.state.status === 'resolved' && (
          <Button onLoadMoreHendler={this.onLoadMoreHendler}></Button>
        )}
      </div>
    );
  }
}
