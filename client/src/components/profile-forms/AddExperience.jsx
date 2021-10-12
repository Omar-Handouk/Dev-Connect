import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addExperience } from '../../actions/profileAction';
import AddExperienceUI from './AddExperienceUI'

const initialState = {
    title: '',
    company: '',
    location: '',
    from: '',
    current: false,
    to: '',
    description: ''
};

export const AddExperience = ({ addExperience, history }) => {

    const [formData, setFormData] = useState(initialState);

    const onChange = e => {
        const target = e.target;
        const name = target.name;

        if (name === 'current') {
            setFormData({ ...formData, current: !formData.current });
        } else {
            setFormData({ ...formData, [name]: e.target.value });
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData, history);
    };

    return (
        <AddExperienceUI { ...formData }  onSubmit={onSubmit} onChange={onChange} />
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    addExperience
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience)
