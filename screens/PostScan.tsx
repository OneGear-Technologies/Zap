import {
  Text,
  View,
  useColorScheme,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles'
import PayButton from '../utils/PayButton'

const PostScan = ({ route, navigation }) => {
  const colorScheme = useColorScheme();
 
  const textTheme = colorScheme === 'light' //? globalStyles.lightThemeText : globalStyles.darkThemeText
  const containerTheme = colorScheme === 'light' //? globalStyles.lightContainer : globalStyles.darkContainer

  
  // TODO: implement the API calls, and the payment calls
  console.log(route.params.rawValue)
  
  return (
    <View style={[globalStyles.container, containerTheme]}>
      <PayButton time={30} cost={50} />
	
    </View>
  );
}

export default PostScan;
