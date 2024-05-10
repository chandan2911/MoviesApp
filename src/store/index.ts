import {configureStore} from '@reduxjs/toolkit';
import filterReducer from './reducers/filterReducer';
import movieReducer from './reducers/movieReducer';
import paginationReducer from './reducers/paginationReducer';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    movies: movieReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
