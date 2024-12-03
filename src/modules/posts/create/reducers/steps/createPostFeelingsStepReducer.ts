import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { feelings } from '../../assets/feelings';
import { Feeling } from '../../types';

type CreatePostFeelingsStepState = {
  activeFeeling: Feeling | null;
  searchInputValue: string;
  feelings: readonly Feeling[];
};

const initialState: CreatePostFeelingsStepState = {
  activeFeeling: null,
  searchInputValue: '',
  feelings,
};

const createPostFeelingsStepSlice = createSlice({
  name: 'createPostFeelingsStep',
  initialState,
  reducers: {
    setCreatePostFeelingsStepFeelings(state, action: PayloadAction<Feeling[]>) {
      state.feelings = action.payload;
    },
    setCreatePostFeelingsStepSearchInputValue(
      state,
      action: PayloadAction<string>
    ) {
      state.searchInputValue = action.payload;
    },
    setCreatePostFeelingsStepActiveFeeling(
      state,
      action: PayloadAction<Feeling | null>
    ) {
      state.activeFeeling = action.payload;
    },
  },
});

export const {
  setCreatePostFeelingsStepFeelings,
  setCreatePostFeelingsStepSearchInputValue,
  setCreatePostFeelingsStepActiveFeeling,
} = createPostFeelingsStepSlice.actions;

export default createPostFeelingsStepSlice.reducer;
