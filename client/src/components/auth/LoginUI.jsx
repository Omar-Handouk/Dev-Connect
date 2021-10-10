import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LoginUI = (props) => {

    const { email, password, onChange, onSubmit } = props;

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>

            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>

            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>

            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment >
    )
};

export default LoginUI;