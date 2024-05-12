import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {selectPagination} from '../store/reducers/paginationReducer';

const usePagination = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies);
  const {selectedPagination} = useSelector(
    (state: RootState) => state.pagination,
  );

  const getSelectedYearData = useCallback(() => {
    const selectedYearData = movies.find((movie, index) => {
      const year = Object.keys(movie)[index];
      return year === selectedPagination.year;
    });
    if (!selectedYearData) {
      return null;
    }
    return selectedYearData[selectedPagination.year];
  }, [movies, selectedPagination.year]);

  const isLastPage = useMemo(() => {
    const selectedYearData = getSelectedYearData();
    if (!selectedYearData) {
      return true;
    }
    return (
      Math.min(selectedYearData?.totalPages, 2) === selectedPagination.page
    );
  }, [getSelectedYearData, selectedPagination.page]);

  const isFirstPage = useMemo(() => {
    return selectedPagination.page === 1;
  }, [selectedPagination.page]);

  const handleNextPage = () => {
    if (isLastPage) {
      dispatch(
        selectPagination({
          page: 1,
          year: ((selectedPagination.year as unknown as number) + 1).toString(),
        }),
      );
    }
    dispatch(
      selectPagination({
        page: selectedPagination.page + 1,
        year: selectedPagination.year,
      }),
    );
  };
  const handlePreviousPage = () => {
    if (isFirstPage) {
      dispatch(
        selectPagination({
          page: 2,
          year: ((selectedPagination.year as unknown as number) - 1).toString(),
        }),
      );
    }
    dispatch(
      selectPagination({
        page: selectedPagination.page - 1,
        year: selectedPagination.year,
      }),
    );
  };
  return {
    handleNextPage,
    handlePreviousPage,
  };
};

export default usePagination;
