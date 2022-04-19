import React from 'react';
import PropTypes from 'prop-types';
import SingleAlbum from './ SingleAlbum';

class SetOfAlbums extends React.Component {
  render() {
    const { array, artist } = this.props;
    return (
      array.length <= 0 ? <h1>Nenhum álbum foi encontrado</h1> : (
        <section>
          <h1>
            Resultado de álbuns de:
            {' '}
            {artist}
          </h1>
          {array
            .map(({ collectionId, collectionName, artworkUrl100 }) => (
              <SingleAlbum
                key={ collectionId }
                id={ collectionId }
                album={ collectionName }
                image={ artworkUrl100 }
              />
            ))}
        </section>
      )
    );
  }
}

SetOfAlbums.propTypes = {
  array: PropTypes.arrayOf(PropTypes.object).isRequired,
  artist: PropTypes.string.isRequired,
};

export default SetOfAlbums;
