import 'react-native-gesture-handler';
import 'react-native-reanimated'
import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

import Home from './src/screens/Home';
import Predict from './src/screens/Predict';
import CustomDrawer from './src/screens/CustomDrawer';

const drawer = createDrawerNavigator();


const drawerNavigator = () => {
  return (
    <drawer.Navigator screenOptions={{ drawerInactiveTintColor: 'gray', drawerActiveTintColor: 'white', drawerLabelStyle: { fontSize: 18, fontWeight: 'bold' } }} drawerContent={(props) => <CustomDrawer {...props} />}>
      <drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <drawer.Screen name="Predict" component={Predict} options={{ headerShown: false }} />
    </drawer.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#070724" />
      <View style={{ flex: 1 }}>
        {drawerNavigator()}
      </View>
    </NavigationContainer>
  )
};

export default App;
