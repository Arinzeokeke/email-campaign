import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FIELDS } from '../../utils'
import * as actions from '../../actions'

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const details = FIELDS.map(({ name, label }) => {
    return (
      <div key={name}>
        <div>
          <label>{label} </label>
          <div>{formValues[name]}</div>
        </div>
      </div>
    )
  })
  return (
    <div>
      <h5> Please confirm your entries </h5>

      {details}
      <button
        className="yellow darken-3 btn-flat  white-text"
        onClick={onCancel}
      >
        Back
      </button>

      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey <i className="material-icons right">email</i>
      </button>
    </div>
  )
}

const mapStateToProps = state => ({ formValues: state.form.surveyForm.values })

export default connect(mapStateToProps, actions)(withRouter(SurveyReview))
