import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import ridesSlice from './slices/ridesSlice';
import carsSlice from './slices/carsSlice';
import usersSlice from './slices/usersSlice';
import notificationsSlice from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    rides: ridesSlice,
    cars: carsSlice,
    users: usersSlice,
    notifications: notificationsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;