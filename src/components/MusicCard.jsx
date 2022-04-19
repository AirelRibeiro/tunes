import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      check: false,
      carregando: false,
    };
  }

  componentDidMount() {
    const { favorite } = this.props;
    this.auxiliarDeAtualizacao(favorite);
  }

  auxiliarDeAtualizacao = (valor) => {
    console.log(valor);
    this.setState({
      check: valor,
    });
  }

  handleChange = ({ target }, msc) => {
    const { checked } = target;
    this.setState({
      check: checked,
      carregando: true,
    }, () => this.favoriteSong(msc));
  }

  favoriteSong = async (music) => {
    const { check } = this.state;
    if (check) {
      await addSong(music);
      this.setState({ carregando: false });
    } else {
      await removeSong(music);
      this.setState({ carregando: false });
    }
  }

  render() {
    const { music, musicName, id, song } = this.props;
    const { check, carregando } = this.state;
    return (
      <div>
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ music } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            name="favorite"
            type="checkbox"
            data-testid={ `checkbox-music-${id}` }
            checked={ check }
            onChange={ (event) => this.handleChange(event, song) }
          />
        </label>
        {carregando && <Carregando />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  musicName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  song: PropTypes.objectOf(PropTypes.any).isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default MusicCard;
