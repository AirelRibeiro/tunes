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
      favoritePickUp: false,
      artist: '',
      collection: '',
      favorites: [],
    };
  }

  componentDidMount() {
    this.getMusic();
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ favoritePickUp: true });
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
    }, () => this.setState({ favoritePickUp: false }));
  }

  getMusic = async () => {
    this.setState({ favoritePickUp: true });
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
    const {
      album,
      respondido,
      artist,
      collection,
      favorites,
      favoritePickUp } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {(respondido && !favoritePickUp)
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
                      teste={ () => console.log('Será?') }
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
