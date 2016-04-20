import React, { PropTypes }   from 'react'
import { reduxForm }          from 'redux-form'
import classNames             from 'classnames'
import UserValidator          from './UserValidator'
import styles                 from '../../stylesheets/users/Users'
import formsStyles            from '../../stylesheets/shared/Forms'
import _                      from 'lodash'

export default class UsersEditPageForm extends React.Component {
  render() {
    const {fields: {first_name, last_name, email, tel_num, birth_year}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className={classNames('form-group', {'has-error': first_name.touched && first_name.error})}>
          <label className="control-label">First Name</label>
          <input type="text" placeholder="First Name" className="form-control" {...first_name}/>
          {first_name.touched && first_name.error && <div className="form-error">{first_name.error}</div>}
        </div>
        <div className={classNames('form-group', {'has-error': last_name.touched && last_name.error})}>
          <label className="control-label">Last Name</label>
          <input type="text" placeholder="Last Name" className="form-control" {...last_name}/>
          {last_name.touched && last_name.error && <div className="form-error">{last_name.error}</div>}
        </div>
        <div className={classNames('form-group', {'has-error': email.touched && email.error})}>
          <label className="control-label">Email</label>
          <input type="email" placeholder="Email" className="form-control" {...email}/>
          {email.touched && email.error && <div className="form-error">{email.error}</div>}
        </div>
        <div className={classNames('form-group', {'has-error': tel_num.touched && tel_num.error})}>
          <label className="control-label">Tel num</label>
          <input type="tel_num" placeholder="Tel num" className="form-control" {...tel_num}/>
          {tel_num.touched && tel_num.error && <div className="form-error">{tel_num.error}</div>}
        </div>
        <div className={classNames('form-group', {'has-error': birth_year.touched && birth_year.error})}>
          <label className="control-label">Birth year</label>
          <input type="birth_year" placeholder="Birth year" className="form-control" {...birth_year}/>
          {birth_year.touched && birth_year.error && <div className="form-error">{birth_year.error}</div>}
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
}

UsersEditPageForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

UsersEditPageForm = reduxForm({
  form: 'UsersEditPageForm',
  fields: ['first_name', 'last_name', 'email', 'tel_num', 'birth_year'],
  validate: UserValidator
},
state => ({ initialValues: state.user.user }),
)(UsersEditPageForm);

export default UsersEditPageForm;
