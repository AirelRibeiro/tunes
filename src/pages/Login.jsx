import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import '../style/Login.css';
import song from '../images/song.png';

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
      <>
        {carregando && <Carregando />}
        {respondido && <Redirect to="/search" />}
        <div className="div_song">
          <img src={ song } alt="song" />
          <h1 className="title">Tu-Tu-Tunes</h1>
          <img src={ song } alt="song" />
        </div>
        <div className="login">
          <input
            value={ name }
            onChange={ this.handleChange }
            placeholder="Insira seu nome"
          />
          <button
            type="button"
            disabled={ name.length < tres }
            onClick={ this.funcaoAuxiliar }
          >
            Entrar
          </button>
        </div>
      </>
    );
  }
}

export default Login;
