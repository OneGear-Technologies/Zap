import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accounts from './Accounts'
import ScannerFlow from './ScannerFlow'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faQrcode } from '@fortawesome/free-solid-svg-icons/faQrcode'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons/faUserCircle'

const Tab = createBottomTabNavigator();

const AppUI = () => {

  return (
        <Tab.Navigator
	initialRouteName="Scan"
	screenOptions={{
          tabBarActiveTintColor: '#000000',
	  tabBarActiveBackgroundColor : '#00ff52',
	  tabBarInactiveTintColor: '#000000',
	  tabBarShowLabel : false,
	  tabBarStyle : {
	    backgroundColor: '#f0f0f0',
	  }
	}}
      >
	
	<Tab.Screen
	  name="Scan"
	  component={ScannerFlow}
	  options={{
	    headerShown : false,
	    tabBarIcon: ({ color, size }) => (
	      <FontAwesomeIcon icon={ faQrcode  } size={ size } color={color}/>
	    ),
	  }}
	/>

	<Tab.Screen
	  name="Account"
	  component={Accounts}
	  options={{
	    headerShown : false,
	    unmountOnBlur : true,
	    tabBarIcon: ({ color, size }) => (
	      <FontAwesomeIcon icon={ faUserCircle  } size={ size } color={color}/>
	    ),
	  }}
    listeners={({navigation}) => ({tabPress: (event) => {
      event.preventDefault()
      navigation.navigate('Account', {
                       screen: 'Account' 
                    });
    }})}
	/>
	</Tab.Navigator>
    )
}

export default AppUI
