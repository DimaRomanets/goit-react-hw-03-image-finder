import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  Searchbar,
  SearchForm,
  SearchFormInput,
  SearchFormButton,
} from './SearchBar.styled';

export default class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return toast.error('Please enter some keywords to search.');
    }
    this.props.dropImages();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <Searchbar className="searchbar">
        <SearchForm className="form" onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit" className="button">
            <AiOutlineSearch />
          </SearchFormButton>

          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.searchQuery}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
