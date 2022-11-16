import {
  StyleSheet,
} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    jusifyContents: 'center'
  },

  buttonText: {
    color: '#000000',
    fontWeight: 'bold'
  },
  
  button: {
    paddingTop: 25,
    paddingLeft: 20,
    backgroundColor: '#00ff52',
    width: 120,
    height: 120,
    borderColor: '#00e548',
    elevation: 7,
    borderWidth: 5,
    borderRadius: 20,
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
