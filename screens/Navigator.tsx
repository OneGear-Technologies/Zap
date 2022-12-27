import React, { useContext, useState, useEffect } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppUI from './AppUI'
import GettingStarted from './GettingStarted'
import { Context } from '../utils/GlobalContext'

const MainStack = createNativeStackNavigator();

const Navigator = () => {
  const globalContext = useContext(Context)
  const { isLoggedIn, retrieveUserSession } = globalContext

  retrieveUserSession()
  
  return(
    
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      {( !isLoggedIn )?
       <MainStack.Screen name="GettingStarted" component={GettingStarted} />
      :
       <MainStack.Screen name="AppUI" component={AppUI} />
    }
    </MainStack.Navigator>
  )
}

export default Navigator;
