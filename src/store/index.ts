import {configureStore} from '@reduxjs/toolkit';
import filterReducer from './reducers/filterReducer';
import movieReducer from './reducers/movieReducer';
import paginationReducer from './reducers/paginationReducer';
import accordionReducer from './reducers/accordionReducer';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    movies: movieReducer,
    pagination: paginationReducer,
    accordion: accordionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
