import { Fragment } from 'react'
import PropTypes from 'prop-types'

const DeveloperProfileAbout = ({ bio, skills }) => {

    const skillsDivs = skills.slice(0, 5).map((skill, index) => <div key={index} className="p-1"><i className="fa fa-check"></i> {skill}</div>);

    return (
        <div className="profile-about bg-light p-2">
            {bio ?
                <Fragment>
                    <h2 className="text-primary">About</h2>
                    <p>{bio}</p>
                    <div className="line"></div>
                </Fragment>
                : null
            }
            {skills && skills.length > 0 ?
                <Fragment>
                    <h2 className="text-primary">Skill Set</h2>
                    <div className="skills">
                        {skillsDivs}
                    </div>
                </Fragment>
                : null
            }
        </div>
    )
}

DeveloperProfileAbout.propTypes = {
    bio: PropTypes.string,
    skills: PropTypes.array.isRequired,
}

export default DeveloperProfileAbout
