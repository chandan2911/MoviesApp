import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IFilter {
  id: number;
  name: string;
}

export interface IFilterState {
  selectedFilter: IFilter | null;
  filters: IFilter[];
}

const initialState: IFilterState = {
  selectedFilter: {
    id: 0,
    name: 'All',
  },
  filters: [
    {
      id: 0,
      name: 'All',
    },
  ],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<IFilter>) => {
      state.filters.push(action.payload);
    },
    addFilters: (state, action: PayloadAction<IFilter[]>) => {
      state.filters = [...state.filters, ...action.payload];
    },
    selectFilter: (state, action: PayloadAction<IFilter>) => {
      state.selectedFilter = action.payload;
    },
  },
});

export const {addFilter, selectFilter, addFilters} = filterSlice.actions;

export default filterSlice.reducer;
