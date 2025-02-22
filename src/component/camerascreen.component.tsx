import * as React from 'react';
import { View,Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';
import { CameraView } from 'expo-camera';
//import * as 
type CameraScreenProps = NativeStackScreenProps<RootStackParamList,"Camera">;
const CameraScreen: React.FC<CameraScreenProps> = () => {
    const cameraRef = React.useRef<CameraView>(null);
    console.log(cameraRef);
    return (
        <CameraView ref={cameraRef} style={{flex:1}} />)
}
export default CameraScreen;