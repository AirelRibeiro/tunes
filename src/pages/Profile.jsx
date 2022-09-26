import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';
import '../style/Profile.css';

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
      <div>
        <Header />
        <div>
          {carregando
            ? <Carregando /> : (
              <div className="profile-page">
                <div className="img">
                  <img
                    src={ user.image }
                    alt={ user.name }
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
