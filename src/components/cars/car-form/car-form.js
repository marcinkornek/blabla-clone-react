// utils
import React, { Component, PropTypes }   from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import Dropzone from 'react-dropzone'

// form validators
import { CarValidator } from '../car-validator/car-validator'

// components
import { renderTextField } from '../../shared/render-text-field/render-text-field'
import { renderSelectField } from '../../shared/render-select-field/render-select-field'

export class CarForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    carsOptions: PropTypes.object.isRequired,
    car: PropTypes.object,
  }

  render() {
    const { handleSubmit, carsOptions } = this.props
    var colors = []
    var comforts = []
    var categories = []
    if (carsOptions) {
      for (var i = 0; i < carsOptions.colors.length; i++) {
        colors.push(<MenuItem value={carsOptions.colors[i]} key={'color' + i} primaryText={carsOptions.colors[i]} />)
      }
      for (var i = 0; i < carsOptions.comforts.length; i++) {
        comforts.push(<MenuItem value={carsOptions.comforts[i]} key={'comfort' + i} primaryText={carsOptions.comforts[i]} />)
      }
      for (var i = 0; i < carsOptions.categories.length; i++) {
        categories.push(<MenuItem value={carsOptions.categories[i]} key={'category' + i} primaryText={carsOptions.categories[i]} />)
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <Field name='brand' type='text' component={renderTextField} label='Brand'/>
        <Field name='model' type='text' component={renderTextField} label='Model'/>
        <Field name='places' type='text' component={renderTextField} label='Places'/>
        <Field name='production_year' type='text' component={renderTextField} label='Production year'/>

        <Field name='color' component={renderSelectField} label='Color'>
          {_.map(colors, (n) => n)}
        </Field>
        <Field name='comfort' component={renderSelectField} label='Comfort'>
          {_.map(comforts, (n) => n)}
        </Field>
        <Field name='category' component={renderSelectField} label='Category'>
          {_.map(categories, (n) => n)}
        </Field>
        <div className='file-input'>
          <label>Car photo</label>
          <Field name='car_photo' component={props =>
            <Dropzone
              {...props.input}
              multiple={false}
              onDrop={(filesToUpload) => {
                this.files = filesToUpload
                return props.input.onChange(filesToUpload)
              }}
            >
              <div>Try dropping a file here, or click to select file to upload.</div>
            </Dropzone>
            } type='file' />
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

        <button type='submit' className='btn btn-default form-submit'>Submit</button>
      </form>
    )
  }
}

CarForm = reduxForm({
  form: 'CarForm',
  validate: CarValidator
})(CarForm)

CarForm = connect(
  (state, props) => ({
    initialValues: props.car
  })
)(CarForm)

export default CarForm
