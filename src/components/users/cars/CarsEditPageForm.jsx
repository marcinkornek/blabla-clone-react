import React, { PropTypes }  from 'react'
import Bootstrap             from 'react-bootstrap'
import styles                from '../../../stylesheets/users/Users'
import _                     from 'lodash'

export default class CarsEditPageForm extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {car: props.car}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({car: nextProps.car})
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
      <div>
        <div className='account__title'>
          My profile
        </div>
        <form className='-form' onSubmit={this.handleSubmitEditCarForm.bind(this)}>
          <Bootstrap.Input type='text' name='brand' label='Brand' placeholder='Brand' ref='brand' value={this.state.car.brand} onChange={this.handleChange.bind(this)} />
          <Bootstrap.Input type='text' name='model' label='Model' placeholder='Model' ref='model' value={this.state.car.model} onChange={this.handleChange.bind(this)} />
          <Bootstrap.Input type='text' name='production_year' label='Production year' placeholder='Production year' ref='production_year' value={this.state.car.production_year} onChange={this.handleChange.bind(this)} />
          <Bootstrap.Input type='text' name='places' label='Places' placeholder='Places' ref='places' value={this.state.car.places} onChange={this.handleChange.bind(this)} />
          <Bootstrap.Input type='select' name='color' label='Color' ref='color' value={this.state.car.color} onChange={this.handleChange.bind(this)} >
            {colors}
          </Bootstrap.Input>
          <Bootstrap.Input type='select' name='comfort' label='Comfort' ref='comfort' value={this.state.car.comfort} onChange={this.handleChange.bind(this)} >
            {comforts}
          </Bootstrap.Input>
          <Bootstrap.Input type='select' name='category' label='Category' ref='category' value={this.state.car.category} onChange={this.handleChange.bind(this)} >
            {categories}
          </Bootstrap.Input>
          <Bootstrap.ButtonInput type='submit' value='Edit' />
        </form>
      </div>
    )
  }

  handleChange(e) {
    var car = _.cloneDeep(this.state.car)
    car[e.target.name] = e.target.value
    this.setState({car: car})
  }

  handleSubmitEditCarForm(e) {
    e.preventDefault()
    this.props.onAddClick(this.state.car);
  }
}

CarsEditPageForm.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
