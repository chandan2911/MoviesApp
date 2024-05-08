import React from 'react';
import {Text, StyleSheet, Platform, View} from 'react-native';

import FilterList from './FilterList';

const Header: React.FC = () => {
  const safeAreaHeight = Platform.OS === 'android' ? 0 : 60;

  return (
    <View style={[styles.container, {paddingTop: safeAreaHeight}]}>
      <Text style={styles.title}>MovieFlix</Text>
      <FilterList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#242424',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F0283C',
  },
});

export default Header;
