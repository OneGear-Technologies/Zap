import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import PostScan from './screens/PostScan'
import PostScanPaymentSuccess from './screens/PostScanPaymentSuccess'
import PostScanPaymentFailure from './screens/PostScanPaymentFailure'
import { navigationRef } from './utils/RootNavigation';

import {
  Text,
  View,
  useColorScheme,
} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer ref={ navigationRef }>
      <Stack.Navigator
	screenOptions={{ headerShown: false }}
      >
	<Stack.Screen name="Home" component={HomeScreen} />
	<Stack.Screen name="PostScan" component={PostScan} />
	<Stack.Screen name="PostScanPaymentFailure" component={PostScanPaymentFailure} />
	<Stack.Screen name="PostScanPaymentSuccess" component={PostScanPaymentSuccess} />
    </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
