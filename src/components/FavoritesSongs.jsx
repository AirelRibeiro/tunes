import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import '../style/Favorites.css';

class FavoritesSongs extends React.Component {
  render() {
    const { favorites, func } = this.props;
    return (
      <>
        <div>
          {favorites.length === 0 && <h1>Você ainda não tem músicas favoritadas!</h1>}
        </div>
        <div className="songs">
          {favorites
            .map((song) => (
              <MusicCard
                key={ song.trackId }
                music={ song.previewUrl }
                musicName={ song.trackName }
                id={ song.trackId }
                song={ song }
                favorite={ favorites.some((fv) => fv.trackId === song.trackId) }
                teste={ func }
              />))}
        </div>

      </>
    );
  }
}

FavoritesSongs.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  func: PropTypes.func.isRequired,
};

export default FavoritesSongs;
