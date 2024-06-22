import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GIF } from '../assets/types';

interface GifsState {
  activeGif: GIF | null;
  searchInputValue: string;
  gifs: GIF[];
}

const initialState: GifsState = {
  activeGif: null,
  searchInputValue: '',
  gifs: [],
};

const gifsSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {
    setGifs(state, action: PayloadAction<GIF[]>) {
      state.gifs = action.payload;
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
