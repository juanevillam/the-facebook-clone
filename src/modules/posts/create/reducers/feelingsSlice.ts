import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { feelings } from '../assets/feelings';
import { Feeling } from '../assets/types';

type FeelingsState = {
  activeFeeling: Feeling | null;
  searchInputValue: string;
  feelings: readonly Feeling[];
};

const initialState: FeelingsState = {
  activeFeeling: null,
  searchInputValue: '',
  feelings,
};

const feelingsSlice = createSlice({
  name: 'feelings',
  initialState,
  reducers: {
    setFeelings(state, action: PayloadAction<Feeling[]>) {
      state.feelings = action.payload;
    },
    setFeelingsSearchInputValue(state, action: PayloadAction<string>) {
      state.searchInputValue = action.payload;
    },
    setActiveFeeling(state, action: PayloadAction<Feeling | null>) {
      state.activeFeeling = action.payload;
    },
  },
});

export const { setFeelings, setFeelingsSearchInputValue, setActiveFeeling } =
  feelingsSlice.actions;
export default feelingsSlice.reducer;
