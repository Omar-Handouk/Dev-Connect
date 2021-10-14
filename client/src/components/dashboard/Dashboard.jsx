import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount, deleteExperience, deleteEducation } from '../../actions/profileAction';
import Spinner from '../layout/Spinner';
import DashboardUI from './DashboardUI';

export const Dashboard = ({ getCurrentProfile, auth, profile, deleteAccount, deleteExperience, deleteEducation }) => {
    useEffect(() => {
        getCurrentProfile()
    }, [auth.user, getCurrentProfile]);


    const deleteAccountHandler = e => {
        e.preventDefault();
        deleteAccount();
    };

    const deleteExperienceHandler = (e, experienceId) => {
        e.preventDefault();
        deleteExperience(experienceId);
    };

    const deleteEducationHandler = (e, educationId) => {
        e.preventDefault();
        deleteEducation(educationId);
    };

    return (
        <div>
            {profile.isLoading || !profile ? <Spinner /> : 
            <DashboardUI 
                user={auth.user} 
                profile={profile.profile}
                deleteAccount={deleteAccountHandler}
                deleteExperience={deleteExperienceHandler}
                deleteEducation={deleteEducationHandler} />}
        </div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    deleteExperience: PropTypes.func.isRequired,
    deleteEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

const mapDispatchToProps = {
    getCurrentProfile,
    deleteAccount,
    deleteExperience,
    deleteEducation
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
