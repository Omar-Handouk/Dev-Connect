import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createProfile, getCurrentProfile } from '../../actions/profileAction'
import Spinner from '../layout/Spinner';
import ProfileUI from './ProfileUI'

export const Profile = ({ createProfile, getCurrentProfile, profile: { profile, isLoading }, history }) => {
    
    const initialState = {
        company: '',
        website: '',
        location: '',
        title: '',
        skills: '',
        githubUsername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    };

    const [formData, setFormData] = useState(initialState);
    const [displaySocialInputs, setDisplaySocialInputs] = useState(false);

    /*
     * For a particular user, we fetch the profile from the state
     * If the profile is null then this maybe from either of two things
     * 1- A user has yet to create his profile making state.profile.profile null
     * 2- The profile has not yet been fetched from the backend
     * If it is the second case, we should dispatch getCurrentProfile action
     * to fetch this user's profile and pass the props to the UI
     * Effect should depend on the {isLoading, profile, getCurrentProfile}
    */
    useEffect(() => {
        if (!profile) {
            getCurrentProfile();
        }

        if (!isLoading && profile) {
            const profileData = { ...initialState };

            for (const key in profile) {
                if (key in profileData) {
                    profileData[key] = profile[key];
                }
            }

            for (const key in profile.social) {
                if (key in profileData) {
                    profileData[key] = profile.social[key];
                }
            }

            if (Array.isArray(profile.skills)) {
                profileData.skills = profile.skills.join(', ');
            }

            setFormData(profileData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, profile, getCurrentProfile]);
    
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, profile ? true : false);
    };

    return (
        <div>
            {isLoading ? <Spinner /> : 
            <ProfileUI
                hasProfile={profile ? true : false}
                data={formData} 
                displaySocialInputs={displaySocialInputs}
                setDisplaySocialInputs={setDisplaySocialInputs} 
                onChange={onChange} 
                onSubmit={onSubmit} />}
        </div>
    );
}

Profile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile
});

const mapDispatchToProps = {
    createProfile,
    getCurrentProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
