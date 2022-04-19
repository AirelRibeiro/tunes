import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import getMusics from './services/musicsAPI';
import MusicCard from './components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      respondido: false,
      artist: '',
      collection: '',
    };
  }

  componentDidMount() {
    this.getMusic();
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
    const { album, respondido, artist, collection } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {respondido
            && (
              <div>
                <h1 data-testid="artist-name">{ artist }</h1>
                <h2 data-testid="album-name">{ collection }</h2>
                {album
                  .map(({ trackName, previewUrl }) => (
                    <MusicCard
                      key={ trackName }
                      music={ previewUrl }
                      musicName={ trackName }
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
