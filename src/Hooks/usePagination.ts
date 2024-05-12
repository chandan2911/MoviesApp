import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  setSelectedPagination,
  setMaxYearPaginated,
  setMinYearPaginated,
  setScrollDirection,
} from '../store/reducers/paginationReducer';

const usePagination = () => {
  const dispatch = useDispatch();
  const maxYear = new Date().getFullYear().toString();
  const minYear = '1980';
  const {maxYearPaginated, minYearPaginated} = useSelector(
    (state: RootState) => state.pagination,
  );

  const handleNextPage = () => {
    if (maxYearPaginated === maxYear) {
      return;
    }
    dispatch(setScrollDirection('down'));

    dispatch(
      setSelectedPagination((parseInt(maxYearPaginated, 10) + 1).toString()),
    );
    dispatch(
      setMaxYearPaginated((parseInt(maxYearPaginated, 10) + 1).toString()),
    );
  };

  const handlePreviousPage = () => {
    if (minYearPaginated === minYear) {
      return;
    }
    dispatch(setScrollDirection('up'));
    dispatch(
      setMinYearPaginated((parseInt(minYearPaginated, 10) - 1).toString()),
    );
    dispatch(
      setSelectedPagination((parseInt(minYearPaginated, 10) - 1).toString()),
    );
  };

  return {
    handleNextPage,
    handlePreviousPage,
  };
};

export default usePagination;
