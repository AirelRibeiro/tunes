import React from 'react';
import Header from './components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      input: value,
    });
  }

  render() {
    const { input } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          value={ input }
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ input.length < 2 }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
