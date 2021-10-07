import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { setAlertWithTimeout } from '../../actions/alertAction';
import RegisterUI from './RegisterUI';

const Register = (props) => {

    const { setAlertWithTimeout } = props;

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
            alert('Success');
            console.info({ name, email, password, confirmPassword });
        }
    };

    return (
        <RegisterUI {...formData} onChange={onChange} onSubmit={onSubmit}/>
    );
}

Register.propTypes = {
    setAlertWithTimeout: PropTypes.func.isRequired,
}

export default connect(null, { setAlertWithTimeout })(Register);
