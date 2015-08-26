import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../../stylesheets/users/Users'

export default class CarsNewPageForm extends React.Component {
  constructor (props, context) {
    super(props, context)
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
        <Bootstrap.Input type='text' label='Brand' placeholder='Brand' ref='brand' />
        <Bootstrap.Input type='text' label='Model' placeholder='Model' ref='model' />
        <Bootstrap.Input type='text' label='Production year' placeholder='Production year' ref='production_year' />
        <Bootstrap.Input type='text' label='Places' placeholder='Places' ref='places' />
        <Bootstrap.Input type='select' label='Color' ref='color'>
          {colors}
        </Bootstrap.Input>
        <Bootstrap.Input type='select' label='Comfort' ref='comfort'>
          {comforts}
        </Bootstrap.Input>
        <Bootstrap.Input type='select' label='Category' ref='category'>
          {categories}
        </Bootstrap.Input>
        <Bootstrap.ButtonInput type='submit' value='Create' />
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
    this.props.onAddClick(newCar);
  }
}

CarsNewPageForm.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
