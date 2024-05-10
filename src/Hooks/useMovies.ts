import {useQuery} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import MovieService from '../apis/MovieService';
import {
  IMoviesData,
  addMoviesAtBeginning,
  addMoviesAtEnd,
} from '../store/reducers/movieReducer';

const useMovies = () => {
  const {selectedPagination, scrollDirection} = useSelector(
    (state: RootState) => state.pagination,
  );
  const movies = useSelector((state: RootState) => state.movies);
  const dispatch = useDispatch();

  const pushDataBasedOnScrollDirection = (movieData: IMoviesData) => {
    if (scrollDirection === 'down') {
      dispatch(addMoviesAtEnd(movieData));
    } else {
      dispatch(addMoviesAtBeginning(movieData));
    }
  };

  const {isLoading, isSuccess} = useQuery({
    queryKey: [
      'movies',
      {
        page: selectedPagination?.page,
        year: selectedPagination?.year,
      },
    ],
    queryFn: () =>
      MovieService.getMoviesByYear(
        selectedPagination.year,
        selectedPagination.page,
      ),
    onSuccess: data => {
      const movieData = {
        [selectedPagination.year]: {
          movies: data.results, // Access the 'data' property first
          totalPages: data.total_pages,
          totalResults: data.total_results,
        },
      };
      if (movies.length === 0) {
        dispatch(addMoviesAtBeginning(movieData));
        return;
      } else {
        if (movieData[selectedPagination.year].movies.length > 0) {
          // TODO: Add logic to handle if data already exists for that year
        } else {
          // TODO: Add logic to handle if data does not exist for that year
        }
      }
    },
  });
  return {
    isLoading,
    isSuccess,
  };
};
export default useMovies;
