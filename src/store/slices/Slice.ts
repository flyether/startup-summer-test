import { createSlice } from "@reduxjs/toolkit";

export type InitialStateProps = {
  searchValue: string;
  token: string;
  favoriteArray: number[] | null;
  catalogue: string;
  payment_from: number | null;
  payment_to: number | null;
};

const initialState: InitialStateProps = {
  searchValue: "",
  payment_to: null,
  payment_from: null,
  catalogue: "",
  token: "",
  favoriteArray: [],
};

const favoriteArrayFromLocalStorage = localStorage.getItem("favoriteArray");
initialState.favoriteArray = favoriteArrayFromLocalStorage
  ? JSON.parse(favoriteArrayFromLocalStorage)
  : [];

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCatalogue(state, action) {
      state.catalogue = action.payload;
    },
    setPaymentTo(state, action) {
      state.payment_to = action.payload;
    },
    setPaymentFrom(state, action) {
      state.payment_from = action.payload;
    },
    setFavoriteArray(state, action) {
      state.favoriteArray = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    removeSlice(state) {
      state.searchValue = "";
      state.token = "";
    },
  },
});

export const {
  setSearchValue,
  setPaymentFrom,
  setPaymentTo,
  setCatalogue,
  setToken,
  removeSlice,
  setFavoriteArray,
} = slice.actions;
export default slice.reducer;
