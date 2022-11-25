import {
  useState,
  useEffect,
  useCallback
} from 'react'
import {
  Text,
  View,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles'
import { useCameraDevices, Camera, useFrameProcessor } from 'react-native-vision-camera'
import { scanBarcodes, BarcodeFormat, Barcode } from 'vision-camera-code-scanner'
import { useIsFocused } from '@react-navigation/native'
import { runOnJS } from 'react-native-reanimated';

const QRScanScreen = ({ navigation }) => {
  const isFocused = useIsFocused()
  
  const colorScheme = useColorScheme();
  const textTheme = colorScheme === 'light' ? globalStyles.lightThemeText : globalStyles.darkThemeText
  const containerTheme = colorScheme === 'light' ? globalStyles.lightContainer : globalStyles.darkContainer

  const [hasPermission, setHasPermission] = useState(false)


  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  
  const devices = useCameraDevices()
  const device = devices.back

  const onQRCodeDetected = useCallback((qrCode : Barcode) => {
    navigation.navigate("PostScan", qrCode)
  }, [])

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    const qrCodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
    if (qrCodes.length > 0) {
      runOnJS(onQRCodeDetected)(qrCodes[0])
    }
  }, [onQRCodeDetected])
  
  if (device == null) return <View />
  return (
    <View style={globalStyles.container}>
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={isFocused}
      frameProcessor={frameProcessor}
      frameProcessorFps={5}
    />
    </View>
  );
}

export default QRScanScreen
