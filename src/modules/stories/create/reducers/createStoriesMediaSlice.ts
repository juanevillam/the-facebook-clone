import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Media } from '@/assets/types';

const initialState: Media = {
  file: null,
  type: null,
};

const createStoriesMediaSlice = createSlice({
  name: 'createStoriesMedia',
  initialState,
  reducers: {
    setCreateStoryMedia(state, action: PayloadAction<Media>) {
      state.file = action.payload.file;
      state.type = action.payload.type;
    },
  },
});

export const { setCreateStoryMedia } = createStoriesMediaSlice.actions;
export default createStoriesMediaSlice.reducer;
