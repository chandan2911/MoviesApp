import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useGenres from '../Hooks/useGenres';
import Skeleton from './Skeleton';
import FilterCard from './FilterCard';

const FilterList = () => {
  const {isLoading, error, isSuccess, data} = useGenres();
  const [genres, setGenres] = useState<Array<Record<string, any>>>([]);
  const windowWidth = Dimensions.get('window').width;
  useEffect(() => {
    if (isSuccess && data) {
      setGenres(data.genres);
    }
  }, [data,isSuccess]);
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
          genres.map(genre => (
            <FilterCard key={genre.id} id={genre.id} name={genre.name} />
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
