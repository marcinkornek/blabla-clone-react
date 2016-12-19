import ConnectedComponent, { NotificationsItem } from './notifications-item'
import { Notification, Notification2 } from 'test/support/fixtures'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

describe('<NotificationsItem />', () => {
  const props = {
    notification: Notification(),
    markAsSeen: noop
  }

  describe('when notification has type ride_request_accepted', () => {
    const notification = {
      ...Notification(),
      notification_type: 'ride_request_accepted',
    }
    const component = shallow(<NotificationsItem {...props} notification={notification} />)

    it('displays RideRequestUpdated component', () => {
      expect(component).to.have.exactly(1).descendants('RideRequestUpdated')
      expect(component.find('RideRequestUpdated')).to.have.props(['notification']).eql([notification])
    })

    it('displays notification sender avatar with link', () => {
      expect(component).to.have.exactly(1).descendants('Link')
      expect(component.find('Link')).to.have.props(['to']).eql([`/users/${notification.sender.id}`])
      expect(component.find('Link').dive()).to.have.exactly(1).descendants('Avatar')
      expect(component.find('Link').dive().find('Avatar')).to.have.props(['src']).eql([notification.sender.avatar])
    })
  })

  describe('when notification has type ride_request_rejected', () => {
    const notification = {
      ...Notification(),
      notification_type: 'ride_request_rejected',
    }
    const component = shallow(<NotificationsItem {...props} notification={notification} />)

    it('displays RideRequestUpdated component', () => {
      expect(component).to.have.exactly(1).descendants('RideRequestUpdated')
      expect(component.find('RideRequestUpdated')).to.have.props(['notification']).eql([notification])
    })

    it('displays notification sender avatar with link', () => {
      expect(component).to.have.exactly(1).descendants('Link')
      expect(component.find('Link')).to.have.props(['to']).eql([`/users/${notification.sender.id}`])
      expect(component.find('Link').dive()).to.have.exactly(1).descendants('Avatar')
      expect(component.find('Link').dive().find('Avatar')).to.have.props(['src']).eql([notification.sender.avatar])
    })
  })

  describe('when notification has type ride_request_created', () => {
    const notification = {
      ...Notification(),
      notification_type: 'ride_request_created',
    }
    const component = shallow(<NotificationsItem {...props} notification={notification} />)

    it('displays RideRequestUpdated component', () => {
      expect(component).to.have.exactly(1).descendants('RideRequestCreated')
      expect(component.find('RideRequestCreated')).to.have.props(['notification']).eql([notification])
    })

    it('displays notification sender avatar with link', () => {
      expect(component).to.have.exactly(1).descendants('Link')
      expect(component.find('Link')).to.have.props(['to']).eql([`/users/${notification.sender.id}`])
      expect(component.find('Link').dive()).to.have.exactly(1).descendants('Avatar')
      expect(component.find('Link').dive().find('Avatar')).to.have.props(['src']).eql([notification.sender.avatar])
    })
  })

  describe('when notification was not seen', () => {
    it('calls markAsSeen on hover', () => {
      const notification = {
        ...Notification(),
        seen_at: null
      }
      const markAsSeen = sinon.spy()
      const component = mount (
        <MuiThemeProvider>
          <NotificationsItem notification={notification} markAsSeen={markAsSeen} />
        </MuiThemeProvider>
      )

      component.find('NotificationsItem').simulate('mouseOver')

      expect(markAsSeen).to.have.been.calledOnce
    })
  })

  describe('when notification was seen', () => {
    it('does not call markAsSeen on hover', () => {
      const notification = {
        ...Notification(),
        seen_at: '2016-11-19T18:08:56.287Z'
      }
      const markAsSeen = sinon.spy()
      const component = mount (
        <MuiThemeProvider>
          <NotificationsItem notification={notification} markAsSeen={markAsSeen} />
        </MuiThemeProvider>
      )

      component.find('NotificationsItem').simulate('mouseOver')

      expect(markAsSeen).to.have.not.been.calledOnce
    })
  })
})
