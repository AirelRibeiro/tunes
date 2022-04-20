import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './components/MusicCard';

class FavoritesSongs extends React.Component {
  render() {
    const { favorites, func } = this.props;
    return (
      <div>
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
    );
  }
}

FavoritesSongs.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  func: PropTypes.func.isRequired,
};

export default FavoritesSongs;
