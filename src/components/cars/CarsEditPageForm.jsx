import React, { PropTypes }   from 'react'
import { reduxForm }          from 'redux-form'
import classNames             from 'classnames'
import Dropzone               from 'react-dropzone';
import CarValidator           from './CarValidator'
import styles                 from '../../stylesheets/users/Users'
import formsStyles            from '../../stylesheets/shared/Forms'

export default class CarsEditPageForm extends React.Component {
  render() {
    const {fields: {brand, model, places, production_year, color, comfort, category, car_photo}, handleSubmit, submitting} = this.props;
    var colors = [<option value='' key={'color'}> -- select color -- </option>]
    var comforts = [<option value='' key={'comfort'}> -- select comfort level -- </option>]
    var categories = [<option value=''key={'category'} > -- select category -- </option>]
    if (this.props.carsOptions) {
      for (var i = 0; i < this.props.carsOptions.colors.length; i++) {
        colors.push(<option value={this.props.carsOptions.colors[i]} key={'color' + i}> {this.props.carsOptions.colors[i]} </option>);
      }
      for (var i = 0; i < this.props.carsOptions.comforts.length; i++) {
        comforts.push(<option value={this.props.carsOptions.comforts[i]} key={'comfort' + i}> {this.props.carsOptions.comforts[i]} </option>);
      }
      for (var i = 0; i < this.props.carsOptions.categories.length; i++) {
        categories.push(<option value={this.props.carsOptions.categories[i]} key={'category' + i}> {this.props.carsOptions.categories[i]} </option>);
      }
    }

    return (
      <form className='car-new-form' onSubmit={handleSubmit}>
        <div className={classNames('form-group', {'has-error': brand.touched && brand.error})}>
          <label className="control-label">Brand</label>
          <input type="text" placeholder="Brand" className="form-control" {...brand}/>
          {brand.touched && brand.error && <div className="form-error">{brand.error}</div>}
        </div>

        <div className={classNames('form-group', {'has-error': model.touched && model.error})}>
          <label className="control-label">Model</label>
          <input type="text" placeholder="Model" className="form-control" {...model}/>
          {model.touched && model.error && <div className="form-error">{model.error}</div>}
        </div>

        <div className={classNames('form-group', {'has-error': places.touched && places.error})}>
          <label className="control-label">Places</label>
          <input type="text" placeholder="Places" className="form-control" {...places}/>
          {places.touched && places.error && <div className="form-error">{places.error}</div>}
        </div>

        <div className={classNames('form-group', {'has-error': production_year.touched && production_year.error})}>
          <label className="control-label">Production year</label>
          <input type="text" placeholder="Production year" className="form-control" {...production_year}/>
          {production_year.touched && production_year.error && <div className="form-error">{production_year.error}</div>}
        </div>

        <div className={classNames('form-group', {'has-error': color.touched && color.error})}>
          <label className="control-label">Color</label>
          <select className="form-control" {...color} value={color.value || ''}> />
            {_.map(colors, (n) => n)}
          </select>
          {color.touched && color.error && <div className="form-error">{color.error}</div>}
        </div>


        <div className={classNames('form-group', {'has-error': comfort.touched && comfort.error})}>
          <label className="control-label">Comfort</label>
          <select className="form-control" {...comfort} value={comfort.value || ''}> />
            {_.map(comforts, (n) => n)}
          </select>
          {comfort.touched && comfort.error && <div className="form-error">{comfort.error}</div>}
        </div>

        <div className={classNames('form-group', {'has-error': category.touched && category.error})}>
          <label className="control-label">categories</label>
          <select className="form-control" {...category} value={category.value || ''}> />
            {_.map(categories, (n) => n)}
          </select>
          {category.touched && category.error && <div className="form-error">{category.error}</div>}
        </div>

        <div>
          <label>Car photo</label>
          <Dropzone
            { ...car_photo } className='form-dropzone'
            onDrop={ ( filesToUpload, e ) => car_photo.onChange(filesToUpload) }
          >
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </div>
        <div>
          <button type="submit" className="btn btn-default" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
    )
  }
}

CarsEditPageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

CarsEditPageForm = reduxForm({
  form: 'CarsEditPageForm',
  fields: ['brand', 'model', 'places', 'production_year', 'color', 'comfort', 'category', 'car_photo'],
  validate: CarValidator
},
state => ({ initialValues: state.car.car }),
)(CarsEditPageForm);

export default CarsEditPageForm;
