// App.tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import firebase from '@react-native-firebase/app';

// Import your screens
import { SignInScreen } from './src/screens/Auth/SignInScreen';
import { SignUpScreen } from './src/screens/Auth/SignUpScreen';
import { ForgotPasswordScreen } from './src/screens/Auth/ForgotPasswordScreen';

// Enable screens for better performance
enableScreens();

// Create a type for the stack navigator
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

// Temporary Home Screen component
const TemporaryHome: React.FC = () => {
  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#FFFFFF' 
    }}>
      <Text style={{ fontSize: 20 }}>Welcome Home!</Text>
    </View>
  );
};

export default function App() {
  useEffect(() => {
    const testFirebase = async () => {
      try {
        console.log('Firebase initialized:', firebase.app().name);
      } catch (error) {
        console.error('Firebase initialization error:', error);
      }
    };

    testFirebase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false, // Hide the header for all screens
          contentStyle: { backgroundColor: '#FFFFFF' },
          animation: 'slide_from_right', // iOS-style navigation animation
        }}
      >
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen}
        />
        <Stack.Screen 
          name="Home" 
          component={TemporaryHome}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}