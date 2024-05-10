import {View} from 'react-native';
import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import Header from './src/components/Header';
import {Provider} from 'react-redux';
import {store} from './src/store/index';
import MovieList from './src/components/MovieList';
const queryClient = new QueryClient();

const App = () => {
  return (
    // Provide the client to your App
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <View>
          <Header />
          <MovieList />
        </View>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
