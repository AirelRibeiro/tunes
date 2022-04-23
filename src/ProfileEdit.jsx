import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from './services/userAPI';
import UserForm from './UserForm';
import './Profile.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      respondido: false,
      button: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  componentDidMount() {
    this.getUser();
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { state } = this;
      this.checkLength(state);
    });
  }

  getUser = async () => {
    this.setState({ carregando: true });
    const user = await getUser();
    const { name, email, description, image } = user;
    this.setState({
      name,
      email,
      description,
      image,
    }, () => {
      const { state } = this;
      this.checkLength(state);
      this.setState({ carregando: false });
    });
  }

  saveUser = async () => {
    this.setState({ carregando: true });
    const { name, email, description, image } = this.state;
    const user = {
      name,
      email,
      image,
      description,
    };
    await updateUser(user);
    this.setState({
      carregando: false,
      respondido: true,
    });
  }

  checkLength = ({ name, email, description, image }) => {
    if (!name || !email || !description || !image) {
      console.log(false);
      return false;
    }
    const N = name.length > 0;
    const E = email.length > 0;
    const D = description.length > 0;
    const I = image.length > 0;
    if (N && E && D && I && email.includes('@')) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  render() {
    const {
      carregando, respondido, button, name, email, description, image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {carregando
          ? <Carregando />
          : (
            <>
              <UserForm
                name={ name }
                email={ email }
                description={ description }
                image={ image }
                changeFunction={ this.handleChange }
                saveFunction={ this.saveUser }
                but={ button }
              />
              <h3>Visualização Prévia:</h3>
              <div className="profile">
                <div className="name-img">
                  <h1>{ name }</h1>
                  <img
                    src={ image }
                    alt={ name }
                  />
                </div>
                <div className="perso-information">
                  <h3>
                    Email:
                    {' '}
                    {email}
                  </h3>
                  <h4>
                    Descrição:
                    {' '}
                    {description}
                  </h4>
                </div>
              </div>

            </>
          )}
        { respondido && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
