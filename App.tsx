import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import QRScanScreen from './screens/QRScanScreen'
import GettingStarted from './screens/GettingStarted'
import PostScan from './screens/PostScan'
import Accounts from './screens/Accounts'
import PostScanPaymentSuccess from './screens/PostScanPaymentSuccess'
import PostScanPaymentFailure from './screens/PostScanPaymentFailure'
import { navigationRef } from './utils/RootNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons/faQrcode'
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle'

import {
  Text,
  View,
  useColorScheme,
} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ScannerFlow() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="QRScan" component={QRScanScreen} />
      <Stack.Screen name="PostScan" component={PostScan} />
      <Stack.Screen name="PostScanPaymentFailure" component={PostScanPaymentFailure} />
      <Stack.Screen name="PostScanPaymentSuccess" component={PostScanPaymentSuccess} />
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer ref={ navigationRef }>
      <Tab.Navigator
	initialRouteName="Scan"
	screenOptions={{
          tabBarActiveTintColor: '#000000',
	  tabBarActiveBackgroundColor : '#00ff52',
	  tabBarInactiveTintColor: '#000000',
	  tabBarShowLabel : false,
	  tabBarStyle : {
	    backgroundColor: '#f0f0f0'
	  }
	}}
      >
	<Tab.Screen
	  name="GetttingStarted"
	  component={GettingStarted}
	  options={{
	    headerShown : true,
	    headerTitle: "Getting Started with Zap!",
	    tabBarIcon: ({ color, size }) => (
	      <FontAwesomeIcon icon={ faHome  } size={ size } color={color}/>
	    ),
	  }}
	/>
	
	<Tab.Screen
	  name="Scan"
	  component={ScannerFlow}
	  options={{
	    headerShown : false,
	    tabBarIcon: ({ color, size }) => (
	      <FontAwesomeIcon icon={ faQrcode  } size={ size } color={color}/>
	    ),
	  }}
	/>

	<Tab.Screen
	  name="Account"
	  component={Accounts}
	  options={{
	    headerShown : true,
	    headerTitle: "Your Account",
	    tabBarIcon: ({ color, size }) => (
	      <FontAwesomeIcon icon={ faUserCircle  } size={ size } color={color}/>
	    ),
	  }}
	/>
      </Tab.Navigator>
    </NavigationContainer>
  )
};

export default App;
