import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate';

const DeveloperProfileEducation = ({ education }) => {

    const educations = education.map((edu, index) => {

        const { school, degree, fieldofstudy, from, to, current, description } = edu;

        return (
            <div key={index}>
                
                <h3>{school}</h3>
                
                <p>{`${formatDate(from)} - ${ current ? 'now' : formatDate(to)}`}</p>

                <p><strong>Degree: </strong>{degree}</p>

                <p><strong>Field Of Study: </strong>{fieldofstudy}</p>

                {description && description !== '' ? <p><strong>Description: </strong>{description}</p> : null}

            </div>
        );
    });

    return (
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {educations.length > 0 ? educations : <h3>No Education</h3>}
        </div>
    )
}

DeveloperProfileEducation.propTypes = {
    education: PropTypes.array.isRequired,
}

export default DeveloperProfileEducation
