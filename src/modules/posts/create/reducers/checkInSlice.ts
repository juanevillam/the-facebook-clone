import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Location } from '../assets/types';

interface CheckInState {
  activeLocation: Location | null;
  searchInputValue: string;
  locations: Location[];
}

const initialState: CheckInState = {
  activeLocation: null,
  searchInputValue: '',
  locations: [],
};

const checkInSlice = createSlice({
  name: 'checkIn',
  initialState,
  reducers: {
    setLocations(state, action: PayloadAction<Location[]>) {
      state.locations = action.payload;
    },
    setCheckInSearchInputValue(state, action: PayloadAction<string>) {
      state.searchInputValue = action.payload;
    },
    setActiveLocation(state, action: PayloadAction<Location | null>) {
      state.activeLocation = action.payload;
    },
  },
});

export const { setLocations, setCheckInSearchInputValue, setActiveLocation } =
  checkInSlice.actions;
export default checkInSlice.reducer;
