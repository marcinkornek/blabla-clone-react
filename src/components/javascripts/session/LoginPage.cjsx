React                 = require('react')
Bootstrap             = require('react-bootstrap')
SessionActionCreators = require('../../../actions/SessionActionCreators.coffee')
styles                = require('../../stylesheets/session/LoginPage.scss')
SessionStore          = require('../../../stores/SessionStore.coffee')
ListenerMixin         = require('alt/mixins/ListenerMixin')
data = {}

LoginPage = React.createClass
  mixins: [ListenerMixin]

  getInitialState: ->
    SessionStore.getState()
    showLoginForm: false
    errors: []

  componentDidMount: ->
    window.fbAsyncInit = (=>
      FB.init
        appId: '116661262005772'
        status: true # check login status
        cookie: true # enable cookies to allow the server to access the session
        xfbml: true  # parse XFBML
        version: 'v2.3'

      FB.Event.subscribe 'auth.statusChange', @statusChangeCallback
    )

    # Load the SDK asynchronously
    ((d) ->
      id = "facebook-jssdk"
      ref = d.getElementsByTagName("script")[0]
      return  if d.getElementById(id)
      js = d.createElement("script")
      js.id = id
      js.async = true
      js.src = "//connect.facebook.net/en_US/sdk.js"
      ref.parentNode.insertBefore js, ref
    ) document

  # componentWillMount: ->
  #   @listenTo SessionStore, @_onChange

  # _onChange: ->
  #   SessionStore.getState()

  getDataFromFb: ->
    FB.api "/me",
      fields: "last_name, first_name, email, id"
    , (response) ->
      SessionActionCreators.loginFB(response)

  statusChangeCallback: (response) ->
    if response.status == 'connected' && data.login == true
      @getDataFromFb()

  checkLoginState: ->
    FB.getLoginStatus (response) =>
      @statusChangeCallback(response)

  loginWithFacebook: ->
    data.login = true
    FB.login(@checkLoginState(), scope: 'email')

  showFormOnClick: ->
    if @state.showLoginForm == false
      @setState({showLoginForm: true})
    else
      @setState({showLoginForm: false})

  _onSubmit: (e) ->
    e.preventDefault()
    email    = @refs.email.getValue()
    password = @refs.password.getValue()
    SessionActionCreators.login(email, password)

  render: ->
    if @state.errors.length > 0
      errors =
        <ErrorNotice errors={@state.errors}/>

    if @state.showLoginForm
      LoginForm =
        <form className='login-email-form' onSubmit={@_onSubmit}>
          <Bootstrap.Input type='text' label='Email' placeholder='Email' ref='email' onChange={@handleChange} />
          <Bootstrap.Input type='password' label='Password' placeholder='Password' ref='password' onChange={@handleChange} />
          <Bootstrap.ButtonInput type='submit' value='Login' />
        </form>

    <div>
      <Bootstrap.Row className='show-grid'>
        <Bootstrap.Col xs={6} md={4} xsOffset={3} mdOffset={4} className='login__form'>
          <button className='login-facebook-button btn btn-primary' onClick={@loginWithFacebook}>Login with facebook</button>
          <button className='login-email-button btn btn-default' onClick={@showFormOnClick}>Login with email and password</button>
          {LoginForm}
        </Bootstrap.Col>
      </Bootstrap.Row>
    </div>


module.exports = LoginPage
