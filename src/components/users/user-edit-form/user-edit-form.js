import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { renderTextField } from '../../shared/render-text-field/render-text-field'
import { renderRadioGroup } from '../../shared/render-radio-group/render-radio-group'
import { RadioButton } from 'material-ui/RadioButton'
import DatePicker from '../../inputs/DatePicker'
import Dropzone from 'react-dropzone'
import UserEditValidator from '../user-edit-validator/user-edit-validator'
import asyncValidate from '../async-email-validate/async-email-validate'

class UserEditForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="first_name" type="text" component={renderTextField} label="First name *"/>
        <Field name="last_name" type="text" component={renderTextField} label="Last name *"/>
        <Field name="email" type="text" component={renderTextField} label="Email *"/>
        <div>
          <Field name="gender" component={renderRadioGroup}>
            <RadioButton value="male" label="male"/>
            <RadioButton value="female" label="female"/>
          </Field>
        </div>
        <Field name="tel_num" type="text" component={renderTextField} label="Tel num"/>
        <Field name="date_of_birth"
          component={DatePicker}
          floatingLabelText="Date of birth"
          className='date-input'/>
        <div className='file-input'>
          <label>Avatar</label>
          <Field name="avatar" component={props =>
            <Dropzone
              {...props.input}
              multiple={false}
              onDrop={(filesToUpload) => {
                this.files = filesToUpload;
                return props.input.onChange(filesToUpload);
              }}
            >
              <div>Try dropping a file here, or click to select file to upload.</div>
            </Dropzone>
            } type="file" />
          {this.files &&
            <div className='user-avatar__preview'>
              <div className='user-avatar__preview-title'>Preview</div>
              {this.files.map((file, i) =>
                <div>
                  <img key={'image' + i} className='user-avatar__preview-image' src={file.preview} />
                  <span key={i} className='user-avatar__preview-filename'>{file.name}</span>
                </div>
              )}
            </div>
          }
        </div>

        <button type="submit" className="btn btn-default form-submit">Submit</button>
      </form>
    );
  }
}

UserEditForm = reduxForm({
  form: 'UserEditForm',
  validate: UserEditValidator,
  asyncValidate,
  asyncBlurFields: ['email']
})(UserEditForm)

UserEditForm = connect(
  state => ({
    initialValues: state.currentUser
  })
)(UserEditForm)

export default UserEditForm
