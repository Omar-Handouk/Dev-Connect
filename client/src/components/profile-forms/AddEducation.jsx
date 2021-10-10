import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AddEducationUI from './AddEducationUI'

export const AddEducation = (props) => {
    return (
        < AddEducationUI />
    )
}

AddEducation.propTypes = {
    
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEducation)
