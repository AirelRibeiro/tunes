import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../style/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      carregando: true,
    };
  }

  componentDidMount() {
    this.renderHeader();
  }

  renderHeader = async () => {
    const user = await getUser();
    const { name } = user;
    this.setState({
      name,
    }, () => this.setState({
      carregando: false,
    }));
  }

  render() {
    const { name, carregando } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>

        {carregando ? <Carregando />
          : <h1 data-testid="header-user-name" className="name">{ name }</h1>}

      </header>
    );
  }
}

export default Header;
