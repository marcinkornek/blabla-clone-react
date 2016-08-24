import React, { PropTypes }   from 'react'
import { reduxForm, Field }   from 'redux-form'
import classNames             from 'classnames'
import Dropzone               from 'react-dropzone';
import styles                 from '../../stylesheets/users/Users'
import UserNewValidator       from './UserNewValidator'
import { renderTextField }    from '../shared/RenderTextField'
import asyncValidate          from './asyncEmailValidate'

class UsersNewPageForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="first_name" type="text" component={renderTextField} label="First name"/>
        <Field name="last_name" type="text" component={renderTextField} label="Last name"/>
        <Field name="email" type="text" component={renderTextField} label="Email"/>
        <div className="radio-input">
          <label><Field name="gender" component="input" type="radio" value="male"/> Male</label>
          <label><Field name="gender" component="input" type="radio" value="female"/> Female</label>
        </div>
        <Field name="tel_num" type="text" component={renderTextField} label="Tel num"/>
        <Field name="birth_year" type="number" component={renderTextField} label="Birth year"/>
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
  form: 'UsersNewPageForm',
  validate: UserNewValidator,
  asyncValidate,
  asyncBlurFields: ['email']
})(UsersNewPageForm)
