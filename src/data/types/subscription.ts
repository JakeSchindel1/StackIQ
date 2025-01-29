// src/data/types/subscription.ts
import { UserProfile } from './authUser';
import { SupplementHistoryEntry } from './core';

export type SubscriptionTier = 'free' | 'premium';


export interface SubscriptionStatus {
  tier: SubscriptionTier;
  startDate?: string;
  endDate?: string;
  autoRenew: boolean;
  features: PremiumFeatures;
}

export interface PremiumFeatures {
  aiConsultation: boolean;
  extendedHistory: boolean;
  advancedAnalytics: boolean;
}

export interface CheckIn {
  id: string;
  timestamp: string;
  mood: number;
  energy: number;
  sleep: number;
  stress: number;
  symptoms?: string[];
  notes?: string;
  aiSuggestions?: AISuggestion[];
}

export interface AISuggestion {
  id: string;
  timestamp: string;
  type: 'add' | 'remove' | 'modify' | 'general';
  supplementId?: string;
  suggestion: string;
  reasoning: string;
  implemented: boolean;
  userFeedback?: {
    helpful: boolean;
    notes?: string;
  };
}

// Update UserProfile to include subscription and check-in data
export interface ExtendedUserProfile extends UserProfile {
  subscription?: SubscriptionStatus;
  checkIns?: CheckIn[];
  aiInteractionHistory?: {
    lastCheckIn: string;
    totalCheckIns: number;
    implementedSuggestions: number;
    helpfulSuggestions: number;
  };
}

// Interface for AI API requests
export interface AICheckInRequest {
  userId: string;
  currentStack: {
    AM: string[];
    PM: string[];
    FLEX: string[];
  };
  checkInData: Omit<CheckIn, 'id' | 'timestamp' | 'aiSuggestions'>;
  previousCheckIns?: CheckIn[];
  supplementHistory?: SupplementHistoryEntry[];
}

export interface AICheckInResponse {
  suggestions: AISuggestion[];
  analysis: {
    patterns?: string[];
    concerns?: string[];
    positiveIndicators?: string[];
  };
}