import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import FilterList from './src/components/FilterList';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './src/components/Header';
const queryClient = new QueryClient()

const App = () => {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
    
      <View>
        <Header/>
      </View>
    
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
