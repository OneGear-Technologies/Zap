import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';


const App = () => {
  const colorScheme = useColorScheme();

  const textTheme = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText
  const containerTheme = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer

  return (
    <View style={[styles.container, containerTheme]}>
      <Text style={[styles.text, textTheme]}>Colour Theme: { colorScheme } </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    jusifyContents: 'center'
  },

  text: {
    
  },
  
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#161719',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});

export default App;
