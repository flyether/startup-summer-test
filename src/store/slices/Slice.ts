import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  token: '',
};


export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    removeSlice(state) {
      state.searchValue = '';
      state.token = '';
    },
  },
});

export const { setSearchValue, setToken, removeSlice} =
  slice.actions;
export default slice.reducer;
