import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addEducation } from '../../actions/profileAction';
import AddEducationUI from './AddEducationUI'

const initialState = {
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    current: false,
    to: '',
    description: ''
};

export const AddEducation = ({ history, addEducation }) => {

    const [formData, setFormData] = useState(initialState);

    const onChange = e => {
        const target = e.target;
        const name = target.name;

        if (name === 'current') {
            setFormData({ ...formData, [name]: !formData.current })
        } else {
            setFormData({ ...formData, [name]: target.value });
        }
    };

    const onSubmit = e => {
        e.preventDefault();

        addEducation(formData, history);
    };

    return (
        < AddEducationUI  { ...formData } onChange={onChange} onSubmit={onSubmit} />
    )
}

AddEducation.propTypes = {
    history: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    addEducation
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEducation)
