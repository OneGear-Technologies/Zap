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

const PostScan = ({ route, navigation }) => {
  const [time, setTime] = useState(0)
  const [ finalTime, setFinalTime ] = useState(0)
  const [timing, setStatus] = useState(false)

  const globalContext = useContext(Context)

  const reset=()=>{
    setTime(0);
  }

  useEffect(() => {
    let timer;
    if (timing) {
      timer = setInterval(() => {
	setTime((time) => time + 1);
      }, 1000)
    } else {
      clearInterval(timer)
      setFinalTime(time)
     
      
      console.log(time)
      
      if (!timing)
	{
	  reset(); // do the caluclation and paypment part here
	}
    }

    return () => { clearInterval(timer) }
  }, [timing])

  const handleStart = () => {
    setFinalTime(0)
    setStatus(true);
  }

  const handleStop = () => {
    setStatus(false);
  }
  
  // TODO: implement the API calls, and the payment calls. Make sure to call this only once! As setting values with SetInterval will force a re-render
  //console.log(route.params.rawValue)

  
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
    
    <Text style=
      {{ color: '#333333',
	 fontWeight: 'bold',
	 fontSize: 20,
      }}>
      Start and Stop charging
    </Text>
    
    
    <View style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    }}>
      <TouchableOpacity
	disabled={ timing }
	style={ globalStyles.button2 }
	onPress={ () => handleStart() }>
	<View style={{ flexDirection: 'row' }}>
	  <Text style={ globalStyles.buttonText }> Start Charging </Text>
	</View>

      </TouchableOpacity>


      <TouchableOpacity
	disabled={ !timing }
	style={ globalStyles.button2 }
	onPress={ () => handleStop() }>
	<View style={{ flexDirection: 'row' }}>
	  <Text style={ globalStyles.buttonText }> Stop Charging </Text>
	</View>

      </TouchableOpacity>
      
      <TouchableOpacity
	style={ globalStyles.button }
	onPress={() => payAmountWallet(finalTime * 2, globalContext) }>
	<View style={{ flexDirection: 'row', paddingTop: 20  }}>
	  <FontAwesomeIcon icon={ faClock  } size={ 26 } />
	</View>

	<View style={{ flexDirection: 'row'  }}>
	  <Text style={ globalStyles.buttonText }> Elapsed: </Text>
	  <Text style={ globalStyles.buttonText }> { finalTime }s </Text>
	</View>

	<View style={{ flexDirection: 'row', paddingTop: 10 }}>
	  <FontAwesomeIcon icon={ faInr  } size={ 26 }/>
	  <Text style={ globalStyles.buttonText }> { finalTime * 2 }</Text>
	</View>
      </TouchableOpacity>


      
    </View>
    </View>
  );
}

export default PostScan;
