import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { logoutAndClearProfile } from '../../actions/authAction';

const Navbar = ({ logoutAndClearProfile, isAuthenticated, isLoading }) => {

    const authLinks = (
        <Fragment>
            <ul>
                <li>
                    <Link to="/profiles">
                        <i className="fa-solid fa-terminal"></i>
                        {' '}
                        <span className="hide-sm">Developers</span>
                    </Link>
                </li>

                <li>
                    <a href="#!">
                        <i className="fa-regular fa-message"></i>
                        {' '}
                        <span className="hide-sm">Posts</span>
                    </a>
                </li>

                {' | '}

                <li>
                    <Link to='/dashboard'>
                        <i className="fa-regular fa-user"></i>
                        {' '}
                        <span className="hide-sm">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <a onClick={logoutAndClearProfile} href="#!">
                        <i className="fas fa-sign-out-alt"></i>
                        {' '}
                        <span className='hide-sm'> Logout </span> 
                    </a>
                </li>
            </ul>
        </Fragment>);

    const guestLinks = (
        <Fragment>
            <ul>
                <li>
                    <Link to="/profiles">
                        <i className="fa-solid fa-terminal"></i>
                        {' '}
                        <span className="hide-sm">Developers</span>
                    </Link>
                </li>
                {' | '}
                
                <li>
                    <Link to='/login'>
                        <i className="fas fa-sign-in-alt"></i>
                        {' '}
                        <span className="hide-sm">Login</span>
                    </Link>
                </li>
                
                <li>
                    <Link to='/register'>
                        <i className="fa-solid fa-user-plus"></i>
                        {' '}
                        <span className="hide-sm">Register</span>
                    </Link>
                </li>

            </ul>
        </Fragment>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to={ isAuthenticated ? '/dashboard' : '/' }><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {!isLoading && (isAuthenticated ? authLinks : guestLinks)}
        </nav>
    )
}

Navbar.propTypes = {
    logoutAndClearProfile: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});

const mapDispatchToProps = {
    logoutAndClearProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);