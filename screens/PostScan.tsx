import {
  Text,
  View,
  useColorScheme,
  Button,
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles'
import RazorpayCheckout from 'react-native-razorpay';

const PostScan = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
 
  const textTheme = colorScheme === 'light' ? globalStyles.lightThemeText : globalStyles.darkThemeText
  const containerTheme = colorScheme === 'light' ? globalStyles.lightContainer : globalStyles.darkContainer

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
      <Button
        title={'Half-hour'}
        onPress={ () => payAmount(5000, 30)}
      />

      <Button
        title={'Hour'}
        onPress={ () => payAmount(10000, 30)}
      />
    </View>
  );
}

export default PostScan;
