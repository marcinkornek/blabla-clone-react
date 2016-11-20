export function Car() {
  return ({
    id: 1,
    brand: 'Ford',
    model: 'Focus',
    full_name: 'Ford Focus',
    production_year: '1999',
    comfort: 'basic',
    comfort_stars: 1,
    places: 3,
    places_full: '3 places',
    color: 'black',
    category: 'sedan',
    created_at: '2016-05-06T20:33:13.861Z',
    owner_id: 1,
    car_photo: 'http://example.com/car_photo.jpg',
  })
}

export function Car2() {
  return ({
    id: 1,
    brand: 'Porsche',
    model: '911',
    full_name: 'Porsche 911',
    production_year: '1965',
    comfort: 'luxury',
    comfort_stars: 4,
    places: 2,
    places_full: '2 places',
    color: 'yellow',
    category: 'sedan',
    created_at: '2016-10-06T20:33:13.861Z',
    owner_id: 1,
    car_photo: 'http://example.com/car_photo2.jpg',
  })
}

export function Pagination() {
  return ({
    current_page: 1,
    next_page: 2,
    prev_page: null,
    total_count: 18,
    total_pages: 2
  })
}
