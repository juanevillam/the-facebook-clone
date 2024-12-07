import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GIF } from '../../types';

type CreatePostGifsStepState = {
  activeGif: GIF | null;
  searchInputValue: string;
  gifs: GIF[];
  error: boolean;
};

const initialState: CreatePostGifsStepState = {
  activeGif: null,
  searchInputValue: '',
  gifs: [],
  error: false,
};

const createPostGifsStepSlice = createSlice({
  name: 'createPostGifsStep',
  initialState,
  reducers: {
    setCreatePostGifsStepGifs(
      state,
      action: PayloadAction<{ gifs: GIF[]; error: boolean }>
    ) {
      state.gifs = action.payload.gifs;
      state.error = action.payload.error;
    },
    setCreatePostGifsStepSearchInputValue(
      state,
      action: PayloadAction<string>
    ) {
      state.searchInputValue = action.payload;
    },
    setCreatePostGifsStepActiveGif(state, action: PayloadAction<GIF | null>) {
      state.activeGif = action.payload;
    },
  },
});

export const {
  setCreatePostGifsStepGifs,
  setCreatePostGifsStepSearchInputValue,
  setCreatePostGifsStepActiveGif,
} = createPostGifsStepSlice.actions;

export default createPostGifsStepSlice.reducer;
