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

  return (
    <View style={[globalStyles.container, containerTheme]}>
      <Text style={[globalStyles.text, textTheme]}>PostScan: { colorScheme } </Text>
    </View>
  );
}

export default PostScan;
