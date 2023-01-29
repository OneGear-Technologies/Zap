import {
  Text,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useEffect } from 'react';
import { BackHandler } from "react-native";
import * as RootNavigation from '../utils/RootNavigation'

function handleBackButtonClick() {
  RootNavigation.navigate_params("PostScan", true)
  return true;
}

const PostScanPaymentSuccess = () => {
  
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
    BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);
  
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    }}>

      <View style={{
	width: windowWidth,
	height: (windowHeight * 1.2) / 2,
	position: 'absolute',
	top: -50,
	borderRadius: 50,
	backgroundColor: "#00ff52",
      }}/>

      <Text style=
	{{
	  color: 'white',
	  fontWeight: 'bold',
	  fontSize: 30,
	  position: 'absolute',
	  top: (windowHeight) / 2 - 200,
	}}
      >
	Payment Succesful!
      </Text>
      
      <Image
	source={ require("../res/tickmark.png")}
	style={{
	  width: 150,
	  height: 150,
	  position: 'absolute',
	  top: (windowHeight) / 2 - 50,
	}}
      />

      

    </View>
  );
}


export default PostScanPaymentSuccess
