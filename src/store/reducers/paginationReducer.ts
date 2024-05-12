import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface IPaginationState {
  selectedPagination: string;
  maxYearPaginated: string;
  minYearPaginated: string;
  scrollDirection: string;
}
const initialState: IPaginationState = {
  selectedPagination: '2012',
  maxYearPaginated: '2012',
  minYearPaginated: '2012',
  scrollDirection: 'down',
};
export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: initialState,
  reducers: {
    setSelectedPagination: (state, action: PayloadAction<string>) => {
      state.selectedPagination = action.payload;
    },
    setScrollDirection: (state, action: PayloadAction<string>) => {
      state.scrollDirection = action.payload;
    },
    setMaxYearPaginated: (state, action: PayloadAction<string>) => {
      state.maxYearPaginated = action.payload;
    },
    setMinYearPaginated: (state, action: PayloadAction<string>) => {
      state.minYearPaginated = action.payload;
    },
    resetPagination: state => {
      state.selectedPagination = initialState.selectedPagination;
      state.scrollDirection = initialState.scrollDirection;
      state.maxYearPaginated = initialState.maxYearPaginated;
      state.minYearPaginated = initialState.minYearPaginated;
    },
  },
});

export const {
  setSelectedPagination,
  setScrollDirection,
  setMaxYearPaginated,
  setMinYearPaginated,
  resetPagination,
} = paginationSlice.actions;

export default paginationSlice.reducer;
