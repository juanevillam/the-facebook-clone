import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Media } from '@/assets/types';

const initialState: Media = {
  file: null,
  type: null,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setMedia(state, action: PayloadAction<Media>) {
      state.file = action.payload.file;
      state.type = action.payload.type;
    },
  },
});

export const { setMedia } = mediaSlice.actions;
export default mediaSlice.reducer;
