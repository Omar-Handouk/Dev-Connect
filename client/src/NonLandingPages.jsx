import { Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

const NonLandingPages = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
            </Switch>
        </section>
    );
}

export default NonLandingPages;