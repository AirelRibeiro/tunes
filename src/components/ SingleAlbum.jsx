import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SingleAlbum extends React.Component {
  render() {
    const { album, image, id } = this.props;
    return (
      <div className="album">
        <h3>{ album }</h3>
        <img src={ image } alt={ album } />
        <Link
          data-testid={ `link-to-album-${id}` }
          to={ `/album/${id}` }
        >
          Mais informações
        </Link>
      </div>
    );
  }
}

SingleAlbum.propTypes = {
  album: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default SingleAlbum;
