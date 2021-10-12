import React from 'react'
import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate';

const Education = ({ _id, school, degree, from, to, current, deleteEducation }) => {
    return (
        <tr key={_id}>
            <td>{school}</td>
            <td className="hide-sm">{degree}</td>
            <td className="hide-sm">
                {`${formatDate(from)} - ${current ? 'now' : formatDate(to)}`}
            </td>
            <td>
                <button className="btn btn-danger" onClick={e => deleteEducation(e, _id)}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

Education.propTypes = {
    _id: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    degree: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string,
    current: PropTypes.bool.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};

export default Education
