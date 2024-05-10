/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies);

  const {isSuccess, isLoading} = useMovies();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > 0 ? 'down' : 'up';
    dispatch(setScrollDirection(direction));
  };

  const getDeviceWidth = () => {
    return Dimensions.get('window').width;
  };

  return (
    <ScrollView style={{backgroundColor: '#000'}}>
      {isLoading && <Text>Loading...</Text>}
      {isSuccess && (
        <View style={styles.container}>
          {movies.map((movie, index) => {
            const year = Object.keys(movie)[index];
            return (
              <>
                <Text style={styles.yearText}>{year}</Text>
                <View style={styles.listContainer}>
                  {movie[year].movies.map(item=> {
                    return (
                      <View
                        style={{
                          width: getDeviceWidth() / 2.2,
                          backgroundColor: 'white',
                        }}>
                        <MovieCard movie={item} />
                      </View>
                    );
                  })}
                </View>
              </>
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
