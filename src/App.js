import React from 'react'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core'
import Home from './components/Home/Home';
import PostDetails from './components/PostDetails/PostDetails';

import './App.css';
import Auth from './components/Auth/Auth';

function App() {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Router>
      <Container maxWidth='xl'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' />} />
          <Route path='/posts' excat component={Home} />
          <Route path='/posts/search' excat component={Home} />
          <Route path='/post/:id' excat component={PostDetails} />
          <Route path='/auth' exact component={() => (!user ? <Auth /> : <Redirect to='/' />)} />
        </Switch>


      </Container>
    </Router>
  );
}

export default App;
