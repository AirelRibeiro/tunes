import React from 'react';
import Header from './components/Header';
import { getFavoriteSongs } from './services/favoriteSongsAPI';
import Carregando from './Carregando';
import FavoritesSongs from './FavoritesSongs';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      favoritePickUp: false,
      favorites: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ carregando: true });
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
    }, () => this.setState({
      favoritePickUp: true,
      carregando: false,
    }));
  }

  render() {
    const { favorites, favoritePickUp, carregando } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {carregando && <Carregando />}
        <div>
          {favoritePickUp
            && (
              <FavoritesSongs
                favorites={ favorites }
                func={ () => this.getFavorites() }
              />
            )}
        </div>
      </div>
    );
  }
}

export default Favorites;
