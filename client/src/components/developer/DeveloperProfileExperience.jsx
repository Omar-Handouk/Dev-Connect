import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate';

const DeveloperProfileExperience = ({ experience }) => {

    const experiences = experience.map((exp, index) => {

        const { title, company, location, from, to, current, description } = exp;

        return (
            <div key={index}>
                
                <h3 className="text-dark">{company}</h3>
                
                <p>{`${formatDate(from)} - ${ current ? 'now' : formatDate(to)}`}</p>
                
                <p><strong>Position: </strong>{title}</p>
                
                {location && location !== '' ? <p><strong>Location: </strong>{location}</p> : null}
                
                {description && description !== '' ? <p><strong>Description: </strong>{description}</p> : null}

            </div>
        )
    });

    return (
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>

            {experiences.length > 0 ? experiences : <h3>No Experience</h3>}

        </div>
    )
}

DeveloperProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired,
}

export default DeveloperProfileExperience
