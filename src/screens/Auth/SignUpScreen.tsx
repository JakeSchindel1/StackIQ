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

export const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await authService.signUp(email, password, displayName);
      navigation.navigate('Home');
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
          <Text style={authStyles.title}>Create Account</Text>
          
          {error ? <Text style={authStyles.errorText}>{error}</Text> : null}
          
          <View style={authStyles.formContainer}>
            <TextInput
              style={authStyles.input}
              placeholder="Display Name"
              value={displayName}
              onChangeText={setDisplayName}
              autoCapitalize="words"
              clearButtonMode="while-editing"
              returnKeyType="next"
            />

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
              returnKeyType="next"
            />

            <TextInput
              style={authStyles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              clearButtonMode="while-editing"
              returnKeyType="done"
            />
          </View>
          
          <TouchableOpacity 
            style={authStyles.primaryButton}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={authStyles.primaryButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignIn')}
            style={authStyles.link}
          >
            <Text style={authStyles.linkText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};