import ConnectedComponent, { CarActions } from './car-actions'
import { Car } from 'test/support/fixtures'

describe('<CarActions />', () => {
  describe('when car belongs to current user', () => {
    const props = {
      carId: Car().id
    }
    const component = shallow(<CarActions {...props} />)

    it('displays link to car edit', () => {
      expect(component).to.have.descendants('Link')
    })

    it('displays two overlay triggers', () => {
      expect(component).to.have.exactly(2).descendants('OverlayTrigger')
    })
  })
})
