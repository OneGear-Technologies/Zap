import React, { useContext, useState } from 'react'
import { Context } from '../utils/GlobalContext'
import { globalStyles } from '../styles/GlobalStyles'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as RootNavigation from '../utils/RootNavigation'
import AppUI from './AppUI'

import {
  Text,
  TextInput,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native'
import Accounts from './Accounts'


const Stack = createNativeStackNavigator()


const UserSignIn = () => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const globalContext = useContext(Context)
  const { setIsLoggedIn, domain, storeUserSession } = globalContext
  const [ securePassword, setSecurePassword ] = useState(true)
  const [ phoneNumber, setPhoneNumber ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ error, setError ] = useState("")
  const [ access, setAccess ] = useState("")
  const [ refresh, setRefresh ] = useState("")

  
  function handleLogin () {
    console.log("Loggin' In")
    console.log(phoneNumber)
    console.log(password)
    // TODO: Validity and Error detection

    let body = JSON.stringify({
      'username' : phoneNumber,
      'password' : password,
      'email' : ""
    })
    
    fetch(`${domain}/`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json',
      },
      body: body
    }).then(res => {
      if(res.ok) {
	return res.json()
      } else {
	setError("Invalid Credentials, Please try again.")
	throw res.json()
      }
    }).then(json => {
      console.log(json)
      setAccess(json.access)
      setRefresh(json.refresh)

      body = JSON.stringify({
	'uid' : phoneNumber,
      })

      fetch(`${domain}/get-name/`, {
	method: 'POST',
	headers: {
	  'Content-Type': 'application/json',
	},
	body: body
      }).then(res => {
	if(res.ok) {
	  return res.json()
	} else {
	      setError("Invalid Credentials, Please try again.")
	  throw res.json()
	}
      }).then(json => {
	console.log(json)
	storeUserSession(access, refresh, phoneNumber, json.first_name, json.last_name)

	setIsLoggedIn(true)
	RootNavigation.navigate_params(AppUI, { screen: 'Account' })      
      }).catch(error => {
	console.log(error)
      })
      
      
    }).catch(error => {
      console.log(error)
    })
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
	  padding: 20,
	  alignItems: 'center',
	  flexDirection: 'column',
	}}>

	  <Text style={ globalStyles.textInputText }> Phone Number </Text>
	  <TextInput style={ globalStyles.textInputStyle }
		     value={ phoneNumber }
		     onChangeText={ text => setPhoneNumber(text) }
		     keyboardType={"phone-pad"} />

	  <Text style={ globalStyles.textInputText }> Password </Text>
	  <TextInput style={ globalStyles.textInputStyle }
		     value={ password }
		     onChangeText= { text => setPassword(text) }
		     secureTextEntry={ securePassword }
	  />

	  <Text style={{ paddingTop: 20, color: 'red', size: 15 }}>{error}</Text>
	  
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


const UserRegistration = () => {
  
  const globalContext = useContext(Context)
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const { setIsLoggedIn, domain, storeUserSession } = globalContext
  const [ securePassword, setSecurePassword ] = useState(true)
  const [ phoneNumber, setPhoneNumber ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ firstName, setFirstName ] = useState(null)
  const [ lastName, setLastName ] = useState(null)
  const [ passowrdError, setPasswordError ] = useState("")
  const [ phoneError, setPhoneError] = useState("")
  const [ lastNameError, setLastNameError] = useState("")
  const [ firstNameError, setFirstNameError] = useState("")
  
  function handleRegistration () {
    console.log("Registering In")

    let body = JSON.stringify({
      'username' : phoneNumber,
      'password' : password,
      'email' : "",
      first_name: firstName,
      last_name: lastName,
    })

    var resp;
    
    fetch(`${domain}/register/`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json',
      },
      body: body
    }).then(res => {
      resp = res
      return res.json()
    }).then(json => {
      if(resp.ok)
      {
	console.log(json)
	console.log("REGISTRATION")

	storeUserSession(json.access, json.refresh, json.username, json.first_name, json.last_name)
	
	setIsLoggedIn(true)
	RootNavigation.navigate_params(AppUI, { screen: 'Account' })
      } else {
	console.log("Failed!: ")
	Object.keys(json).forEach(key => {
	  switch(key)
	  {
	    case "password":
	    setPasswordError(json[key][0])
	    break;

	    case "username":
	    setPhoneError(json[key][0])
	    break;

	    case "first_name":
	    setLastNameError("This field is required")
	    break;

	    case "last_name":
	    setFirstNameError("This field is required")
	    break;
	  }
	})
      }
    })
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
	  padding: 20,
	  paddingTop: 0,
	  alignItems: 'center',
	  flexDirection: 'column',
	}}>

	  <Text style={ globalStyles.textInputText }> First Name </Text>
	  <TextInput style={ globalStyles.textInputStyle }
		     value={ firstName }
		     onChangeText={ text => setFirstName(text) }
	  />
	  <Text style={{ color: 'red', size: 10 }}>{firstNameError}</Text>


	  <Text style={ globalStyles.textInputText }> Last Name </Text>
	  <TextInput style={ globalStyles.textInputStyle }
		     value={ lastName }
		     onChangeText={ text => setLastName(text) }
	  />
	  <Text style={{ color: 'red', size: 10 }}>{lastNameError}</Text>
	  
	  
	  <Text style={ globalStyles.textInputText }> Phone Number </Text>
	  <TextInput style={ globalStyles.textInputStyle }
		     value={ phoneNumber }
		     onChangeText={ text => setPhoneNumber(text) }
		     keyboardType={ "phone-pad" }
	  />
	  <Text style={{ color: 'red', size: 10 }}>{phoneError}</Text>
	  
	  
	  <Text style={ globalStyles.textInputText }> Password </Text>
	  <TextInput style={ globalStyles.textInputStyle }
		     value={ password }
		     onChangeText= { text => setPassword(text) }
		     secureTextEntry={ securePassword }
	  />
	  <Text style={{ color: 'red', size: 10 }}>{passowrdError}</Text>
	  
	  <TouchableOpacity
	    style= {{...globalStyles.buttonFilledWide, margin: 5}}
	    onPress={() => {handleRegistration()}}
	  >
	    <Text style={{
	      color: 'black',
	      fontSize: 20,
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


function GettingStarted() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserRegistration" component={UserRegistration} />
      <Stack.Screen name="UserSignIn" component={UserSignIn} />
    </Stack.Navigator>
  )
}

export default GettingStarted;
