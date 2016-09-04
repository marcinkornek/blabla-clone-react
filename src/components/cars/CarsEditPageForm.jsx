import React, { Component, PropTypes }   from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { renderTextField } from '../shared/RenderTextField'
import { renderSelectField } from '../shared/RenderSelectField'
import CarValidator from './CarValidator'
import MenuItem from 'material-ui/MenuItem'
import Dropzone from 'react-dropzone'

class CarsEditPageForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit } = this.props
    var colorsArray = []
    var comfortsArray = []
    var categoriesArray = []
    for (var i = 0; i < colors.length; i++) {
      colorsArray.push(<MenuItem value={colors[i]} key={'color' + i} primaryText={colors[i]} />)
    }
    for (var i = 0; i < comforts.length; i++) {
      comfortsArray.push(<MenuItem value={comforts[i]} key={'comfort' + i} primaryText={comforts[i]} />)
    }
    for (var i = 0; i < categories.length; i++) {
      categoriesArray.push(<MenuItem value={categories[i]} key={'category' + i} primaryText={categories[i]} />)
    }

    return (
      <form onSubmit={handleSubmit}>
        <Field name="brand" type="text" component={renderTextField} label="Brand"/>
        <Field name="model" type="text" component={renderTextField} label="Model"/>
        <Field name="places" type="text" component={renderTextField} label="Places"/>
        <Field name="production_year" type="text" component={renderTextField} label="Production year"/>

        <Field name="color" component={renderSelectField} label="Color">
          {_.map(colorsArray, (n) => n)}
        </Field>
        <Field name="comfort" component={renderSelectField} label="Comfort">
          {_.map(comfortsArray, (n) => n)}
        </Field>
        <Field name="category" component={renderSelectField} label="Category">
          {_.map(categoriesArray, (n) => n)}
        </Field>
        <div className='file-input'>
          <label>Car photo</label>
          <Field name="car_photo" component={props =>
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
    )
  }
}

CarsEditPageForm = reduxForm({
  form: 'CarsEditPageForm',
  validate: CarValidator
})(CarsEditPageForm)

CarsEditPageForm = connect(
  state => {
    initialValues: state.car
  }
)(CarsEditPageForm)

export default CarsEditPageForm
