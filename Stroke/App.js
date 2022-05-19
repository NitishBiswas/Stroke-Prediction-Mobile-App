import 'react-native-gesture-handler';
import 'react-native-reanimated'
import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from './src/screens/Home';
import Predict from './src/screens/Predict';
import CustomDrawer from './src/screens/CustomDrawer';
import PredictedResults from './src/screens/PredictedResults';
import Result from './src/screens/Result';
import Contact from './src/screens/Contact';

const drawer = createDrawerNavigator();
const stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="PredictedResults" component={PredictedResults} options={{ headerShown: false }} />
      <stack.Screen name="Result" component={Result} options={{ headerShown: false }} />
    </stack.Navigator>
  );
}


const drawerNavigator = () => {
  return (
    <drawer.Navigator screenOptions={{ drawerInactiveTintColor: 'gray', drawerActiveTintColor: '#33FF26', drawerLabelStyle: { fontSize: 18, fontWeight: 'bold' } }} drawerContent={(props) => <CustomDrawer {...props} />}>
      <drawer.Screen name="Home" component={Home}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="home" size={25} color={color} />
          ),
        }} />
      <drawer.Screen name="Predict Tool" component={Predict}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Ionicons name="md-analytics-sharp" size={25} color={color} />
          ),
        }}
      />
      <drawer.Screen name="Predicted Results" component={StackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <AntDesign name="barschart" size={25} color={color} />
          ),
        }}
      />
      <drawer.Screen name="Contanct Us" component={Contact}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <MaterialIcons name="contact-mail" size={25} color={color} />
          ),
        }}
      />
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
