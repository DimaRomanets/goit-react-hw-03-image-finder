import React from 'react';
import { Component } from 'react';
import Searchbar from '../SearchBar/SearchBar';
import Modal from '../Modal/Modal';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { fetchImage } from '../../services/api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { toast, ToastContainer } from 'react-toastify';
import { Container } from './App.styled';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    loading: false,
    largeImageURL: '',
    totalHits: 0,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery === this.state.searchQuery &&
      prevState.page === this.state.page
    ) {
      return;
    }
    this.setState({ loading: true });

    try {
      const [images, totalHits] = await fetchImage(
        this.state.searchQuery,
        this.state.page
      );
      this.setState({
        images: [...(this.state.page === 1 ? [] : prevState.images), ...images],
        totalHits,
      });
    } catch (error) {
      this.setState({ loading: false });
      return toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    this.setState({ loading: false });
  }

  

  closeModal = () => {
    this.setState({
      largeImageURL: '',
    });
  };

  hasMoreImages = () => {
    return this.state.totalHits / 12 > this.state.page;
  };

  dropImages = () => {
    this.setState({
      images: [],
      page: 1,
    });
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  showModal = largeImageURL => {
    this.setState({
      largeImageURL: largeImageURL,
    });
  };

  handleFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
    });
  };

  render() {
    const { images, loading } = this.state;
    return (
      <Container>
        <Searchbar
          onSubmit={this.handleFormSubmit}
          dropImages={this.dropImages}
        />
        <ImageGallery images={this.state.images} handleClick={this.showModal} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {this.state.largeImageURL.length > 0 && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            handleKeyDown={this.handleKeyDown}
            closeModal={this.closeModal}
          />
        )}
        {images.length !== 0 && this.hasMoreImages() && (
          <Button handleClick={this.incrementPage} />
        )}
        {loading && <Loader />}
      </Container>
    );
  }
}
