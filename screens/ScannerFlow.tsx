import PostScan from './PostScan'
import PostScanPaymentSuccess from './PostScanPaymentSuccess'
import PostScanPaymentFailure from './PostScanPaymentFailure'
import QRScanScreen from './QRScanScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const ScannerFlow = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="QRScan" component={QRScanScreen} />
      <Stack.Screen name="PostScan" component={PostScan} />
      <Stack.Screen name="PostScanPaymentFailure" component={PostScanPaymentFailure} />
      <Stack.Screen name="PostScanPaymentSuccess" component={PostScanPaymentSuccess} />
    </Stack.Navigator>
  )
}

export default ScannerFlow
