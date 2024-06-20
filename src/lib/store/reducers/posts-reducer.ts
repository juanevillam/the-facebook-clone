import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { locationType } from '@/modules/posts/components/create/shared/check-in/item/create-post-check-in-item';
import { feelings } from '@/modules/posts/components/create/shared/feelings/create-post-feelings';

type stepType = 'default' | 'feelings' | 'media' | 'gif' | 'check-in';

type mediaType = {
  file: string | ArrayBuffer | null;
  playing: boolean;
  type: string | null;
};

type fellingType = (typeof feelings)[number];

interface initialState {
  createPostOpenableOpen: boolean;
  step: stepType;
  thoughts: string;
  media: mediaType;
  activeFeeling: fellingType | null;
  checkIn: {
    activeLocation: locationType | null;
    searchInputValue: string;
    locations: locationType[];
  };
}

const initialState: initialState = {
  createPostOpenableOpen: false,
  step: 'default',
  thoughts: '',
  media: {
    file: '',
    playing: false,
    type: null,
  },
  activeFeeling: null,
  checkIn: {
    activeLocation: null,
    searchInputValue: '',
    locations: [],
  },
};

export const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleCreatePostOpenable(state) {
      state.createPostOpenableOpen = !state.createPostOpenableOpen;
    },
    setStep(state, action: PayloadAction<stepType>) {
      state.step = action.payload;
    },
    setThoughts(state, action: PayloadAction<string>) {
      state.thoughts = action.payload;
    },
    setMedia(state, action: PayloadAction<mediaType>) {
      state.media = action.payload;
    },
    setActiveFeeling(state, action: PayloadAction<fellingType | null>) {
      state.activeFeeling = action.payload;
    },
    setLocations(state, action: PayloadAction<locationType[]>) {
      state.checkIn.locations = action.payload;
    },
    setCheckInSeachInputValue(state, action: PayloadAction<string>) {
      state.checkIn.searchInputValue = action.payload;
    },
    setActiveLocation(state, action: PayloadAction<locationType | null>) {
      state.checkIn.activeLocation = action.payload;
    },
  },
});

export const {
  toggleCreatePostOpenable,
  setStep,
  setThoughts,
  setMedia,
  setActiveFeeling,
  setLocations,
  setCheckInSeachInputValue,
  setActiveLocation,
} = posts.actions;
export default posts.reducer;
