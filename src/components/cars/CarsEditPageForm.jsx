import React, { PropTypes }   from 'react'
import { Input, ButtonInput } from 'react-bootstrap'
import styles                 from '../../stylesheets/users/Users'
import _                      from 'lodash'
import Icon                   from 'react-fa'
import FormTooltip            from '../shared/FormTooltip'

export default class CarsEditPageForm extends React.Component {
  constructor (props, context) {
    super(props, context)
    this._handleSubmitEditCarForm = this.handleSubmitEditCarForm.bind(this)
    this._handleFile = this.handleFile.bind(this)
    this.state = {car: props.car}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSaving === false) {
      this.setState({car: nextProps.car})
    }
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

  handleChange(e) {
    var car = _.cloneDeep(this.state.car)
    car[e.target.name] = e.target.value
    this.setState({car: car})
  }

  handleSubmitEditCarForm(e) {
    e.preventDefault()
    this.props.onAddClick(this.state.car, this.state.car_photo);
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
          Edit car
        </div>
        <form className='-form' onSubmit={this._handleSubmitEditCarForm}>
          <FormTooltip label='Brand' required='true' />
          <Input type='text' name='brand' placeholder='Brand' ref='brand' value={this.state.car.brand} onChange={this.handleChange.bind(this)} />

          <FormTooltip label='Model' required='true' />
          <Input type='text' name='model' placeholder='Model' ref='model' value={this.state.car.model} onChange={this.handleChange.bind(this)} />

          <FormTooltip label='Places' required='true' />
          <Input type='text' name='places' placeholder='Places' ref='places' value={this.state.car.places} onChange={this.handleChange.bind(this)} />

          <FormTooltip label='Production year' required='false' />
          <Input type='text' name='production_year' placeholder='Production year' ref='production_year' value={this.state.car.production_year} onChange={this.handleChange.bind(this)} />

          <FormTooltip label='Color' required='false' />
          <Input type='select' name='color' ref='color' value={this.state.car.color} onChange={this.handleChange.bind(this)} >
            {colors}
          </Input>

          <FormTooltip label='Comfort' required='false' />
          <Input type='select' name='comfort' ref='comfort' value={this.state.car.comfort} onChange={this.handleChange.bind(this)} >
            {comforts}
          </Input>

          <FormTooltip label='Category' required='false' />
          <Input type='select' name='category' ref='category' value={this.state.car.category} onChange={this.handleChange.bind(this)} >
            {categories}
          </Input>

          <div className='account_form-photo'>
            <FormTooltip label='Car photo' required='false' />
            {saving}
            <img src={this.state.car.car_photo}/>
            <input type='file' name='car_photo' ref='car_photo' onChange={this._handleFile} />
          </div>
          <ButtonInput type='submit' value='Edit' />
        </form>
      </div>
    )
  }
}

CarsEditPageForm.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
