import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Location } from '../assets/types';

interface CheckInState {
  activeLocation: Location | null;
  searchInputValue: string;
  locations: Location[];
  error: boolean;
}

const initialState: CheckInState = {
  activeLocation: null,
  searchInputValue: '',
  locations: [],
  error: false,
};

const checkInSlice = createSlice({
  name: 'checkIn',
  initialState,
  reducers: {
    setLocations(
      state,
      action: PayloadAction<{ locations: Location[]; error: boolean }>
    ) {
      state.locations = action.payload.locations;
      state.error = action.payload.error;
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
