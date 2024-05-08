import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface FilterCardProps {
  id: number;
  name: string;
}

const FilterCard: React.FC<FilterCardProps> = ({id, name}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#484848',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F5F5F5',
  },
});

export default FilterCard;
