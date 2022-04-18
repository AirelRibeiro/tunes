import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from '../Carregando';

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
        {carregando ? <Carregando /> : <h1 data-testid="header-user-name">{ name }</h1>}
      </header>
    );
  }
}

export default Header;
