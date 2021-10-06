import { useState } from 'react';
import LoginUI from "./LoginUI";

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        alert('Success');
        console.info({ email, password });
    }

    return (
        <LoginUI {...formData} onChange={onChange} onSubmit={onSubmit} />
    );
}

export default Login
