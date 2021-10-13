import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfilesItem = ({ profile }) => {
    const {
        user: { _id, name, avatar },
        title,
        company,
        location,
        skills
    } = profile;

    return (
        <div className="profile bg-light">
            <img
                className="round-img"
                src={avatar}
                alt=""
            />

            <div>
                <h2>{name}</h2>
                <p>{`${title}${company ? ` @ ${company}` : ''}`}</p>
                {location ? <p>{location}</p> : ''}
                <Link to={`/profiles/${_id}`} className="btn btn-primary">View Profile</Link>
            </div>

            <ul>
                {skills.slice(0, 5).map((skill, index) =>  <li key={index} className="text-primary"><i className="fas fa-check"></i> {skill}</li>)}
            </ul>
        </div>
    )
}

ProfilesItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfilesItem
