/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {RootState} from '../store';
import {useSelector} from 'react-redux';
import useMovies from '../Hooks/useMovies';
import MovieCard from './MovieCard';
import usePagination from '../Hooks/usePagination';
import _ from 'lodash';
import {IMoviesData} from '../store/reducers/movieReducer';
import Loader from './Loader';

const MovieList = () => {
  const movies = useSelector((state: RootState) => state.movies);
  const [movieData, setMovieData] = React.useState<IMoviesData[] | []>([]);
  const {scrollDirection} = useSelector((state: RootState) => state.pagination);

  const {handleNextPage, handlePreviousPage} = usePagination();

  useEffect(() => {
    setMovieData(movies);
  }, [movies]);

  const {isLoading} = useMovies();

  const handleNextPageDebounced = _.debounce(handleNextPage, 200);
  const handlePreviousPageDebounced = _.debounce(handlePreviousPage, 200);

  const getDeviceWidth = () => {
    return Dimensions.get('window').width;
  };
  const renderItem = ({item}) => {
    const year = Object.keys(item)[0];
    const movieDataForYear = item[year];
    if (
      year &&
      movieDataForYear &&
      movieDataForYear.movies &&
      movieDataForYear.movies.length > 0
    ) {
      return (
        <View key={year} style={styles.container}>
          <Text style={styles.yearText}>{year}</Text>
          <View style={styles.listContainer}>
            {movieDataForYear.movies.map(movie => (
              <View
                style={{
                  width: getDeviceWidth() / 2.2,
                  backgroundColor: 'white',
                }}
                key={movie.id}>
                <MovieCard movie={movie} />
              </View>
            ))}
          </View>
        </View>
      );
    }
    return null;
  };
  const renderContent = (): React.ReactNode => {
    if (isLoading && movieData.length === 0) {
      return <Loader />;
    } else if (movieData.length === 0 && !isLoading) {
      return (
        <View>
          <Text style={{textAlign: 'center', ...styles.yearText}}>
            No movies found
          </Text>
        </View>
      );
    } else if (movieData.length === 0) {
      return <Text>No movies found</Text>;
    } else if (movieData.length >= 0) {
      return (
        <>
          {renderMovieList()}
          {isLoading && scrollDirection === 'down' && <Loader />}
        </>
      );
    }
  };
  const renderMovieList = () => {
    return (
      <FlatList
        data={movieData}
        renderItem={renderItem}
        keyExtractor={item => Object.keys(item)[0]}
        onEndReached={handleNextPageDebounced}
        onEndReachedThreshold={0.5}
        onScroll={({nativeEvent}) => {
          if (nativeEvent.contentOffset.y <= 0) {
            handlePreviousPageDebounced();
          }
        }}
        onMomentumScrollEnd={({nativeEvent}) => {
          if (
            nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height -
              nativeEvent.layoutMeasurement.height
          ) {
            handleNextPageDebounced();
          }
        }}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
      />
    );
  };
  return <View style={styles.container}>{renderContent()}</View>;
};

export default MovieList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    width: '100%',
    alignItems: 'center',
  },
  yearText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    margin: 10,
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    gap: 16,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
