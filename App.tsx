import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/utils/types';
type HomeScreenProps = NativeStackScreenProps<RootStackParamList,"Home">;

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen: React.FC<HomeScreenProps> = (props) =>{
  return (
    <View style = {{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Button title='Go to Profile' onPress={()=> props.navigation.push('Profile')}></Button>
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
