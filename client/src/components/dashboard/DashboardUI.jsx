import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import Experience from './Experience';
import Education from './Education';

const DashboardUI = ({ user, profile, deleteAccount, deleteExperience, deleteEducation }) => {
    
    return (
        <Fragment>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>

            {profile ?

                <Fragment>
                    <div className="dash-buttons">
                        <Link to="/edit-profile" className="btn btn-light"><i className="fas fa-user-circle text-primary"></i>{' '}Edit Profile</Link>
                        <Link to="/add-experience" className="btn btn-light"><i className="fab fa-black-tie text-primary"></i>{' '}Add Experience</Link>
                        <Link to="/add-education" className="btn btn-light"><i className="fas fa-graduation-cap text-primary"></i>{' '}Add Education</Link>
                    </div>

                    <h2 className="my-2">Experience Credentials</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th className="hide-sm">Title</th>
                                <th className="hide-sm">Years</th>
                                <th hidden />
                            </tr>
                        </thead>
                        <tbody>
                            {profile.experience.map(exp => <Experience key={exp._id} { ...exp } deleteExperience={deleteExperience} />)}
                        </tbody>
                    </table>

                    <h2 className="my-2">Education Credentials</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>School</th>
                                <th className="hide-sm">Degree</th>
                                <th className="hide-sm">Years</th>
                                <th hidden />
                            </tr>
                        </thead>
                        <tbody>
                            {profile.education.map(exp => <Education key={exp._id} { ...exp } deleteEducation={deleteEducation} />)}
                        </tbody>
                    </table>

                    <div className="my-2">
                        <button className="btn btn-danger" onClick={deleteAccount}>
                            <i className="fa-regular fa-trash-can"></i>
                            {' '}
                            Delete My Account
                        </button>
                    </div>
                </Fragment>

                :

                <Fragment>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>
            }
        </Fragment>
    )
}

DashboardUI.propTypes = {
    user: PropTypes.object,
    profile: PropTypes.object,
    deleteAccount: PropTypes.func.isRequired,
    deleteExperience: PropTypes.func.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default DashboardUI