import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import Skeleton from './Skeleton';
import FilterCard from './FilterCard';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import useFilters from '../Hooks/useFilters';

const FilterList = () => {
  const {isLoading, isSuccess} = useFilters();

  const filters = useSelector((state: RootState) => state.filter.filters);
  const windowWidth = Dimensions.get('window').width;

  return (
    <ScrollView horizontal>
      <View style={styles.containerStyle}>
        {isLoading ? (
          <>
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} height={20} width={windowWidth} />
            ))}
          </>
        ) : (
          isSuccess &&
          filters.map(filter => (
            <FilterCard key={filter.id} id={filter.id} name={filter.name} />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default FilterList;

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
