// src/services/auth/AuthService.ts
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    type User,
    onAuthStateChanged,
    Auth
  } from 'firebase/auth';
  
  interface AuthError {
    code: string;
    message: string;
  }
  
  interface AuthUser {
    id: string;
    email: string | null;
    displayName: string | null;
    isAnonymous: boolean;
  }
  
  class AuthService {
    private auth: Auth;
  
    constructor() {
      this.auth = getAuth();
    }
  
    // Convert Firebase User to AuthUser
    private mapUserToAuthUser(user: User | null): AuthUser | null {
      if (!user) return null;
      return {
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        isAnonymous: user.isAnonymous
      };
    }
  
    // Email & Password Sign Up
    async signUp(email: string, password: string, displayName: string): Promise<AuthUser> {
      try {
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        return this.mapUserToAuthUser(userCredential.user)!;
      } catch (error: any) {
        throw this.handleAuthError(error);
      }
    }
  
    // Email & Password Sign In
    async signIn(email: string, password: string): Promise<AuthUser> {
      try {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
        return this.mapUserToAuthUser(userCredential.user)!;
      } catch (error: any) {
        throw this.handleAuthError(error);
      }
    }
  
    // Sign Out
    async signOut(): Promise<void> {
      try {
        await signOut(this.auth);
      } catch (error: any) {
        throw this.handleAuthError(error);
      }
    }
  
    // Password Reset
    async resetPassword(email: string): Promise<void> {
      try {
        await sendPasswordResetEmail(this.auth, email);
      } catch (error: any) {
        throw this.handleAuthError(error);
      }
    }
  
    // Get Current User
    getCurrentUser(): AuthUser | null {
      return this.mapUserToAuthUser(this.auth.currentUser);
    }
  
    // Subscribe to Auth State Changes
    onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
      return onAuthStateChanged(this.auth, (user) => {
        callback(this.mapUserToAuthUser(user));
      });
    }
  
    // Error Handler
    private handleAuthError(error: any): AuthError {
      const authError: AuthError = {
        code: error.code || 'auth/unknown',
        message: 'An authentication error occurred.'
      };
  
      switch (error.code) {
        case 'auth/email-already-in-use':
          authError.message = 'This email is already registered.';
          break;
        case 'auth/invalid-email':
          authError.message = 'Please enter a valid email address.';
          break;
        case 'auth/operation-not-allowed':
          authError.message = 'This authentication method is not enabled.';
          break;
        case 'auth/weak-password':
          authError.message = 'Please choose a stronger password.';
          break;
        case 'auth/user-disabled':
          authError.message = 'This account has been disabled.';
          break;
        case 'auth/user-not-found':
          authError.message = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          authError.message = 'Incorrect password.';
          break;
        default:
          authError.message = error.message || authError.message;
      }
  
      return authError;
    }
  }
  
  export default AuthService;