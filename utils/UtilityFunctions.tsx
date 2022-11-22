import RazorpayCheckout from 'react-native-razorpay';
import PostScanPaymentSuccess from '../screens/PostScanPaymentSuccess';
import PostScanPaymentFailure from '../screens/PostScanPaymentFailure';

import * as RootNavigation from '../utils/RootNavigation';


export function payAmount(amount: number, time: number) {
  
  let desc = "Pay for " + time + " minutes of charge time"
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
		    RootNavigation.navigate(PostScanPaymentSuccess)
		    
		  })
		.catch(error => {
		  // handle failure
		  console.log(`Error: ${error.code} | ${error.description}`);
		  // TODO: navigate to success screen
		  RootNavigation.navigate(PostScanPaymentFailure)
		});
}
