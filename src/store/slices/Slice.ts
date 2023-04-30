import { createSlice } from '@reduxjs/toolkit';

export type InitialStateProps = {
  searchValue: string;
  token: string;
  favoriteArray: number[] | null;
}

const initialState: InitialStateProps = {
  searchValue: '',
  token: '',
  favoriteArray:[],
};

const favoriteArrayFromLocalStorage = localStorage.getItem('favoriteArray');
initialState.favoriteArray = favoriteArrayFromLocalStorage
  ? JSON.parse(favoriteArrayFromLocalStorage):[];

export const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFavoriteArray(state, action) {
      state.favoriteArray = action.payload;
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

export const { setSearchValue, setToken, removeSlice, setFavoriteArray} =
  slice.actions;
export default slice.reducer;
