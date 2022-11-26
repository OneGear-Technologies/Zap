import React from 'react'
import DummyUserData from './global'
import { globalStyles } from '../styles/GlobalStyles'
import { payAmount } from '../utils/UtilityFunctions'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faInr } from '@fortawesome/free-solid-svg-icons/faInr'

import {
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

const Accounts = () => {

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  console.log(DummyUserData.get_myNumber())
  
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
	    { DummyUserData.get_myName() }
	  </Text>

	  <Text style={{ color: '#000000', fontSize: 13 }}>
	    Current Balance:
	  </Text>
	  
	  <Text style={{ color: '#000000', fontSize: 60, fontWeight: 'bold' }}>
	    ₹ { DummyUserData.get_myNumber() }
	  </Text>

	  
	</View>	
      </View>
      <View style={{
	paddingTop: windowHeight / 1.75
      }}>
	<TouchableOpacity
	  style={globalStyles.button}
	  onPress={() => payAmount(5000)}>
  
	  <View style={{ flexDirection: 'row', paddingTop: 10 }}>
	    <Text style={{ color: 'black' }}> Recharge wallet with </Text>
	  </View>

	  <View style={{ flexDirection: 'row', paddingTop: 10 }}>
	    
	    <FontAwesomeIcon icon={ faInr  } size={ 26 }/>
	    <Text style={ globalStyles.buttonText }> 50 </Text>
	  
	  </View>
	  
	</TouchableOpacity>
      </View>
    </View>
  )
};

export default Accounts;
