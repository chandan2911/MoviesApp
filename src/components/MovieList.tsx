import React, {useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {RootState} from '../store';
import {useDispatch, useSelector} from 'react-redux';
import useMovies from '../Hooks/useMovies';
import {setScrollDirection} from '../store/reducers/paginationReducer';

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies);

  const {isSuccess} = useMovies();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > 0 ? 'down' : 'up';
    dispatch(setScrollDirection(direction));
  };
  useEffect(() => {
    if (isSuccess) {
      console.log('Movies:', movies);
    }
  });

  return (
    <ScrollView onScroll={handleScroll}>
      <View>
        <Text>MovieList</Text>
      </View>
    </ScrollView>
  );
};

export default MovieList;
