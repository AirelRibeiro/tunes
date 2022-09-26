import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import '../style/Album.css';

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
      const { teste } = this.props;
      teste();
    }
  }

  render() {
    const { music, musicName, id, song } = this.props;
    const { check, carregando } = this.state;
    return (
      <div className="song">
        <p>{ musicName }</p>
        <div>
          <audio src={ music } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ id }>
            Favorita
            <input
              id={ id }
              type="checkbox"
              checked={ check }
              onChange={ (event) => this.handleChange(event, song) }
            />
          </label>
        </div>
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
  teste: PropTypes.func,
};

MusicCard.defaultProps = {
  teste: console.log('Testou'),
};

export default MusicCard;
