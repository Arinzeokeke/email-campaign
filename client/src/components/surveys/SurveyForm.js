import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import { validateEmails, FIELDS } from '../../utils'

class SurveyForm extends React.Component {
  renderFields() {
    return FIELDS.map(({ label, name }) => {
      return (
        <Field
          component={SurveyField}
          type="text"
          label={label}
          name={name}
          key={name}
        />
      )
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

          <Link to="/surveys" className="red left btn-flat white-text">
            Cancel
          </Link>

          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    )
  }
}

const validate = values => {
  const errors = {}
  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You have to provide a ${name}`
    }
  })

  errors.recipients = errors.recipients || validateEmails(values.recipients)

  return errors
}

export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false
})(SurveyForm)
