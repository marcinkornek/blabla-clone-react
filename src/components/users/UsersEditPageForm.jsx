import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../stylesheets/users/Users'
import _                     from 'lodash'
import Icon                  from 'react-fa'
import FormTooltip           from '../shared/FormTooltip'

export default class UsersEditPageForm extends React.Component {
  constructor (props, context) {
    super(props, context)
    this._handleSubmitEditUserForm = this.handleSubmitEditUserForm.bind(this)
    this._handleFile = this.handleFile.bind(this)
    this.state = {
      user: props.user,
      files: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSaving === false) {
      this.setState({user: nextProps.user})
    }
  }

  handleFile(e) {
    var that = this;
    var reader = new FileReader();
    var file = e.target.files[0];
    var path_name = e.target.value

    reader.onload = function(upload) {
      that.setState({
        avatar: {
          image: upload.target.result,
          path_name: path_name
        }
      });
    }
    reader.readAsDataURL(file);
  }

  render() {
    var saving
    if (this.props.isSaving === true) {
      saving =
        <div>
          <Icon spin name="spinner" />
          Saving...
        </div>
    }

    return (
      <div>
        <div className='account__title'>
          My profile
        </div>
        <form className='account_form' onSubmit={this._handleSubmitEditUserForm} encType='multipart/form-data' >
          <div className='account_form-fields'>
            <FormTooltip label='First name' required='true' />
            <Bootstrap.Input type='text' name='first_name' placeholder='First name' ref='first_name' value={this.state.user.first_name} onChange={this.handleChange.bind(this)} />

            <FormTooltip label='Last name' required='true' />
            <Bootstrap.Input type='text' name='last_name' placeholder='Last name' ref='last_name' value={this.state.user.last_name} onChange={this.handleChange.bind(this)} />

            <FormTooltip label='Email' required='true' />
            <Bootstrap.Input type='text' name='email' placeholder='Email' ref='email' value={this.state.user.email} onChange={this.handleChange.bind(this)} />

            <FormTooltip label='Telephone number' required='false' />
            <Bootstrap.Input type='text' name='tel_num' placeholder='Telephone number' ref='tel_num' value={this.state.user.tel_num} onChange={this.handleChange.bind(this)} />

            <FormTooltip label='Birth year' required='false' />
            <Bootstrap.Input type='text' name='birth_year' placeholder='Birth year' ref='birth_year' value={this.state.user.birth_year} onChange={this.handleChange.bind(this)} />

          </div>
          <div className='account_form-avatar'>
            <div className='account_form-avatar-label'>Avatar</div>
            {saving}
            <img src={this.state.user.avatar}/>
            <input type='file' name='avatar' label='Avatar' placeholder='Avatar' ref='avatar' onChange={this._handleFile} />
          </div>
          <Bootstrap.ButtonInput type='submit' value='Edit' />
        </form>
      </div>
    )
  }

  handleChange(e) {
    var user = _.cloneDeep(this.state.user)
    user[e.target.name] = e.target.value
    this.setState({user: user})
  }

  handleSubmitEditUserForm(e) {
    e.preventDefault()
    this.props.onAddClick(this.state.user, this.state.avatar);
  }
}

UsersEditPageForm.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
