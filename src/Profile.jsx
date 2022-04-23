import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Carregando from './Carregando';
import { getUser } from './services/userAPI';
import './Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: false,
      user: {},
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ carregando: true });
    const user = await getUser();
    this.setState({
      user,
    }, () => this.setState({ carregando: false }));
  }

  render() {
    const { carregando, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          {carregando
            ? <Carregando /> : (
              <div className="profile">
                <div className="name-img">
                  <h1>{user.name}</h1>
                  <img
                    src={ user.image }
                    alt={ user.name }
                    data-testid="profile-image"
                  />
                </div>
                <div className="perso-information">
                  <h3>{user.email}</h3>
                  <h4>{user.description}</h4>
                </div>
              </div>
            )}
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
  }
}

export default Profile;
