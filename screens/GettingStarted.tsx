import React, { useContext } from 'react'
import { globalStyles } from '../styles/GlobalStyles'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as RootNavigation from '../utils/RootNavigation';
import { Context } from "../utils/GlobalContext"

import {
  Text,
  TextInput,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import AppUI from './AppUI';

const Stack = createNativeStackNavigator()


const UserSignIn = () => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;


  function handleLogin () {
    console.log("Loggin' In")
    // TODO: Add some sort of state storage, like given https://stackoverflow.com/questions/39581115/how-to-keep-user-logged-in-aka-state-persistency-in-react-native
    
  }
    
  return (
      <View style={{
      flex: 1,
	alignItems: 'center',
	backgroundColor: "#00ff52",
    }}>
      <View style={{
	width: windowWidth,
	height: windowHeight - 140,
	top: 150,
	position: 'absolute',
	borderRadius: 30,
	backgroundColor: "#ffffff",
      }}>

	<Text style={{
	  padding: 20,
	  color: 'black',
	  fontSize: 30,
	  fontWeight: 'bold',
	}}>
	  Sign In
	</Text>

	<View style={{
	  flex: 1,
	  paddingTop: 30,
	  alignItems: 'center',
	  flexDirection: 'column',
	}}>
	  <Text style={{
	    paddingRight: windowWidth / 2 + 30,
	    color: 'black',
	    fontSize: 18,
	  }}> Phone Number </Text>
	  <TextInput style={{
	    ...globalStyles.textInputStyle, width: 0.9 * windowWidth
	  }}/>

	  <Text style={{
	    paddingRight: windowWidth / 2 + 70,
	    color: 'black',
	    fontSize: 18,
	  }}> Password </Text>
	  <TextInput style={{
	    ...globalStyles.textInputStyle, width: 0.9 * windowWidth
	  }}/>
	  
	  <TouchableOpacity
	    style= {{...globalStyles.buttonFilledWide, margin: 20}}
	  >
	    <Text
	      onPress={ () => handleLogin() }
	      style={{
		color: 'black',
		fontSize: 23,
		fontWeight: 'bold'
	      }}> Sign Me In </Text>
	  </TouchableOpacity>
	</View>
      </View>
      </View>
  )
}

// TODO: Skipping these parts must be done in App.tsx, last step
const UserRegistration = () => {
  
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  // TODO: Add some sort of state storage, like given https://stackoverflow.com/questions/39581115/how-to-keep-user-logged-in-aka-state-persistency-in-react-native
  function handleRegistration () {
    console.log("Registering In")
         
  }

  
  return (
      <View style={{
      flex: 1,
	alignItems: 'center',
	backgroundColor: "#00ff52",
    }}>
      <View style={{
	width: windowWidth,
	height: windowHeight - 140,
	top: 150,
	position: 'absolute',
	borderRadius: 30,
	backgroundColor: "#ffffff",
      }}>

	<Text style={{
	  padding: 20,
	  color: 'black',
	  fontSize: 30,
	  fontWeight: 'bold',
	}}>
	  Sign Up
	</Text>

	<View style={{
	  paddingTop: 30,
	  alignItems: 'center',
	  flexDirection: 'column',
	}}>
	  <Text style={{
	    color: 'black',
	    fontSize: 18,
	    paddingRight: windowWidth / 2 + 70,
	  }}> Full Name </Text>
	  <TextInput style={{
	    ...globalStyles.textInputStyle, width: 0.9 * windowWidth
	  }}/>

	  <Text style={{
	    paddingRight: windowWidth / 2 + 30,
	    color: 'black',
	    fontSize: 18,
	  }}> Phone Number </Text>
	  <TextInput style={{
	    ...globalStyles.textInputStyle, width: 0.9 * windowWidth
	  }}/>

	  <Text style={{
	    paddingRight: windowWidth / 2 + 70,
	    color: 'black',
	    fontSize: 18,
	  }}> Password </Text>
	  <TextInput style={{
	    ...globalStyles.textInputStyle, width: 0.9 * windowWidth
	  }}/>
	  
	  <TouchableOpacity
	    style= {{...globalStyles.buttonFilledWide, margin: 20}}
	    onPress={() => {handleRegistration()}}
	  >
	    <Text style={{
	      color: 'black',
	      fontSize: 23,
	      fontWeight: 'bold'
	    }}> Create Account </Text>
	  </TouchableOpacity>

	  <TouchableOpacity
	    style= {globalStyles.buttonHollowWide}
	    onPress={() => RootNavigation.navigate(UserSignIn)}
	  >
	    <Text style={{
	      color: 'black',
	      fontSize: 18,
	      fontWeight: 'bold'
	    }}> Already Have an Account? Sign In </Text>
	  </TouchableOpacity>
	</View>
      </View>
      </View>
  )
}


// TODO: Link up Create Account with the API
// TODO: Link up Sing In with the the API

function GettingStarted() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserRegistration" component={UserRegistration} />
      <Stack.Screen name="UserSignIn" component={UserSignIn} />
    </Stack.Navigator>
  )
}

export default GettingStarted;
