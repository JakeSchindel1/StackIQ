// src/data/types/authUser.ts
import { SubscriptionStatus, CheckIn } from './subscription';

// Basic auth user information (from Firebase)
export interface AuthUser {
    id: string;
    email: string | null;
    displayName: string | null;
    isAnonymous: boolean;
    photoURL?: string;
}

// Base user profile information
export interface UserProfile {
    id: string;
    email: string | null;
    displayName: string | null;
    photoURL?: string;
    createdAt: string;
    lastLogin: string;
    phoneNumber?: string;
    preferences?: {
        notifications: boolean;
        emailUpdates: boolean;
        timezone: string;
    };
}

// Complete user data including subscription and profile
export interface CompleteUserData extends AuthUser {
    profile?: UserProfile;
    subscription?: SubscriptionStatus;
    checkIns?: CheckIn[];
    aiInteractionHistory?: {
        lastCheckIn: string;
        totalCheckIns: number;
        implementedSuggestions: number;
        helpfulSuggestions: number;
    };
}