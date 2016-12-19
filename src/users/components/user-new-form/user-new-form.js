// utils
import React, { Component, PropTypes }   from 'react'
import { reduxForm, Field } from 'redux-form'
import { RadioButton } from 'material-ui/RadioButton'
import Dropzone from 'react-dropzone'

// form validators
import { UserNewValidator } from '../user-new-validator/user-new-validator'
import { asyncValidate } from '../async-email-validate/async-email-validate'

// components
import DatePicker from '../../../components/inputs/DatePicker'
import { renderTextField } from '../../../components/shared/render-text-field/render-text-field'
import { renderRadioGroup } from '../../../components/shared/render-radio-group/render-radio-group'

class UserNewForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="first_name" type="text" component={renderTextField} label="First name"/>
        <Field name="last_name" type="text" component={renderTextField} label="Last name"/>
        <Field name="email" type="text" component={renderTextField} label="Email"/>
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
        <Field name="password" type="password" component={renderTextField} label="Password"/>
        <Field name="password_confirmation" type="password" component={renderTextField} label="Password confirmation"/>

        <button type="submit" className="btn btn-default form-submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'UserNewForm',
  validate: UserNewValidator,
  asyncValidate,
  asyncBlurFields: ['email']
})(UserNewForm)
