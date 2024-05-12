import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface IPagination {
  page: number;
  year: string;
}
export interface IPaginationState {
  selectedPagination: IPagination;
  scrollDirection: string;
}
const initialState: IPaginationState = {
  selectedPagination: {
    page: 1,
    year: '2012',
  },
  scrollDirection: 'down',
};
export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initialState,
  reducers: {
    selectPagination: (state, action: PayloadAction<IPagination>) => {
      state.selectedPagination = action.payload;
    },
    setScrollDirection: (state, action: PayloadAction<string>) => {
      state.scrollDirection = action.payload;
    },
  },
});

export const {selectPagination, setScrollDirection} = paginationSlice.actions;

export default paginationSlice.reducer;
