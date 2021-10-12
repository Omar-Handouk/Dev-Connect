import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const AddExperienceUI = ({ title, company, location, from, current, to, description, onSubmit, onChange }) => {
    return (
        <Fragment>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit} >
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" required autoFocus value={title} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" required value={company} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={onChange} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={onChange} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" value={current} onChange={onChange} checked={current} /> Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={onChange} disabled={current} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description} 
                        onChange={onChange}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddExperienceUI.propTypes = {
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    current: PropTypes.bool.isRequired,
    to: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default AddExperienceUI
