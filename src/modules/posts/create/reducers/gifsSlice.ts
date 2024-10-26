import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GIF } from '../assets/types';

type GifsState = {
  activeGif: GIF | null;
  searchInputValue: string;
  gifs: GIF[];
  error: boolean;
};

const initialState: GifsState = {
  activeGif: null,
  searchInputValue: '',
  gifs: [],
  error: false,
};

const gifsSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {
    setGifs(state, action: PayloadAction<{ gifs: GIF[]; error: boolean }>) {
      state.gifs = action.payload.gifs;
      state.error = action.payload.error;
    },
    setGifsSearchInputValue(state, action: PayloadAction<string>) {
      state.searchInputValue = action.payload;
    },
    setActiveGif(state, action: PayloadAction<GIF | null>) {
      state.activeGif = action.payload;
    },
  },
});

export const { setGifs, setGifsSearchInputValue, setActiveGif } =
  gifsSlice.actions;
export default gifsSlice.reducer;
