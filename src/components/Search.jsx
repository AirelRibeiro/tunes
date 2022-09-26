import React from 'react';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';
import SetOfAlbums from './SetOfAlbums';
import '../style/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      artistName: '',
      carregando: false,
      artist: [],
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      artistName: value,
      input: value,
    });
  }

  recoverAlbum = async () => {
    this.setState({ carregando: true });
    const { input } = this.state;
    const artist = await searchAlbumsAPI(input);
    this.setState({
      artist,
    }, () => this.setState({
      carregando: false,
      input: '',
    }));
  }

  render() {
    const { input, artistName, carregando, artist } = this.state;
    return (
      <div className="search">
        <Header />
        <input
          value={ input }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          disabled={ input.length < 2 }
          onClick={ () => this.recoverAlbum() }
        >
          Pesquisar
        </button>
        {
          carregando ? <Carregando />
            : <SetOfAlbums array={ artist } artist={ artistName } />
        }
      </div>
    );
  }
}

export default Search;
