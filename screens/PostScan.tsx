import {
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faInr } from '@fortawesome/free-solid-svg-icons/faInr'
import { globalStyles } from '../styles/GlobalStyles'
import { useContext, useState, useEffect } from 'react'
import { payAmountWallet } from '../utils/UtilityFunctions';
import { Context, UserInfo } from '../utils/GlobalContext'
import * as RootNavigation from '../utils/RootNavigation'
import React from 'react';

const PostScan = ({ route, navigation : { goBack} }, ) => {
  const [time, setTime] = useState(60) // this is the variable you'll utilize to stop charging when the bike is fully charged
  const globalContext = useContext(Context)
  const [chargeCompleted, setChargeCompleted] = useState(false)
  const [ initial, setInitial ] = useState(true)
  const { domain, retrieveUserSession, uid } = globalContext
  global.startCharging = false  
  retrieveUserSession()

  if(typeof(route.params) == 'boolean')
  {
    global.startCharging = true
  } else {
    global.cid = route.params.rawValue    
  }
    
  let body = JSON.stringify({
    'uid' : uid,
    'cid' : global.cid
  })
    
  useEffect(() => {
    console.log("Check if in use.")
    if(initial) {
	fetch(`${domain}/charge/get-stat/`, {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	  },
	  body: body
	}).then(res => {
	  if(res.ok) {
	    return res.json()
	  } else {
	    console.log("CRITICAL ERROR: Unable to lock! Contact support ASAP.")
	    throw res.json()
	  }
	}).then(json => {
	  if(json.charge_stat)
	  {
	    console.log("Already in use, try later")
	    RootNavigation.navigate("QRScan")
	    
	  }
	}).catch(error => {
	  console.log(error)
	})
      
	setInitial(false)
	
      } 

    if(global.startCharging) {
      console.log("Unlocking!")
	fetch(`${domain}/charge/lock/`, {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	  },
	  body: body
	}).then(res => {
	  if (res.ok) {
	    return res.json()
	  } else {
	    console.log("CRITICAL ERROR: Unable to lock! Contact support ASAP.")
	    throw res.json()
	  }
	}).then(json => {
	  console.log("Locked.")
	  setChargeCompleted(false)
	}).catch(error => {
	  console.log(error)
	})
    }
  }, [initial, global.startCharging])

  useEffect(() => {
    if(time <= 0) {
      setChargeCompleted(true)
    }

  }, [time])
  
  useEffect(() => {
    if(global.startCharging) {
      let timer;
      if(!initial) {
	if (!chargeCompleted) {
	  timer = setInterval(() => {
	    setTime((time) => time - 1);

	  }, 1000)
	} else {
	  setTime(0)
	  console.log(global.cid, uid)
	}
      }

      return () => { clearInterval(timer) }   
    }  
  }, [chargeCompleted, initial, global.startCharging])
  


  return (
    <View style={{
      flex: 1,
      alignItems: 'center'
    }}> 

    <View style={{
      width: 500,
      height: 500,
      top: -320,
      position: 'absolute',
      borderRadius: 500 / 2,
      backgroundColor: "#00ff52",
    }}/>

    <Image
      source={ require("../res/charger.png")}
      style={{
	height: 300,
	width: 300,
      }}

    />

    <Text style=
      {{ color: '#000000',
	 fontWeight: 'bold',
	 fontSize: 30,
      }}>
      Select Charge Time
    </Text>

    {( !global.startCharging )?
    <Text style=
      {{ color: '#333333',
	 fontWeight: 'bold',
	 fontSize: 20,
      }}>
    Pay to Begin Charging
    </Text>
    :
    <Text style=
      {{ color: '#333333',
	 fontWeight: 'bold',
	 fontSize: 20,
      }}>
    Your bike is charging.
    </Text>
    }
    
    
    <View style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    }}>

      
    <TouchableOpacity
    style={ globalStyles.button }
    disabled={global.startCharging}
	onPress={() => payAmountWallet(120, globalContext) }>
	<View style={{ flexDirection: 'row', paddingTop: 20  }}>
	  <FontAwesomeIcon icon={ faClock  } size={ 26 } />
	</View>

	<View style={{ flexDirection: 'row'  }}>
	  <Text style={ globalStyles.buttonText }> Time Left: </Text>
	  <Text style={ globalStyles.buttonText }> { time }s </Text>
	</View>
	{( !global.startCharging )?
	<View style={{ flexDirection: 'row', paddingTop: 10 }}>
	  <FontAwesomeIcon icon={ faInr  } size={ 26 }/>
	  <Text style={ globalStyles.buttonText }> { 120  }</Text>
	</View>
	:
	 <View style={{ flexDirection: 'row', paddingTop: 10 }}>
	  <Text style={ globalStyles.buttonText }>Paid</Text>
	</View>
	}
	
      </TouchableOpacity>


      
    </View>
    </View>
  );
}

export default PostScan;
