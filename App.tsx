import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './utils/RootNavigation'
import { Provider } from './utils/GlobalContext'
import Navigator from './screens/Navigator'

import {
  Text,
  View,
  useColorScheme,
} from 'react-native';


const App = () => { 
  return (
    <Provider>
      <NavigationContainer ref={ navigationRef }>
	<Navigator />
      </NavigationContainer>
    </Provider>
  )
};

export default App;
