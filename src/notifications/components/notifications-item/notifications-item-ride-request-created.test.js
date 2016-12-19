import ConnectedComponent, { RideRequestCreated } from './notifications-item-ride-request-created'
import { Notification } from 'test/support/fixtures'

describe('<RideRequestCreated />', () => {
  const notificationSender = Notification().sender
  const notificationRide = Notification().ride
  const props = {
    notification: Notification()
  }
  const component = shallow(<RideRequestCreated {...props} />)

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
    expect(component).to.include.text('added ride request for your ride')
  })
})
