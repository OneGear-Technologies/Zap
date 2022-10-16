import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef
} from 'react'
import {
  Text,
  View,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles'
import { useCameraDevices, Camera } from 'react-native-vision-camera'
import { useScanBarcodes, BarcodeFormat, Barcode } from 'vision-camera-code-scanner'
import BottomSheet from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {

  const colorScheme = useColorScheme();
  const textTheme = colorScheme === 'light' ? globalStyles.lightThemeText : globalStyles.darkThemeText
  const containerTheme = colorScheme === 'light' ? globalStyles.lightContainer : globalStyles.darkContainer
  
  const [hasPermission, setHasPermission] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [isFocused, setFocused] = useState(true)

  
  const devices = useCameraDevices()
  const device = devices.back

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '90%'], []);


  const handleSheetChanges = useCallback((index: number) => {
    if(index == 0)
      setFocused(true)
    else if(index == 1)
      setFocused(false)
  }, []);
  
  const [frameProcessor, qrcodeScanned] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);


  if(qrcodeScanned.length && !scanned)
  {
    const item = qrcodeScanned.pop()
    console.log(item["displayValue"])

    // checking with the API
    // TODO: add smthn, like a "disable qrscan" until after the request is over? so it won't be spammed over and over again
    // this disable qrscan will simply stop scanning any new qr codes, until the request is complete
    // TODO: disalbe the camera, postscan (when bottomsheet is active)
    let data = item // after doing stuff with this data

  }
  
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

      <BottomSheet
	index={0}
	ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
      </BottomSheet>
    </View>
  );
}

export default HomeScreen
