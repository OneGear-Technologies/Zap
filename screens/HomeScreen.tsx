import { useState, useEffect } from 'react'
import {
  Text,
  View,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles'
import { useCameraDevices, Camera } from 'react-native-vision-camera'
import { useScanBarcodes, BarcodeFormat, Barcode } from 'vision-camera-code-scanner'


const HomeScreen = ({ navigation }) => {

  const colorScheme = useColorScheme();
  const textTheme = colorScheme === 'light' ? globalStyles.lightThemeText : globalStyles.darkThemeText
  const containerTheme = colorScheme === 'light' ? globalStyles.lightContainer : globalStyles.darkContainer

  const [hasPermission, setHasPermission] = useState(false)
  const [scanned, setScanned] = useState(false)


  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  
  const devices = useCameraDevices()
  const device = devices.back

  const [frameProcessor, qrcodeScanned] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });


  if(qrcodeScanned.length && !scanned)
  {
    const item = qrcodeScanned.pop()
    console.log(item["displayValue"])

    // checking with the API
    // TODO: add smthn, like a "disable qrscan" until after the request is over? so it won't be spammed over and over again
    // this disable qrscan will simply stop scanning any new qr codes, until the request is complete
    setScanned(true)
    let data = item // after doing stuff with this data
    navigation.navigate("PostScan", data)
  }
  
  if (device == null) return <View />
  return (
    <View style={globalStyles.container}>
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
      frameProcessorFps={5}
    />
    <Text style={globalStyles.lightThemeText}>I BUTTON</Text>
    </View>
  );
}

export default HomeScreen
