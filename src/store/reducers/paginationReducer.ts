import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface IPagination {
  page: number;
  year: number;
}
export interface IPaginationState {
  selectedPagination: IPagination;
  pagination: IPagination[];
  scrollDirection: string;
}
const initialState: IPaginationState = {
  selectedPagination: {
    page: 1,
    year: 2012,
  },
  pagination: [
    {
      page: 1,
      year: 2012,
    },
  ],
  scrollDirection: 'down',
};
export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initialState,
  reducers: {
    addNextPage: (state, action: PayloadAction<IPagination>) => {
      state.pagination.push(action.payload);
    },
    addPreviousPage: (state, action: PayloadAction<IPagination>) => {
      state.pagination.unshift(action.payload);
    },
    selectPagination: (state, action: PayloadAction<IPagination>) => {
      state.selectedPagination = action.payload;
    },
    setScrollDirection: (state, action: PayloadAction<string>) => {
      state.scrollDirection = action.payload;
    },
  },
});

export const {
  addNextPage,
  addPreviousPage,
  selectPagination,
  setScrollDirection,
} = paginationSlice.actions;

export default paginationSlice.reducer;
