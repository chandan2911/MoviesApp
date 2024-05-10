/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {selectFilter} from '../store/reducers/filterReducer';
import {resetMovieData} from '../store/reducers/movieReducer';

interface FilterCardProps {
  id: number;
  name: string;
}

const FilterCard: React.FC<FilterCardProps> = ({id, name}) => {
  const onPress = () => {
    if (selectedFilter?.id !== id) {
      dispatch(resetMovieData());
      dispatch(selectFilter({id, name}));
    }
  };
  const dispatch = useDispatch();
  const selectedFilter = useSelector(
    (state: RootState) => state.filter.selectedFilter,
  );
  const isSelected = selectedFilter?.id === id;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: isSelected ? '#F0283C' : '#484848',
        ...styles.container,
      }}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
});

export default FilterCard;
