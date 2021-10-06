import { Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const NonLandingPages = () => {
    return (
        <section className="container">
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
            </Switch>
        </section>
    );
}

export default NonLandingPages;