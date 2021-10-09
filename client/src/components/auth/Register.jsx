import { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { setAlertWithTimeout } from '../../actions/alertAction';
import { registerAsync } from '../../actions/authAction';
import RegisterUI from './RegisterUI';

const Register = ({ setAlertWithTimeout, registerAsync, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        if (password !== confirmPassword) {
           setAlertWithTimeout('Password do not match', 'danger');
        } else {
            registerAsync({name, email, password});
        }
    };

    if (isAuthenticated) return (<Redirect to='/dashboard' />);

    return (
        <RegisterUI {...formData} onChange={onChange} onSubmit={onSubmit}/>
    );
}

Register.propTypes = {
    setAlertWithTimeout: PropTypes.func.isRequired,
    registerAsync: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlertWithTimeout, registerAsync })(Register);
