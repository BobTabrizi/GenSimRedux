import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import Navigator from './nav';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator></Navigator>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
