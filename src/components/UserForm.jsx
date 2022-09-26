import React from 'react';
import PropTypes from 'prop-types';

class UserForm extends React.Component {
  render() {
    const {
      name, email, description, image, changeFunction, saveFunction, but } = this.props;
    return (
      <form className="profile_form">
        <div>
          <input
            type="text"
            data-testid="edit-input-name"
            name="name"
            value={ name }
            onChange={ changeFunction }
            placeholder="Nome"
          />
          <input
            type="email"
            data-testid="edit-input-email"
            name="email"
            value={ email }
            onChange={ changeFunction }
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="text"
            data-testid="edit-input-image"
            name="image"
            value={ image }
            onChange={ changeFunction }
            placeholder="URL da imagem"
          />
          <input
            type="textarea"
            data-testid="edit-input-description"
            name="description"
            value={ description }
            onChange={ changeFunction }
            placeholder="Descrição"
          />
        </div>
        <button
          type="button"
          data-testid="edit-button-save"
          onClick={ saveFunction }
          disabled={ but }
        >
          Salvar
        </button>
      </form>
    );
  }
}

UserForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  changeFunction: PropTypes.func.isRequired,
  saveFunction: PropTypes.func.isRequired,
  but: PropTypes.bool.isRequired,
};

export default UserForm;
