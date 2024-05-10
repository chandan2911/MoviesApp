import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Movie} from '../store/reducers/movieReducer';

interface IProps {
  movie: Movie;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({movie}: IProps) => {
  const getImageBaseUrl = () => {
    return `${IMAGE_BASE_URL}/${movie.poster_path}`;
  };
  return (
    <ImageBackground source={{uri: getImageBaseUrl()}} style={styles.image}>
      <View style={styles.overlay}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.ratings}>{movie.vote_average}</Text>
      </View>
    </ImageBackground>
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
});
