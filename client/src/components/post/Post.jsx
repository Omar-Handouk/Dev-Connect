import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const Post = (props) => {
    return (
        <div>
            Individual Posts
        </div>
    )
}

Post.propTypes = {
    
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
