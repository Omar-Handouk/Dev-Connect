import { useState } from 'react';
import RegisterUI from './RegisterUI';

const Register = () => {

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
            alert('Password do not match');
        } else {
            alert('Success');
            console.info({ name, email, password, confirmPassword });
        }
    };

    return (
        <RegisterUI {...formData} onChange={onChange} onSubmit={onSubmit}/>
    );
}

export default Register;
