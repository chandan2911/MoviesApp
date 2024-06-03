import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Movie} from '../store/reducers/movieReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {setAccordion} from '../store/reducers/accordionReducer';

interface IProps {
  movie: Movie;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({movie}: IProps) => {
  const getImageBaseUrl = () => {
    return `${IMAGE_BASE_URL}/${movie.poster_path}`;
  };
  const {selectedAccordionId} = useSelector(
    (state: RootState) => state.accordion,
  );
  const dispatch = useDispatch();
  const handlePress = () => {
    if (selectedAccordionId === movie.id) {
      dispatch(setAccordion(''));
      return;
    }
    dispatch(setAccordion(movie.id));
  };
  const accordionJSX = () => {
    return (
      <View style={styles.subTitleOverlay}>
        <Text style={styles.subtitle}>{movie.overview}</Text>
      </View>
    );
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <ImageBackground source={{uri: getImageBaseUrl()}} style={styles.image}>
        {selectedAccordionId === movie.id ? (
          accordionJSX()
        ) : (
          <View style={styles.overlay}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.ratings}>{movie.vote_average}</Text>
          </View>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  image: {
    width: '100%', // take half of the container width
    height: 250,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
  },
  ratings: {
    fontSize: 16,
    marginTop: 5,
    color: '#fff',
  },
  subTitleOverlay: {
    flex: 1,
    backgroundColor: '#484848',
    opacity: 0.6,
    justifyContent: 'flex-end',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign:'left',
    color: '#fff',
  },
});
