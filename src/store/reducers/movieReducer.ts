import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface IMoviesData {
  [year: string]: {
    movies: Movie[];
    totalPages: number;
    totalResults: number;
  };
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const initialState: IMoviesData[] = [];

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMoviesAtBeginning: (state, action: PayloadAction<IMoviesData>) => {
      state.unshift(action.payload); // Add movie at the beginning of the array
    },
    addMoviesAtEnd: (state, action: PayloadAction<IMoviesData>) => {
      state.push(action.payload); // Add movie at the end of the array
    },
    resetMovieData: state => {
      state = [];
      return state;
    },
  },
});

export const {addMoviesAtBeginning, addMoviesAtEnd, resetMovieData} =
  movieSlice.actions;
export default movieSlice.reducer;
