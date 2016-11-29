export function User() {
  return ({
    id: 1,
    first_name: 'Harry',
    last_name: 'Potter',
    full_name: 'Harry P',
    email: 'harry.potter@a.com',
    tel_num: '111222333',
    date_of_birth: '1990-01-01',
    created_at: '2016-04-28T06:21:42.994Z',
    updated_at: '2016-11-22T07:10:47.705Z',
    age: 26,
    avatar: 'http://example.com/avatar.jpg',
    gender: 'male',
    role: 'user',
    last_seen_at: '2016-11-22T07:10:47.705Z',
    cars: {
      items: [{
        id: 1,
        owner_id: 1,
        full_name: 'Ford Focus',
        comfort: 'basic',
        comfort_stars: 1,
        places_full: '3 places',
        car_photo: 'http://example.com/car_photo.jpg',
      }]
    },
    rides_as_driver: {
      items: [{
        id: 1,
        currency: 'eur',
        destination_city: 'Kraków, Polska',
        free_places_count: 2,
        places: 2,
        places_full: '2 places',
        price: '23.0',
        start_city: 'Wrocław, Polska',
        start_date: '2016-07-09T06:21:18.984Z',
        car: {
          id: 1,
          owner_id: 1,
          full_name: 'Ford Focus',
          comfort: 'basic',
          comfort_stars: 1,
          places_full: '3 places',
          car_photo: 'http://example.com/car_photo.jpg',
        }
      }]
    }
  })
}

export function CurrentUser() {
  return ({
    id: 1,
    first_name: 'Harry',
    last_name: 'Potter',
    full_name: 'Harry P',
    email: 'harry.potter@a.com',
    tel_num: '111222333',
    date_of_birth: '1990-01-01',
    created_at: '2016-04-28T06:21:42.994Z',
    updated_at: '2016-11-22T07:10:47.705Z',
    age: 26,
    avatar: 'http://example.com/avatar.jpg',
    gender: 'male',
    role: 'user',
    last_seen_at: '2016-11-22T07:10:47.705Z',
  })
}

export function CurrentUser2() {
  return ({
    id: 1,
    first_name: 'Barry',
    last_name: 'Potter',
    full_name: 'Barry P',
    email: 'barry.potter@a.com',
    tel_num: '666222333',
    date_of_birth: '1995-01-01',
    created_at: '2015-04-28T06:21:42.994Z',
    updated_at: '2015-11-22T07:10:47.705Z',
    age: 21,
    avatar: 'http://example.com/avatar2.jpg',
    gender: 'male',
    role: 'user',
    last_seen_at: '2016-11-22T07:10:47.705Z',
  })
}

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

export function CarOptions() {
  return ({
    colors: ['red', 'blue'],
    comforts: ['basic', 'luxury'],
    categories: ['hatchback', 'sedan']
  })
}

export function Notification() {
  return ({
    id: 1,
    ride_request_id: 1,
    notification_type: 'ride_request_created',
    seen_at: '2016-11-19T18:08:56.287Z',
    created_at: '2016-11-19T17:08:56.287Z',
    sender: {
      id: 1,
      full_name: 'Harry P',
      age: 26,
      avatar: 'http://example.com/avatar.jpg',
    },
    receiver: {
      id: 2,
      full_name: 'Barry P',
      age: 21,
      avatar: 'http://example.com/avatar2.jpg',
    },
    ride: {
      id: 1,
      start_city: 'Opole, Polska',
      destination_city: 'Wrocław, Polska',
      start_date: '2016-12-23T23:00:00.000Z',
      price: '12.0',
      currency: 'pln',
    }
  })
}

export function Notification2() {
  return ({
    id: 2,
    ride_request_id: 2,
    notification_type: 'ride_request_created',
    seen_at: null,
    created_at: '2016-11-19T17:08:56.287Z',
    sender: {
      id: 1,
      full_name: 'Harry P',
      age: 26,
      avatar: 'http://example.com/avatar.jpg',
    },
    receiver: {
      id: 2,
      full_name: 'Barry P',
      age: 21,
      avatar: 'http://example.com/avatar2.jpg',
    },
    ride: {
      id: 1,
      start_city: 'Opole, Polska',
      destination_city: 'Wrocław, Polska',
      start_date: '2016-12-23T23:00:00.000Z',
      price: '12.0',
      currency: 'pln',
    }
  })
}

export function NotificationWithUnreadCount() {
  return ({
    id: 3,
    ride_request_id: 3,
    notification_type: 'ride_request_created',
    seen_at: null,
    created_at: '2016-11-19T17:08:56.287Z',
    sender: {
      id: 1,
      full_name: 'Harry P',
      age: 26,
      avatar: 'http://example.com/avatar.jpg',
    },
    receiver: {
      id: 2,
      full_name: 'Barry P',
      age: 21,
      avatar: 'http://example.com/avatar2.jpg',
    },
    ride: {
      id: 1,
      start_city: 'Opole, Polska',
      destination_city: 'Wrocław, Polska',
      start_date: '2016-12-23T23:00:00.000Z',
      price: '12.0',
      currency: 'pln',
    },
    unread_count: 2,
  })
}

export function Ride() {
  return ({
    id: 1,
    car: {
      id: 1,
      full_name: 'Ford Focus',
      comfort: 'basic',
      comfort_stars: 1,
      places_full: '3 places',
      owner_id: 1,
      car_photo: 'http://example.com/car_photo.jpg',
    },
    car_id: 1,
    currency: 'usd',
    destination_city: 'Wrocław, Polska',
    driver: {
      id: 1,
      full_name: 'Barry P',
      age: 21,
      avatar: 'http://example.com/avatar2.jpg',
    },
    free_places_count: 5,
    places: 5,
    places_full: '5 places',
    price: '2.0',
    start_city: 'Opole, Polska',
    start_date: '2016-11-26T23:00:00.000Z',
  })
}

export function Ride2() {
  return ({
    id: 1,
    car: {
      id: 1,
      full_name: 'Ford Focus',
      comfort: 'basic',
      comfort_stars: 1,
      places_full: '3 places',
      owner_id: 1,
      car_photo: 'http://example.com/car_photo.jpg',
    },
    car_id: 1,
    currency: 'usd',
    destination_city: 'Wrocław, Polska',
    driver: {
      id: 1,
      full_name: 'Barry P',
      age: 21,
      avatar: 'http://example.com/avatar2.jpg',
    },
    free_places_count: 4,
    places: 4,
    places_full: '4 places',
    price: '12.0',
    start_city: 'Wrocław, Polska',
    start_date: '2016-11-28T23:00:00.000Z',
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

export function PaginationWithUnreadCount() {
  return ({
    current_page: 1,
    next_page: 2,
    prev_page: null,
    total_count: 18,
    total_pages: 2,
    unread_count: 2,
  })
}
