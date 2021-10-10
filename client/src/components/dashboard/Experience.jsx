import PropTypes from 'prop-types'
import formatDate from '../../utils/formatDate';

const Experience = ({ _id, title, company, from, to, current, deleteExperience }) => {
    return (
        <tr key={_id}>
            <td>{company}</td>
            <td className="hide-sm">{title}</td>
            <td className="hide-sm">
                {`${formatDate(from)} - ${current ? 'now' : formatDate(to)}`}
            </td>
            <td>
                <button className="btn btn-danger" onClick={e => deleteExperience(e, _id)}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

Experience.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string,
    current: PropTypes.bool.isRequired,
    deleteExperience: PropTypes.func.isRequired,
};

export default Experience
