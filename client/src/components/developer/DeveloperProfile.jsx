import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Spinner from '../layout/Spinner';
import DeveloperProfileUI from './DeveloperProfileUI';
import { getProfileById, getReposAsync } from '../../actions/profileAction'

export const DeveloperProfile = ({ match: {params}, profile, isLoading, repos, getProfileById, getReposAsync }) => {
    
    useEffect(() => {
        getProfileById(params.id);

    }, [getProfileById, params.id]);

    // NOTE: If profile is put in the deps of the first use effect, an infinite loop occurs, as the dispatcher 
    // update the state, which updates the profile that triggers the profile deps that then trigger the effect again and so on
    useEffect(() => {

        if (profile && profile.githubUsername) {
            getReposAsync(profile.githubUsername);
        }

    }, [profile, getReposAsync]);

    return (
        isLoading || !profile ? <Spinner /> : <DeveloperProfileUI profile={profile} repos={repos} />
    )
}

DeveloperProfile.propTypes = {
    match: PropTypes.object.isRequired,
    profile: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    repos: PropTypes.array,
    getProfileById: PropTypes.func.isRequired,
    getReposAsync: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile.profile, // NOTE: Profile must not be nul to be able to be rendered in the developers page
    isLoading: state.profile.isLoading,
    repos: state.profile.repos
})

const mapDispatchToProps = {
    getProfileById,
    getReposAsync
}

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperProfile)
