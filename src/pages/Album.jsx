import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../style/Album.css';

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
      <div>
        <Header />
        {(respondido && !favoritePickUp)
            && (
              <div>
                <div className="artist_album_div">
                  <h2>{ `Artista: ${artist}` }</h2>
                  <h2>{ `Album: ${collection}` }</h2>
                </div>
                <div className="songs">
                  <div>
                    <img
                      className="album-image"
                      src={
                        `${(album[0].artworkUrl100).split('jpg/')[0]}jpg/400x400bb.jpg`
                      }
                      alt={ album }
                    />
                  </div>
                  <div>
                    {album
                      .map((song) => (
                        <MusicCard
                          key={ song.trackId }
                          music={ song.previewUrl }
                          musicName={ song.trackName }
                          id={ song.trackId }
                          song={ song }
                          favorite={ favorites.some((fv) => fv.trackId === song.trackId) }
                          teste={ () => console.log('Ser???') }
                        />))}
                  </div>
                </div>
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
