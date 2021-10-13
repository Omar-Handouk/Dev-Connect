import { Switch, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Alert from '../components/layout/Alert';
import Dashboard from '../components/dashboard/Dashboard';
import Profile from '../components/profile-forms/Profile';
import PrivateRoute from '../routing/PrivateRoute';
import AddExperience from '../components/profile-forms/AddExperience';
import AddEducation from '../components/profile-forms/AddEducation';
import Profiles from '../components/profiles/Profiles';
import DeveloperProfile from '../components/developer/DeveloperProfile';

const NonLandingPages = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/profiles' component={Profiles} />
                <Route exact path='/profiles/:id' component={DeveloperProfile} />
                <PrivateRoute  exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/create-profile' component={Profile}/>
                <PrivateRoute exact path='/edit-profile' component={Profile}/>
                <PrivateRoute exact path='/add-experience' component={AddExperience} />
                <PrivateRoute exact path='/add-education' component={AddEducation} />
            </Switch>
        </section>
    );
}

export default NonLandingPages;