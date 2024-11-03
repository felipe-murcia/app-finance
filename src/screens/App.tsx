// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from '../storage/store';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Navigation } from './Navigation';

const App = () => {
  //const count = useSelector((state: { count: number }) => state.count);
  //const dispatch = useDispatch(); 
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
