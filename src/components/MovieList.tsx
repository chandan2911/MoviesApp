/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useMemo} from 'react';
import {
  Text,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {RootState} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import useMovies from '../Hooks/useMovies';
import {setScrollDirection} from '../store/reducers/paginationReducer';
import MovieCard from './MovieCard';
import usePagination from '../Hooks/usePagination';

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies);
  const {handleNextPage, handlePreviousPage} = usePagination();

  const {isSuccess, isLoading} = useMovies();
  const isEndReached = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    return (
      event.nativeEvent.layoutMeasurement.height +
        event.nativeEvent.contentOffset.y >=
      event.nativeEvent.contentSize.height
    );
  };
  const isTopReached = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    return event.nativeEvent.contentOffset.y <= 0;
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isEndReached(event)) {
      handleNextPage();
    }
    if (isTopReached(event)) {
      handlePreviousPage();
    }
    console.log(isEndReached);
  };

  const getDeviceWidth = () => {
    return Dimensions.get('window').width;
  };

  return (
    <ScrollView style={{backgroundColor: '#000'}} onScroll={handleScroll}>
      {isLoading && <Text>Loading...</Text>}
      {isSuccess && (
        <View style={styles.container}>
          {movies.map((movie, index) => {
            const year = Object.keys(movie)[index];
            console.log('movie', movie[year]);
            return (
              <View key={year}>
                <Text style={styles.yearText}>{year}</Text>
                <View style={styles.listContainer}>
                  {movie[year].movies.map(item => {
                    return (
                      <View
                        style={{
                          width: getDeviceWidth() / 2.2,
                          backgroundColor: 'white',
                        }}
                        key={item.id}>
                        <MovieCard movie={item} />
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
  },
});
