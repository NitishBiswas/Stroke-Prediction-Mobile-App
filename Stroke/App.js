import React from 'react';
import Header from './src/components/Header';
import HomeScreen from './src/screens/HomeScreen';
import { View, StatusBar } from 'react-native';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <HomeScreen />
      <StatusBar barStyle='light-content' backgroundColor="#070724" />
    </View>
  )
};

export default App;
