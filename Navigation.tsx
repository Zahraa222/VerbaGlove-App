import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import BLEScanner from './screens/BLEScanner';
import HomeScreen from './screens/HomeScreen';

export type RootStackParamList = {
  HomeScreen: { deviceId: string };
  BLEScanner: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BLEScanner">
        
        {/* 🔹 Scan for Devices Screen with ONLY Forward Arrow (→) */}
        <Stack.Screen 
          name="BLEScanner" 
          component={BLEScanner} 
          options={({ navigation }) => ({
            title: 'Scan for Devices',
            headerLeft: () => null, // 🔥 Removes the default back arrow
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('HomeScreen', { deviceId: 'ESP32' })} style={{ marginRight: 15 }}>
                <FontAwesome name="arrow-right" size={22} color="black" />
              </TouchableOpacity>
            ),
          })}
        />

        {/* 🔹 Home Screen (No default header, uses custom navbar) */}
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
