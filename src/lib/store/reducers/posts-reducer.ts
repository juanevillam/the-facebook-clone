import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { locationType } from '@/modules/posts/components/create/shared/check-in/item/create-post-check-in-item';
import { feelings } from '@/modules/posts/components/create/shared/feelings/create-post-feelings';
import { feelingType } from '@/modules/posts/components/create/shared/feelings/item/create-post-feelings-item';

type stepType = 'default' | 'feelings' | 'media' | 'gif' | 'check-in';

type mediaType = {
  file: string | ArrayBuffer | null;
  playing: boolean;
  type: string | null;
};

interface initialState {
  createPostOpenableOpen: boolean;
  step: stepType;
  thoughts: string;
  media: mediaType;
  feelings: {
    activeFeeling: feelingType | null;
    searchInputValue: string;
    feelings: readonly feelingType[];
  };
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
  feelings: {
    activeFeeling: null,
    searchInputValue: '',
    feelings,
  },
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
    setFeelings(state, action: PayloadAction<feelingType[]>) {
      state.feelings.feelings = action.payload;
    },
    setFeelingsSearchInputValue(state, action: PayloadAction<string>) {
      state.feelings.searchInputValue = action.payload;
    },
    setActiveFeeling(state, action: PayloadAction<feelingType | null>) {
      state.feelings.activeFeeling = action.payload;
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
  setFeelings,
  setFeelingsSearchInputValue,
  setActiveFeeling,
  setLocations,
  setCheckInSeachInputValue,
  setActiveLocation,
} = posts.actions;
export default posts.reducer;
