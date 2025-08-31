import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  seats: number;
}

interface CarsState {
  cars: Car[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CarsState = {
  cars: [],
  isLoading: false,
  error: null,
};

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  const response = await fetch('/api/cars');
  return response.json();
});

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch cars';
      });
  },
});

export default carsSlice.reducer;