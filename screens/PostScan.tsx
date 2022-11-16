import {
  Text,
  View,
  useColorScheme,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles'
import RazorpayCheckout from 'react-native-razorpay';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faInr } from '@fortawesome/free-solid-svg-icons/faInr'


const PostScan = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
 
  const textTheme = colorScheme === 'light' //? globalStyles.lightThemeText : globalStyles.darkThemeText
  const containerTheme = colorScheme === 'light' //? globalStyles.lightContainer : globalStyles.darkContainer

  const payAmount = (amount : number, time : number) => {
    let desc = "{time} minutes"
    var options = {
      description: desc,
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_aeXiR8GgziKjYW',
      amount: amount,
      name: 'OneGear Technologies',
      theme: { color: '#F37254' },
    };
    RazorpayCheckout.open(options)
	.then(data => {
	  // handle success
	  console.log(`Success: ${data.razorpay_payment_id}`);
	  // TODO: navigate to success screen
	})
	.catch(error => {
	  // handle failure
	  console.log(`Error: ${error.code} | ${error.description}`);
	});
  }
  
  // TODO: implement the API calls, and the payment calls
  console.log(route.params.rawValue)
  
  return (
    <View style={[globalStyles.container, containerTheme]}>
      <TouchableOpacity
	style={globalStyles.button}>
	{/* onPress={ () => payAmount(5000, 30)} */}
	<View style={{ flexDirection: 'row', paddingBottom: 10}}>
	  <FontAwesomeIcon icon={ faClock  } size={ 26 } />
	  <Text style={ globalStyles.buttonText }> 30 min </Text>
	</View>
	
	<View style={{ flexDirection: 'row' }}>
	  <FontAwesomeIcon icon={ faInr  } size={ 26 }/>
	  <Text style={ globalStyles.buttonText }> 50  </Text>
	</View>

	
      </TouchableOpacity>

    </View>
  );
}

export default PostScan;
