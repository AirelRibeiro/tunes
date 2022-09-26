import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './components/Search';
import Album from './pages/Album';
import Favorites from './components/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />

        <Route path="/search" component={ Search } />

        <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />

        <Route path="/favorites" component={ Favorites } />

        <Route exact path="/profile" component={ Profile } />

        <Route exact path="/profile/edit" component={ ProfileEdit } />

        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default App;
