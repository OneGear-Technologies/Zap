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
  TouchableOpacity,
  Button
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles'
import { useCameraDevices, Camera, useFrameProcessor } from 'react-native-vision-camera'
import { scanBarcodes, BarcodeFormat, Barcode } from 'vision-camera-code-scanner'
import BottomSheet from '@gorhom/bottom-sheet';
import { runOnJS } from 'react-native-reanimated';

const HomeScreen = ({ navigation }) => {

  const colorScheme = useColorScheme();
  const textTheme = colorScheme === 'light' ? globalStyles.lightThemeText : globalStyles.darkThemeText
  const containerTheme = colorScheme === 'light' ? globalStyles.lightContainer : globalStyles.darkContainer
  
  const [hasPermission, setHasPermission] = useState(false)
  const [isFocused, setFocused] = useState(true)

  
  const devices = useCameraDevices()
  const device = devices.back

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '100%'], []);


  const handleSheetChanges = useCallback((index: number) => {
    if(index == 0)
      setFocused(true)
    else if(index == 1)
      setFocused(false)
  }, []);
  
  const onQRCodeDetected = useCallback((qrCode : Barcode) => {
    console.log(qrCode)
    // TODO: API request, here
    if(bottomSheetRef.current)
      bottomSheetRef.current.expand()
  }, [])

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    const qrCodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
    if (qrCodes.length > 0) {
      runOnJS(onQRCodeDetected)(qrCodes[0])
    }
  }, [onQRCodeDetected])
  
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  
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
        onChange={handleSheetChanges}
      >
	<View style={globalStyles.container}>
	  
	</View>
      </BottomSheet>
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  scanQRButtonStyle: {    
    width: 150,
    height: 150,
    padding: 10,
    
    borderRadius: 100,
    backgroundColor: '#eee',
  },
})
