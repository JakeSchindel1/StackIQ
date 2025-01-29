// src/hooks/useGoogleAuth.ts
import { useState } from 'react';
import GoogleAuthProviderService from '../services/auth/providers/GoogleAuth';
import { TokenResponse, AuthRequestPromptOptions, AuthSessionResult } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';

const googleAuthProvider = new GoogleAuthProviderService();

type PromptAsyncType = (options?: AuthRequestPromptOptions) => Promise<AuthSessionResult>;

export function useGoogleAuth() {
  const [loading, setLoading] = useState(false);
  const [_request, _response, promptAsync] = googleAuthProvider.useGoogleAuth() as [
    Google.GoogleAuthRequestConfig,
    AuthSessionResult | null,
    PromptAsyncType
  ];

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await promptAsync();
      
      if (result?.type === 'success' && result.authentication) {
        const token = (result.authentication as TokenResponse).accessToken;
        if (!token) {
          throw new Error('No access token received');
        }
        await googleAuthProvider.signInWithGoogle(token);
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogle,
    loading
  };
}