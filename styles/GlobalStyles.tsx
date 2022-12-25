import {
  StyleSheet,
} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 17,
  },
  
  button: {
    alignItems: 'center',
    backgroundColor: '#00ff52',
    width: 140,
    height: 140,
    borderColor: '#00e548',
    elevation: 7,
    borderWidth: 5,
    borderRadius: 20,
  },

  buttonHollowWide: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: 220,
    padding: 20,
    elevation: 7,
    borderWidth: 2,
    borderColor: '#00ff52',
    borderRadius: 20,
  },

  textInputStyle: {
    color: 'black',
    backgroundColor: "#efefef"
  },
  
  buttonFilledWide: {
    alignItems: 'center',
    backgroundColor: '#00ff52',
    width: 220,
    padding: 20,
    elevation: 7,
    borderRadius: 20,
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
