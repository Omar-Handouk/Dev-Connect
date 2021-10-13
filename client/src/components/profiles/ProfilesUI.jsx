import { Fragment } from 'react'
import PropTypes from 'prop-types'

import ProfilesItem from './ProfilesItem'

const ProfilesUI = ({ profiles }) => {
    return (
        <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect with developers
            </p>
            <div className="profiles" style={{textAlign: profiles.length > 0 ? '' : 'center'}}>
                {profiles.length > 0 ? profiles.map(profile => <ProfilesItem key={profile._id} profile={profile} /> ) : <h2>No profiles available</h2>}
            </div>
        </Fragment>
    )
}

ProfilesUI.propTypes = {
    profiles: PropTypes.array.isRequired,
}

export default ProfilesUI
