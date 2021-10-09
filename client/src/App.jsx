import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { loadUserAsync } from './actions/authAction';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import NonLandingPages from './NonLandingPages';
import './App.css';

// Check if a token is in storage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ loadUserAsync }) => {
  // For every re-mount of any component, fetch user data
  useEffect(() => loadUserAsync()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , []);

  return (
    <Router>
      <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <NonLandingPages />
        </Switch>
    </Router>
  );
}

App.propTypes = {
  loadUserAsync: PropTypes.func.isRequired,
};

export default connect(null, { loadUserAsync })(App);
