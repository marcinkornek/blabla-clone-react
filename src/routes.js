// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as components from './components';

const {
  Application,
  Home,
  Login,
  requireAuth,
  requireNoAuth,
  UserNew,
  UserShow,
  UserEdit,
  UsersIndex,
  CarNew,
  CarShow,
  CarEdit,
  CarsIndex,
  RideNew,
  RideShow,
  RideEdit,
  RidesIndex,
  RidesIndexDriver,
  RidesIndexPassenger,
  NotificationsIndex,
} = components;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Application />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<UserNew />} />
        <Route path="users/:id" element={<UserShow />} />
        <Route path="users/:id/edit" element={<UserEdit />} />
        <Route path="users" element={<UsersIndex />} />
        <Route path="cars/new" element={<CarNew />} />
        <Route path="cars/:id" element={<CarShow />} />
        <Route path="cars/:id/edit" element={<CarEdit />} />
        <Route path="cars" element={<CarsIndex />} />
        <Route path="rides/new" element={<RideNew />} />
        <Route path="rides/:id" element={<RideShow />} />
        <Route path="rides/:id/edit" element={<RideEdit />} />
        <Route path="rides" element={<RidesIndex />} />
        <Route path="rides-driver" element={<RidesIndexDriver />} />
        <Route path="rides-passenger" element={<RidesIndexPassenger />} />
        <Route path="notifications" element={<NotificationsIndex />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;