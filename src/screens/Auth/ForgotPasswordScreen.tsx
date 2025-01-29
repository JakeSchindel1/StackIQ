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

const authService = new AuthService();

export const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      setError('');
      await authService.resetPassword(email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (err: any) {
      setError(err.message);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.container}
      >
        <View style={authStyles.contentContainer}>
          <Text style={authStyles.title}>Reset Password</Text>
          
          {error ? <Text style={authStyles.errorText}>{error}</Text> : null}
          {message ? <Text style={authStyles.successText}>{message}</Text> : null}
          
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
              returnKeyType="done"
            />
          </View>
          
          <TouchableOpacity 
            style={authStyles.primaryButton}
            onPress={handleResetPassword}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={authStyles.primaryButtonText}>Send Reset Link</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignIn')}
            style={authStyles.link}
          >
            <Text style={authStyles.linkText}>Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};