import ConnectedComponent, { CarsIndexItem } from './cars-index-item'
import { Car } from 'test/support/fixtures'

describe('<CarsIndexItem />', () => {
  describe('when car belongs to current user', () => {
    const currentUserId = Car().owner_id
    const props = {
      car: Car(),
      currentUserId
    }
    const component = shallow(<CarsIndexItem {...props} />)

    it('displays car photo', () => {
      expect(component).to.have.exactly(1).descendants('img')
      expect(component.find('img')).to.have.attr('src', Car().car_photo)
    })

    it('displays link to car', () => {
      expect(component).to.have.descendants('Link')
    })

    it('displays comfort stars', () => {
      expect(component).to.have.exactly(1).descendants('Stars')
    })

    it('displays action buttons', () => {
      expect(component).to.have.descendants('CarActions')
    })
  })

  describe('when car does not belong to current user', () => {
    const currentUserId = Car().owner_id + 1
    const props = {
      car: Car(),
      currentUserId
    }
    const component = shallow(<CarsIndexItem {...props} />)

    it('displays car photo', () => {
      expect(component).to.have.exactly(1).descendants('img')
      expect(component.find('img')).to.have.attr('src', Car().car_photo)
    })

    it('displays link to car', () => {
      expect(component).to.have.descendants('Link')
    })

    it('displays comfort stars', () => {
      expect(component).to.have.exactly(1).descendants('Stars')
    })

    it('does not display action buttons', () => {
      expect(component).not.to.have.descendants('CarActions')
    })
  })
})
