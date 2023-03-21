import React, { useContext, useState } from 'react'
import { globalStyles } from '../styles/GlobalStyles'
import { payAmount } from '../utils/UtilityFunctions'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faInr } from '@fortawesome/free-solid-svg-icons/faInr'
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut'
import { Context, UserInfo } from '../utils/GlobalContext'

import {
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

const Accounts = () => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const globalContext = useContext(Context)
  const { domain, retrieveUserSession, uid, name, logoutUserSession } = globalContext
  const [amount, setAmount] = useState(0)
  
  retrieveUserSession()
  console.log(uid)
  console.log(name)

  
  let body = JSON.stringify({
    'uid' : uid
  })
    
  fetch(`${domain}/get-uid/`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json',
      },
      body: body
    }).then(res => {
      if(res.ok) {
	return res.json()
      } else {
	console.log("CRITICAL ERROR: Unable to get wallet data")
	throw res.json()
      }
    }).then(json => {
      setAmount(json.amount)
      console.log(amount)
      
    }).catch(error => {
      console.log(error)
    })

  retrieveUserSession() // okay this fixes it. Works!
  
  return (
    
    <View style={{
      flex: 1,
      alignItems: 'center'
    }}>
      <View style={{
	width: windowWidth - 20,
	height: windowWidth - 20,
	top: 10,
	position: 'absolute',
	borderRadius: 20,
	backgroundColor: "#00ff52",
      }}>
	<View style={{
	  paddingLeft: 20,
	  paddingTop: 20,
	  flex: 1,
	  flexDirection: 'column',
	}}>
	  <Text style={{ color: '#000000', fontSize: 13 }}>
	    Welcome back,
	  </Text>
	
	  <Text style={{ color: '#000000', fontSize: 30, fontWeight: 'bold' }}>
	    { name }
	  </Text>

	  <Text style={{ color: '#000000', fontSize: 13 }}>
	    Current Balance:
	  </Text>
	  
	  <Text style={{ color: '#000000', fontSize: 60, fontWeight: 'bold' }}>
	    ₹ { amount }
	  </Text>

	  
	</View>	
      </View>
      <View style={{
	paddingTop: windowHeight / 1.75
      }}>
	<TouchableOpacity
	  style={globalStyles.button}
	  onPress={() => payAmount(5000, globalContext)}>
  
	  <View style={{ flexDirection: 'row', paddingTop: 10 }}>
	    <Text style={{ color: 'black' }}> Recharge wallet with </Text>
	  </View>

	  <View style={{ flexDirection: 'row', paddingTop: 10 }}>
	    
	    <FontAwesomeIcon icon={ faInr  } size={ 26 }/>
	    <Text style={ globalStyles.buttonText }> 50 </Text>
	  
	  </View>
	  
	</TouchableOpacity>

	<TouchableOpacity
	  style={globalStyles.logout_button}
	  onPress={() => logoutUserSession() }>  
	  <View style={{ flexDirection: 'row', paddingTop: 10 }}>
	    <FontAwesomeIcon icon={ faSignOut  } size={ 26 }/>
	    <Text style={ globalStyles.buttonText }> Logout </Text>
	  </View>
	  
	</TouchableOpacity>
      </View>
    </View>
  )
};

export default Accounts;
