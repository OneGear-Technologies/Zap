import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faInr } from '@fortawesome/free-solid-svg-icons/faInr'
import { payAmount } from '../utils/UtilityFunctions'
import { globalStyles } from '../styles/GlobalStyles'

const PayButton = ( props ) => {
  return (
    <TouchableOpacity
      style={globalStyles.button}>
      {/* onPress={ () => payAmount(5000, 30)} */}
      <View style={{ flexDirection: 'row', paddingBottom: 10}}>
	<FontAwesomeIcon icon={ faClock  } size={ 26 } />
	<Text style={ globalStyles.buttonText }> { props.time } min </Text>
      </View>
      
      <View style={{ flexDirection: 'row' }}>
	<FontAwesomeIcon icon={ faInr  } size={ 26 }/>
	<Text style={ globalStyles.buttonText }> { props.cost } </Text>
      </View>

    </TouchableOpacity>
)}

export default PayButton;
