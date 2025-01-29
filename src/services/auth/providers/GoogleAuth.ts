import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, signInWithCredential, GoogleAuthProvider as FirebaseGoogleProvider } from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

export class GoogleAuthProviderService {
  private auth;

  constructor() {
    this.auth = getAuth();
  }

  useGoogleAuth() {
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: '88599104808-4sgum83fvjuvedvjn368osdaaflkelgl.apps.googleusercontent.com', // for Expo client
      iosClientId: '88599104808-4sgum83fvjuvedvjn368osdaaflkelgl.apps.googleusercontent.com',
      androidClientId: '88599104808-4sgum83fvjuvedvjn368osdaaflkelgl.apps.googleusercontent.com', // if you have one
      webClientId: '88599104808-4sgum83fvjuvedvjn368osdaaflkelgl.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    });

    return [request, response, promptAsync];
  }

  async signInWithGoogle(accessToken: string): Promise<void> {
    try {
      const credential = FirebaseGoogleProvider.credential(null, accessToken);
      await signInWithCredential(this.auth, credential);
    } catch (error: any) {
      console.error('Error in signInWithGoogle:', error);
      throw {
        code: error.code || 'auth/google-signin-failed',
        message: error.message || 'Failed to sign in with Google'
      };
    }
  }
}

export default GoogleAuthProviderService;