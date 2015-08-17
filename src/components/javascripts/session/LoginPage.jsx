import React                 from 'react'
import Bootstrap             from 'react-bootstrap'
import LoginFbPage           from './LoginFbPage'
import LoginEmailPage        from './LoginEmailPage'
import styles                from '../../stylesheets/session/LoginPage'

export default class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Bootstrap.Row className='show-grid'>
          <Bootstrap.Col xs={6} md={4} xsOffset={3} mdOffset={4} className='login__form'>
            <LoginFbPage />
            <LoginEmailPage />
          </Bootstrap.Col>
        </Bootstrap.Row>
      </div>
    )
  }
}
