import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ProfilesUI from './ProfilesUI'
import Spinner from '../layout/Spinner'
import { getProfilesAsync, clearProfile } from '../../actions/profileAction'

export const Profiles = ({ profiles, isLoading, getProfilesAsync, clearProfile }) => {

    useEffect(() => {
        getProfilesAsync();
    }, [getProfilesAsync]);

    return (
            isLoading ? <Spinner /> : <ProfilesUI profiles={profiles} />
    );
}

Profiles.propTypes = {
    profiles: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getProfilesAsync: PropTypes.func.isRequired,
    clearProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    profiles: state.profile.profiles,
    isLoading: state.profile.isLoading
})

const mapDispatchToProps = {
    getProfilesAsync,
    clearProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
