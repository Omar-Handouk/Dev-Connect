import { Fragment } from 'react'
import PropTypes from 'prop-types'

const AddEducationUI = ({ school, degree, fieldofstudy, from, current, to, description, onChange, onSubmit }) => {
    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit} >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        required
                        autoFocus
                        value={school}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        required
                        value={degree}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <p>
                        <input type="checkbox" name="current" value={current} checked={current} onChange={onChange} /> Current School or Bootcamp
                    </p>
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
                        placeholder="Program Description"
                        value={description} onChange={onChange}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}

AddEducationUI.propTypes = {
    school: PropTypes.string.isRequired,
    degree: PropTypes.string.isRequired,
    fieldofstudy: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    current: PropTypes.bool.isRequired,
    to: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default AddEducationUI
