import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { logout } from '../../actions/authAction';

const Navbar = ({ logout, isAuthenticated, isLoading }) => {

    const authLinks = (
        <Fragment>
            <ul>
                <li>
                    <a onClick={logout} href="#!"><i className="fas fa-sign-out-alt"></i> {' '} <span className='hide-sm'> Logout </span> </a>
                </li>
            </ul>
        </Fragment>);

    const guestLinks = (
        <Fragment>
            <ul>
                <li><a href="#!">Developer</a></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
            </ul>
        </Fragment>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {!isLoading && (isAuthenticated ? authLinks : guestLinks)}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);