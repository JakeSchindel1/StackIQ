// src/data/types/navigation.ts
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

export type AuthScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;