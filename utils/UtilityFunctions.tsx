import RazorpayCheckout from 'react-native-razorpay';
import PostScanPaymentSuccess from '../screens/PostScanPaymentSuccess';
import PostScanPaymentFailure from '../screens/PostScanPaymentFailure';
import Accounts from '../screens/Accounts';
import * as RootNavigation from '../utils/RootNavigation';


export function payAmount(amount: number, globalContext) { // in paisa
  const { domain, uid } = globalContext

  let body = JSON.stringify({
    'uid' : uid,
    'amount' : (amount/100)
  })
  
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

			  fetch(`${domain}/update-uid/`, {
				  method: 'POST',
				  headers: {
					  'Content-Type': 'application/json',
				  },
				  body: body
			  }).then(res => {
				  if (res.ok) {
					  return res.json()
				  } else {
					  console.log("CRITICAL ERROR: Unable to get wallet data")
					  throw res.json()
				  }
			  }).then(json => {
				  console.log(json.amount)
			  }).catch(error => {
				  console.log(error)
			  })
		    
		    
		    // TODO: navigate to success screen
		    RootNavigation.navigate("Account", { screen: Accounts })
		    
		  })
		.catch(error => {
		  // handle failure
		  console.log(`Error: ${error.code} | ${error.description}`);
		  //RootNavigation.navigate(PostScanPaymentFailure)
		});
}

export function payAmountWallet(amount: number, globalContext) { // in rupees
  const { domain, uid } = globalContext

  let body = JSON.stringify({
    'uid' : uid,
    'amount' : (-1 * amount)
  })

  fetch(`${domain}/update-uid/`, {
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
      console.log(json.amount)
      
    }).catch(error => {
      console.log(error)
    })  
  
  RootNavigation.navigate(PostScanPaymentSuccess)
}
