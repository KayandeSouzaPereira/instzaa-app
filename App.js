import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';
import { Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat'; 
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import AppNavigacao from './app/rotas/Main/index';

export default function App() {
  let [fontsLoaded] = useFonts({OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold,Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold });
  if (!fontsLoaded) {
    return ;
  } else {
  SplashScreen.hideAsync();
  return (
          <NavigationContainer>
              <AppNavigacao />
          </NavigationContainer>
  );
}}


