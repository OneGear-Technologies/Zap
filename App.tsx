import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


const App = () => {

  return (
    <View style={styles.container}>
      <Text>Hello, there!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#fff'
  },
  
});

export default App;
