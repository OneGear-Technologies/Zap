import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import AppUI from './screens/AppUI'
import GettingStarted from './screens/GettingStarted'
import { navigationRef } from './utils/RootNavigation'
import { Context, Provider } from './utils/GlobalContext'

import {
  Text,
  View,
  useColorScheme,
} from 'react-native';

const MainStack = createNativeStackNavigator();


const App = () => {
  return (
    <Provider>
      <NavigationContainer ref={ navigationRef }>
	<MainStack.Navigator screenOptions={{ headerShown: false }}>
	  <MainStack.Screen name="GettingStarted" component={GettingStarted} />
	  <MainStack.Screen name="AppUI" component={AppUI} />
	</MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
};

export default App;
