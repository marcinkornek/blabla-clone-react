import React, { PropTypes }   from 'react'
import { Input, ButtonInput } from 'react-bootstrap'
import styles                 from '../../stylesheets/users/Users'
import FormTooltip            from '../shared/FormTooltip'

export default class CarsNewPageForm extends React.Component {
  constructor (props, context) {
    super(props, context)
    this._handleFile = this.handleFile.bind(this)
  }

  handleFile(e) {
    var that = this;
    var reader = new FileReader();
    var file = e.target.files[0];
    var path_name = e.target.value

    reader.onload = function(upload) {
      that.setState({
        car_photo: {
          image: upload.target.result,
          path_name: path_name
        }
      });
    }
    reader.readAsDataURL(file);
  }

  render() {
    var colors = [<option value=''> -- select color -- </option>]
    var comforts = [<option value=''> -- select comfort level -- </option>]
    var categories = [<option value=''> -- select category -- </option>]
    if (this.props.carsOptions) {
      for (var i = 0; i < this.props.carsOptions.colors.length; i++) {
        colors.push(<option value={this.props.carsOptions.colors[i]}> {this.props.carsOptions.colors[i]} </option>);
      }
      for (var i = 0; i < this.props.carsOptions.comforts.length; i++) {
        comforts.push(<option value={this.props.carsOptions.comforts[i]}> {this.props.carsOptions.comforts[i]} </option>);
      }
      for (var i = 0; i < this.props.carsOptions.categories.length; i++) {
        categories.push(<option value={this.props.carsOptions.categories[i]}> {this.props.carsOptions.categories[i]} </option>);
      }
    }

    return (
      <form className='login-email-form' onSubmit={this.handleSubmitRegisterForm.bind(this)}>
        <FormTooltip label='Brand' required='true' />
        <Input type='text' placeholder='Brand' ref='brand' />

        <FormTooltip label='Model' required='true' />
        <Input type='text' placeholder='Model' ref='model' />

        <FormTooltip label='Places' required='false' />
        <Input type='text' placeholder='Places' ref='places' />

        <FormTooltip label='Production year' required='true' />
        <Input type='text' placeholder='Production year' ref='production_year' />

        <FormTooltip label='Color' required='false' />
        <Input type='select' ref='color'>
          {colors}
        </Input>

        <FormTooltip label='Comfort' required='false' />
        <Input type='select' ref='comfort'>
          {comforts}
        </Input>

        <FormTooltip label='Category' required='false' />
        <Input type='select' ref='category'>
          {categories}
        </Input>

        <div className='account_form-photo'>
          <FormTooltip label='Car photo' required='false' />
          <input type='file' name='car_photo' ref='car_photo' onChange={this._handleFile} />
        </div>
        <ButtonInput type='submit' value='Create' />
      </form>
    )
  }

  handleSubmitRegisterForm(e) {
    e.preventDefault()
    var newCar = {
      brand: this.refs.brand.getValue(),
      model: this.refs.model.getValue(),
      production_year: this.refs.production_year.getValue(),
      places: this.refs.places.getValue(),
      color: this.refs.color.getValue(),
      comfort: this.refs.comfort.getValue(),
      category: this.refs.category.getValue()
    }
    this.props.onAddClick(newCar, this.state.car_photo);
  }
}

CarsNewPageForm.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
