import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/users/Users'
import FormTooltip           from '../shared/FormTooltip'

export default class UsersNewPageForm extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render() {
    return (
      <form className='login-email-form' onSubmit={this.handleSubmitRegisterForm.bind(this)}>
        <FormTooltip label='First name' required='true' />
        <Bootstrap.Input type='text' placeholder='First name' ref='first_name' />

        <FormTooltip label='Last name' required='true' />
        <Bootstrap.Input type='text' placeholder='Last name' ref='last_name' />

        <FormTooltip label='Email' required='true' />
        <Bootstrap.Input type='email' placeholder='Email' ref='email' />

        <FormTooltip label='Telephone number' required='false' />
        <Bootstrap.Input type='text' placeholder='Telephone number' ref='tel_num' />

        <FormTooltip label='Birth year' required='false' />
        <Bootstrap.Input type='text' placeholder='Birth year' ref='birth_year' />

        <FormTooltip label='Password' required='true' />
        <Bootstrap.Input type='password' placeholder='Password' ref='password' />

        <FormTooltip label='Password confirmation' required='true' />
        <Bootstrap.Input type='password' placeholder='Password confirmation' ref='passwordConfirmation' />

        <Bootstrap.ButtonInput type='submit' value='Login' />
      </form>
    )
  }

  handleSubmitRegisterForm(e) {
    e.preventDefault()
    const first_name = this.refs.first_name.getValue()
    const last_name  = this.refs.email.getValue()
    const email      = this.refs.email.getValue()
    const tel_num    = this.refs.tel_num.getValue()
    const birth_year = this.refs.birth_year.getValue()
    const password  = this.refs.password.getValue()
    const passwordConfirmation = this.refs.passwordConfirmation.getValue()
    var newUser = {
      first_name: first_name,
      last_name:  last_name,
      email:      email,
      tel_num:    tel_num,
      birth_year: birth_year,
      password:   password,
      passwordConfirmation: passwordConfirmation
    }
    this.props.onAddClick(newUser);
  }
}

UsersNewPageForm.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
