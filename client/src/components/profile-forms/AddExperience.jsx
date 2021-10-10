import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AddExperienceUI from './AddExperienceUI'

export const AddExperience = (props) => {
    return (
        <AddExperienceUI />
    )
}

AddExperience.propTypes = {
    props: PropTypes
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience)
