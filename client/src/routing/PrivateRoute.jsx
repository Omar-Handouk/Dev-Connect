import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';
import Spinner from '../components/layout/Spinner';

export const PrivateRoute = ({ component: Component, isAuthenticated, isLoading, ...rest }) => {
    return (
        <div>
            <Route {...rest} render={props => isLoading ? <Spinner /> : isAuthenticated ? <Component {...props} /> : <Redirect to='/login' /> } />
        </div>
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
