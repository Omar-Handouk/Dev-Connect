import PropTypes from 'prop-types'

const DeveloperProfileTop = ({ user: { avatar, name }, title, company, location, website, social }) => {

    if (website) {
        social.globe = website;
    }

    const links = Object
        .entries(social)
        .filter(([_, value]) => value && value !== '')
        .map(([key, value], index) => 
        <a key={index} href={value} target="_blank" rel="noopener noreferrer">
            <i className={`${key === 'globe' ? 'fas' : 'fab'} fa-${key} fa-2x`}></i>
        </a>);

    return (
        <div className="profile-top bg-primary p-2">
            <img
                className="round-img my-1"
                src={avatar}
                alt=""
            />

            <h1 className="large">{name}</h1>

            <p className="lead">{`${title}${ company ? ` @ ${company}` : ''}`}</p>

            {location ? <p>{location}</p> : null}

            <div className="icons my-1">
                {links}
            </div>
        </div>
    )
}

DeveloperProfileTop.propTypes = {
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string,
    location: PropTypes.string,
    website: PropTypes.string,
    social: PropTypes.object,
}

export default DeveloperProfileTop
