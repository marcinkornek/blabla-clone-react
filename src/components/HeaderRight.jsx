import React from 'react'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ContentAddBox from 'material-ui/svg-icons/content/add-box'
import ActionSearch from 'material-ui/svg-icons/action/search'
import FontIcon from 'material-ui/FontIcon'

const styles = {
  button: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10
  },
  searchButton: {
    verticalAlign: 'middle',
    color: 'white',
    minWidth: 40
  }
}

const HeaderRight = () => (
  <div>
    <FlatButton
      icon={<ActionSearch />}
      style={styles.searchButton}
      containerElement={<Link to="/rides" />}
    />
    <RaisedButton
      label="Add ride"
      labelPosition="after"
      icon={<ContentAddBox />}
      style={styles.button}
      containerElement={<Link to="/rides/new" />}
    />
  </div>
)

export default HeaderRight
