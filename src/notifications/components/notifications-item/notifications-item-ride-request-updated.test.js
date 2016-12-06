import ConnectedComponent, { RideRequestUpdated } from './notifications-item-ride-request-updated'
import { Notification } from 'test/support/fixtures'

describe('<RideRequestUpdated />', () => {
  describe('when notification has type ride_request_accepted', () => {
    const notification = {
      ...Notification(),
      notification_type: 'ride_request_accepted'
    }
    const notificationSender = notification.sender
    const notificationRide = notification.ride
    const props = {
      notification: notification
    }
    const component = shallow(<RideRequestUpdated {...props} />)

    it('displays 2 links', () => {
      expect(component).to.have.exactly(2).descendants('Link')
    })

    it('displays link to notification sender', () => {
      expect(component.find('Link').first()).to.have.props(['to']).eql([`/users/${notificationSender.id}`])
      expect(component.find('Link').first().dive()).to.have.text(notificationSender.full_name)
    })

    it('displays link to ride', () => {
      expect(component.find('Link').last()).to.have.props(['to']).eql([`/rides/${notificationRide.id}`])
      expect(component.find('Link').last().dive()).to.include.text(notificationRide.start_city)
      expect(component.find('Link').last().dive()).to.include.text(notificationRide.destination_city)
    })

    it('displays notification timestamp', () => {
      expect(component.find('TimeAgo')).to.have.props(['date']).eql([Notification().created_at])
    })

    it('displays valid text', () => {
      expect(component).to.include.text('accepted your ride request in ride')
    })
  })

  describe('when notification has type ride_request_rejected', () => {
    const notification = {
      ...Notification(),
      notification_type: 'ride_request_rejected'
    }
    const notificationSender = notification.sender
    const notificationRide = notification.ride
    const props = {
      notification: notification
    }
    const component = shallow(<RideRequestUpdated {...props} />)

    it('displays 2 links', () => {
      expect(component).to.have.exactly(2).descendants('Link')
    })

    it('displays link to notification sender', () => {
      expect(component.find('Link').first()).to.have.props(['to']).eql([`/users/${notificationSender.id}`])
      expect(component.find('Link').first().dive()).to.have.text(notificationSender.full_name)
    })

    it('displays link to ride', () => {
      expect(component.find('Link').last()).to.have.props(['to']).eql([`/rides/${notificationRide.id}`])
      expect(component.find('Link').last().dive()).to.include.text(notificationRide.start_city)
      expect(component.find('Link').last().dive()).to.include.text(notificationRide.destination_city)
    })

    it('displays notification timestamp', () => {
      expect(component.find('TimeAgo')).to.have.props(['date']).eql([Notification().created_at])
    })

    it('displays valid text', () => {
      expect(component).to.include.text('rejected your ride request in ride')
    })
  })
})
