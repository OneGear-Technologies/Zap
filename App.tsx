import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen'
import PostScan from './screens/PostScan'

import {
  Text,
  View,
  useColorScheme,
} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
	screenOptions={{ headerShown: false }}
      >
	<Stack.Screen name="Home" component={HomeScreen} />
	<Stack.Screen name="PostScan" component={PostScan} />
    </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
