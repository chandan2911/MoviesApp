import {useQuery} from 'react-query';
import MovieService from '../apis/MovieService';
import {useDispatch} from 'react-redux';
import {addFilters, selectFilter} from '../store/reducers/filterReducer';
import {useEffect} from 'react';

const useFilters = (): {
  isLoading: boolean;
  error: any;
  isSuccess: boolean;
} => {
  const {isLoading, error, isSuccess, data} = useQuery(
    'genres',
    MovieService.getGenres,
    {
      retry: 3,
    },
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading && isSuccess) {
      dispatch(addFilters(data?.genres));
    }
  }, [data, dispatch, isLoading, isSuccess]);

  return {
    isLoading,
    error,
    isSuccess,
  };
};
export default useFilters;
