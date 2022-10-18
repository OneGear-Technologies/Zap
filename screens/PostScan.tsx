import {
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles'


const PostScan = ({ route, navigation }) => {
  const colorScheme = useColorScheme();

  const textTheme = colorScheme === 'light' ? globalStyles.lightThemeText : globalStyles.darkThemeText
  const containerTheme = colorScheme === 'light' ? globalStyles.lightContainer : globalStyles.darkContainer

  // TODO: implement the API calls, and the payment calls
  console.log(route.params.rawValue)
  
  return (
    <View style={[globalStyles.container, containerTheme]}>
      <Text style={[globalStyles.text, textTheme]}>PostScan: { route.params.rawValue } </Text>
    </View>
  );
}

export default PostScan;
