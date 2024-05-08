import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';
import {SafeAreaView} from 'react-native';

import FilterList from './FilterList';

const Header: React.FC = () => {
  const safeAreaHeight = Platform.OS === 'android' ? 0 : 24; // Adjust the value as per your requirement

  return (
    <SafeAreaView style={[styles.container, {paddingTop: safeAreaHeight}]}>
      <Text style={styles.title}>MovieFlix</Text>
      <FilterList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 16,
    backgroundColor: '#242424',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F0283C',
  },
});

export default Header;
