// src/screens/Auth/SignInScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../../data/types';
import { authStyles } from './styles';
import AuthService from '../../services/auth/AuthService';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';

const authService = new AuthService();

export const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { signInWithGoogle, loading: googleLoading } = useGoogleAuth();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await authService.signIn(email, password);
      navigation.navigate('Home');
    } catch (err: any) {
      setError(err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      const user = authService.getCurrentUser();
      if (user) {
        navigation.navigate('Home');
      }
    } catch (err: any) {
      setError(err.message);
      Alert.alert('Error', err.message);
    }
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.container}
      >
        <View style={authStyles.contentContainer}>
          <Text style={authStyles.title}>Welcome Back</Text>
          
          {error ? <Text style={authStyles.errorText}>{error}</Text> : null}
          
          <View style={authStyles.formContainer}>
            <TextInput
              style={authStyles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              returnKeyType="next"
            />
            
            <TextInput
              style={authStyles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              clearButtonMode="while-editing"
              returnKeyType="done"
            />
          </View>
          
          <TouchableOpacity 
            style={authStyles.primaryButton}
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={authStyles.primaryButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={authStyles.secondaryButton}
            onPress={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text style={authStyles.secondaryButtonText}>Continue with Google</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('ForgotPassword')}
            style={authStyles.link}
          >
            <Text style={authStyles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignUp')}
            style={authStyles.link}
          >
            <Text style={authStyles.linkText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};