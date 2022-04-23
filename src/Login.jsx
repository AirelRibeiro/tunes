import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Carregando from './Carregando';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      carregando: false,
      respondido: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
    });
  }

  funcaoAuxiliar = async () => {
    this.setState({ carregando: true });
    const { name } = this.state;
    const user = { name };
    await createUser(user);
    this.setState({
      carregando: false,
      respondido: true,
    });
  }

  render() {
    const { name, carregando, respondido } = this.state;
    const tres = 3;
    return (
      <div data-testid="page-login" className="login">
        <input
          data-testid="login-name-input"
          value={ name }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ name.length < tres }
          onClick={ this.funcaoAuxiliar }
        >
          Entrar
        </button>
        { carregando && <Carregando /> }
        { respondido && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
