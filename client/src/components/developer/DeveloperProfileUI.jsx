import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

import DeveloperProfileTop from './DeveloperProfileTop';
import DeveloperProfileAbout from './DeveloperProfileAbout';
import DeveloperProfileExperience from './DeveloperProfileExperience';
import DeveloperProfileEducation from './DeveloperProfileEducation';
import DeveloperProfileGithub from './DeveloperProfileGithub';

const DeveloperProfileUI = ({ profile, repos }) => {
    return (
        <div>
            <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>

            <div className="profile-grid my-1">

                <DeveloperProfileTop { ...profile } />

                <DeveloperProfileAbout {  ...profile } />

                <DeveloperProfileExperience { ...profile } />

                <DeveloperProfileEducation  { ...profile } />

                <DeveloperProfileGithub repos={repos} />

            </div>
        </div>
    )
}

DeveloperProfileUI.propTypes = {
    profile: PropTypes.object.isRequired,
    repos: PropTypes.array,
}

export default DeveloperProfileUI
