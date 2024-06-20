import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { feelings } from '@/modules/posts/components/create/shared/feelings/create-post-feelings';

type stepType = 'default' | 'feelings' | 'media' | 'gif';

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
  },
});

export const {
  toggleCreatePostOpenable,
  setStep,
  setThoughts,
  setMedia,
  setActiveFeeling,
} = posts.actions;
export default posts.reducer;
