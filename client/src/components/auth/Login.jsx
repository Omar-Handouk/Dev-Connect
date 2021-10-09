import { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAsync } from '../../actions/authAction';
import PropTypes from 'prop-types'

import LoginUI from "./LoginUI";

const Login = ({ isAuthenticated, loginAsync }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        loginAsync({ email, password });
    }

    if (isAuthenticated) return (<Redirect  to='/dashboard' />);

    return (
        <Fragment>
            <LoginUI {...formData} onChange={onChange} onSubmit={onSubmit} />
        </Fragment>
    );
}

Login.propTypes = {
    loginAsync: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginAsync })(Login);
