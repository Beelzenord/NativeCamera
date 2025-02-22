import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/utils/types';
import {useCameraPermissions, useMicrophonePermissions} from 'expo-camera'
import { usePermissions } from 'expo-media-library';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraScreen from './src/component/camerascreen.component';
type HomeScreenProps = NativeStackScreenProps<RootStackParamList,"Home">;

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen: React.FC<HomeScreenProps> = (props) =>{
  const [cameraPermission,requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [mediaLibraryPermission,requestMediaLibraryPermission] = usePermissions();
  
  async function handleContinue(){
    const allPermissions = await requestAllPermissions();
    if(allPermissions){
      console.log('have all permissions');  
    }
  }

  React.useEffect(()=>{
    handleContinue();
  },[]);

  async function requestAllPermissions(){
    const cameraStatus = await requestCameraPermission();
    if(!cameraStatus.granted){
      Alert.alert("Error","Camera permission is required");
      return false;
    }
    const microphoneStatus = await requestMicrophonePermission();
    if(!microphoneStatus.granted){
      Alert.alert("Error", "Microphone permission is required");
      return false;
    }

    const mediaLibraryStatus = await requestMediaLibraryPermission();
    if(!mediaLibraryStatus.granted){
      Alert.alert("Error","Media Library permission is required");
      return false;
    }
    await AsyncStorage.setItem("hasOpened","true");
    return true;
  }
  
  return (
    <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
      
      <Button title='Go to Profile' onPress={()=> props.navigation.push('Profile')}></Button>
      <Button title='Go to Camera' onPress={()=> props.navigation.push('Camera')}></Button>
      <Button title='Go to Settings' onPress={()=>null}></Button>
    </View>
  );
}
const ProfileScreen = () => {
  return (
    <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text>Profile Screen</Text>
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Camera" component={CameraScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
