import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import NonLandingPages from './NonLandingPages';
import './App.css';

const App = () => {

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

export default App;
