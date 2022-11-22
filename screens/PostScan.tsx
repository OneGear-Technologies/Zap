import {
  Text,
  Image,
  View,
  useColorScheme,
} from 'react-native';
import PayButton from '../utils/PayButton'

const PostScan = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
 
  const textTheme = colorScheme === 'light' //? globalStyles.lightThemeText : globalStyles.darkThemeText
  const containerTheme = colorScheme === 'light' //? globalStyles.lightContainer : globalStyles.darkContainer
  
  
  // TODO: implement the API calls, and the payment calls
  console.log(route.params.rawValue)
  
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
      Tap To Pay
    </Text>
    
    
    <View style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    }}>
      <PayButton time={ 30 } cost={ 50 } />
      <PayButton time={ 60 } cost={ 80 } />
    </View>
    </View>
  );
}

export default PostScan;
