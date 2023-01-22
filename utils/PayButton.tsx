import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faInr } from '@fortawesome/free-solid-svg-icons/faInr'
import { payAmountWallet } from '../utils/UtilityFunctions'
import { globalStyles } from '../styles/GlobalStyles'
import { Context } from '../utils/GlobalContext'
import { useContext } from 'react'

const PayButton = ( props ) => {
  const globalContext = useContext(Context)

  return (
    <TouchableOpacity
      style={ globalStyles.button }
      onPress={ () => payAmountWallet(props.cost, globalContext)}>
      <View style={{ flexDirection: 'row', paddingTop: 30  }}>
	<FontAwesomeIcon icon={ faClock  } size={ 26 } />
	<Text style={ globalStyles.buttonText }> { props.time } min </Text>
      </View>
      
      <View style={{ flexDirection: 'row', paddingTop: 10 }}>
	<FontAwesomeIcon icon={ faInr  } size={ 26 }/>
	<Text style={ globalStyles.buttonText }> { props.cost } </Text>
      </View>

    </TouchableOpacity>
)}

export default PayButton;
