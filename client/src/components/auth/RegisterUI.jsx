import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const RegisterUI = (props) => {

    const { name, email, password, confirmPassword, onChange, onSubmit } = props;
    
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>

            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

            <form className="form" onSubmit={e => onSubmit(e)}>

                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        required
                        value={name} 
                        onChange={e => onChange(e)}/>
                </div>

                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
                        required
                        value={email} 
                        onChange={e => onChange(e)}/>
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        required
                        value={password} 
                        onChange={e => onChange(e)}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        minLength="6"
                        required
                        value={confirmPassword} 
                        onChange={e => onChange(e)}
                    />
                </div>

                <input type="submit" className="btn btn-primary" value="Register" />

            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    );
};

export default RegisterUI;