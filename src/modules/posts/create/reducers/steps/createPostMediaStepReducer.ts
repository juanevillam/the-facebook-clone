import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Media } from '@/assets/types';

const initialState: Media = {
  file: null,
  type: null,
};

const createPostMediaStepSlice = createSlice({
  name: 'createPostMediaStep',
  initialState,
  reducers: {
    setCreatePostMediaStepMedia(state, action: PayloadAction<Media>) {
      state.file = action.payload.file;
      state.type = action.payload.type;
    },
  },
});

export const { setCreatePostMediaStepMedia } = createPostMediaStepSlice.actions;
export default createPostMediaStepSlice.reducer;
