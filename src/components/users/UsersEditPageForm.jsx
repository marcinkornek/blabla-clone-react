import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/users/Users'
import _                     from 'lodash'

export default class UsersEditPageForm extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      user: props.user
    }
  }

  render() {
    return (
      <form className='login-email-form' onSubmit={this.handleSubmitEditUserForm.bind(this)}>
        <Bootstrap.Input type='text' name='first_name' label='First name' placeholder='First name' ref='first_name' value={this.state.user.first_name} onChange={this.handleChange.bind(this)} />
        <Bootstrap.Input type='text' name='last_name' label='Last name' placeholder='Last name' ref='last_name' value={this.state.user.last_name} onChange={this.handleChange.bind(this)} />
        <Bootstrap.Input type='text' name='email' label='Email' placeholder='Email' ref='email' value={this.state.user.email} onChange={this.handleChange.bind(this)} />
        <Bootstrap.ButtonInput type='submit' value='Edit' />
      </form>
    )
  }

  handleChange(e) {
    var user = _.cloneDeep(this.state.user)
    user[e.target.name] = e.target.value
    this.setState({user: user})
  }

  handleSubmitEditUserForm(e) {
    e.preventDefault()
    this.props.onAddClick(this.state.user);
  }
}

UsersEditPageForm.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
