import {useQuery} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import MovieService from '../apis/MovieService';
import {
  IMoviesData,
  addMoviesAtBeginning,
  addMoviesAtEnd,
} from '../store/reducers/movieReducer';
import {useCallback} from 'react';

const useMovies = () => {
  const {selectedPagination, scrollDirection} = useSelector(
    (state: RootState) => state.pagination,
  );
  const movies = useSelector((state: RootState) => state.movies);
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const getSelectedYearData = useCallback(() => {
    const selectedYearData = movies.find((movie, index) => {
      const year = Object.keys(movie)[index];
      return year === selectedPagination;
    });
    if (!selectedYearData) {
      return null;
    }
    return selectedYearData[selectedPagination];
  }, [movies, selectedPagination]);

  const pushDataBasedOnScrollDirection = (movieData: IMoviesData) => {
    const selectedYearData = getSelectedYearData();
    if (!selectedYearData) {
      if (scrollDirection === 'down') {
        dispatch(addMoviesAtEnd(movieData));
      } else {
        dispatch(addMoviesAtBeginning(movieData));
      }
    }
  };

  const {isLoading, isSuccess} = useQuery({
    queryKey: [
      'movies',
      {
        year: selectedPagination,
      },
    ],
    enabled: filter.selectedFilter?.id === 0,
    queryFn: () => MovieService.getMoviesByYear(selectedPagination, 1),

    onSuccess: data => {
      const movieData = {
        [selectedPagination]: {
          movies: data.results,
          totalPages: data.total_pages,
          totalResults: data.total_results,
        },
      };
      if (movies.length === 0) {
        dispatch(addMoviesAtBeginning(movieData));
        return;
      }
      pushDataBasedOnScrollDirection(movieData);
      return;
    },
  });

  const {isLoading: isFilterDataLoading, isSuccess: isFilterDataFetched} =
    useQuery({
      queryKey: [
        'movies',
        {
          year: selectedPagination,
          filter: filter.selectedFilter?.id,
        },
      ],
      enabled: filter.selectedFilter?.id !== 0,
      queryFn: () =>
        MovieService.getMoviesByGenre(
          filter.selectedFilter.id,
          1,
          parseInt(selectedPagination, 10),
        ),
      onSuccess: data => {
        const movieData = {
          [selectedPagination]: {
            movies: data.results, // Access the 'data' property first
            totalPages: data.total_pages,
            totalResults: data.total_results,
          },
        };
        if (movies.length === 0) {
          dispatch(addMoviesAtBeginning(movieData));
          return;
        }
      },
    });
  return {
    isLoading: isLoading || isFilterDataLoading,
    isSuccess: isSuccess || isFilterDataFetched,
  };
};
export default useMovies;
