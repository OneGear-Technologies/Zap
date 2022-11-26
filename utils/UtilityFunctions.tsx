import RazorpayCheckout from 'react-native-razorpay';
import PostScanPaymentSuccess from '../screens/PostScanPaymentSuccess';
import PostScanPaymentFailure from '../screens/PostScanPaymentFailure';
import Accounts from '../screens/Accounts';
import DummyUserData from '../screens/global'

import * as RootNavigation from '../utils/RootNavigation';


export function payAmount(amount: number) {
  
  let desc = "Top up OGT wallet with " + amount;
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
		    DummyUserData.set_myNumber(DummyUserData.get_myNumber() + (amount / 100))
		    console.log(DummyUserData.get_myNumber())
		    // TODO: navigate to success screen
		    RootNavigation.navigate("Account", { screen: Accounts })
		    
		  })
		.catch(error => {
		  // handle failure
		  console.log(`Error: ${error.code} | ${error.description}`);
		  //RootNavigation.navigate(PostScanPaymentFailure)
		});
}

export function payAmountWallet(amount: number) {
  DummyUserData.set_myNumber(DummyUserData.get_myNumber() - amount) // TODO: add error checking and API here
  RootNavigation.navigate(PostScanPaymentSuccess)
		
}
