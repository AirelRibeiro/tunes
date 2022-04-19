import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from './services/musicsAPI';
import MusicCard from './components/MusicCard';
import { getFavoriteSongs } from './services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      respondido: false,
      artist: '',
      collection: '',
      favorites: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
    this.getMusic();
  }

  getFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
    });
  }

  getMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const alb = await getMusics(id);
    const desc = alb[0];
    const artist = desc.artistName;
    const collection = desc.collectionName;
    const album = alb.filter((_musics, index) => index !== 0);
    this.setState({
      album,
      artist,
      collection,
      respondido: true,
    });
  }

  render() {
    const { album, respondido, artist, collection, favorites } = this.state;
    console.log(favorites);
    return (
      <div data-testid="page-album">
        <Header />
        {(respondido && favorites.length > 0)
            && (
              <div>
                <h1 data-testid="artist-name">{ artist }</h1>
                <h2 data-testid="album-name">{ collection }</h2>
                {album
                  .map((song) => (
                    <MusicCard
                      key={ song.trackId }
                      music={ song.previewUrl }
                      musicName={ song.trackName }
                      id={ song.trackId }
                      song={ song }
                      favorite={ favorites.some((fv) => fv.trackId === song.trackId) }
                    />))}
              </div>
            )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
