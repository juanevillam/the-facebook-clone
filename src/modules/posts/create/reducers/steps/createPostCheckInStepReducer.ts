import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Location } from '../../assets/types';

type CreatePostCheckInStepState = {
  activeLocation: Location | null;
  searchInputValue: string;
  locations: Location[];
  error: boolean;
};

const initialState: CreatePostCheckInStepState = {
  activeLocation: null,
  searchInputValue: '',
  locations: [],
  error: false,
};

const createPostCheckInStepSlice = createSlice({
  name: 'createPostCheckInStep',
  initialState,
  reducers: {
    setCreatePostCheckStepInLocations(
      state,
      action: PayloadAction<{ locations: Location[]; error: boolean }>
    ) {
      state.locations = action.payload.locations;
      state.error = action.payload.error;
    },
    setCreatePostCheckInStepSearchInputValue(
      state,
      action: PayloadAction<string>
    ) {
      state.searchInputValue = action.payload;
    },
    setCreatePostCheckInStepActiveLocation(
      state,
      action: PayloadAction<Location | null>
    ) {
      state.activeLocation = action.payload;
    },
  },
});

export const {
  setCreatePostCheckStepInLocations,
  setCreatePostCheckInStepSearchInputValue,
  setCreatePostCheckInStepActiveLocation,
} = createPostCheckInStepSlice.actions;

export default createPostCheckInStepSlice.reducer;
