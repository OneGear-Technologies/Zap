import {
  Text,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles'

const PostScanPaymentFailure = () => {
  
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

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
	backgroundColor: "#ff0000",
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
	Payment Failed!
      </Text>
      
      <Image
	source={ require("../res/cancelmark.png")}
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


export default PostScanPaymentFailure
