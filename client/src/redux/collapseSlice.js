import { createSlice } from '@reduxjs/toolkit';

export const collapseSlice = createSlice({
  name: 'collapse',
  initialState: {
    value: false,
  },
  reducers: {
    toggle: state => {
      state.value = !state.value
    }
  },
});

export const { toggle } = collapseSlice.actions;

export const selectCollapse = state => state.collapse.value;

export default collapseSlice.reducer;
