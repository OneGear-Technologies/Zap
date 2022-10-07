import { useState, useEffect } from 'react'
import {
  Text,
  View,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles'
import { useCameraDevices, Camera } from 'react-native-vision-camera'
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner'


const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const textTheme = colorScheme === 'light' ? globalStyles.lightThemeText : globalStyles.darkThemeText
  const containerTheme = colorScheme === 'light' ? globalStyles.lightContainer : globalStyles.darkContainer

  const [hasPermission, setHasPermission] = useState(false);

  const devices = useCameraDevices()
  const device = devices.back

  const [frameProcessor, qrcodeScanned] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  
  if (device == null) return <View />
  return (
    <>
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    frameProcessor={frameProcessor}
    frameProcessorFps={5}
    />
    {qrcodeScanned.map((barcode, idx) => (
      <Text key={idx} style={globalStyles.darkThemeText}>
        {barcode.displayValue}
      </Text>
    ))}
    </>
  );
}

export default HomeScreen
