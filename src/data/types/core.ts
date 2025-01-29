// src/data/types/core.ts

export type TimeOfDay = 'AM' | 'PM' | 'FLEX';

export interface UserProfile {
  id: string;
  email?: string;
  isGuest: boolean;
  conditions: string[];
  surveyResults?: {
    basicSurvey?: {
      lastTaken: string;
      responses: Record<string, any>;
    };
    detailedSurvey?: {
      lastTaken: string;
      responses: Record<string, any>;
    };
  };
  supplementStacks: {
    AM: UserSupplement[];
    PM: UserSupplement[];
    FLEX: UserSupplement[];
  };
  preferences: {
    reminderDefaults: {
      AM: { hour: number; minute: number };
      PM: { hour: number; minute: number };
    };
  };
  lastSyncTime?: string;
}

export interface Supplement {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  dosage: {
    amount: number;
    unit: string;
    recommendedTiming: TimeOfDay[];
  };
  warnings?: string[];
  contraindications?: string[];
  categories: string[];
  inStock: boolean;
  price: number;
  scoring: SupplementScore;
}

export interface UserSupplement extends Supplement {
  actualTiming: TimeOfDay[];
  reminder?: {
    enabled: boolean;
    times: {
      timeOfDay: TimeOfDay;
      hour: number;
      minute: number;
    }[];
  };
  addedDate: string;
  lastModified: string;
  userScore?: number;
  activeConditions?: string[];
}

export interface SupplementScore {
  id: string;
  baseScore: number;
  timing: TimeOfDay;
  conditions: {
    [key: string]: {
      points: number;
      multiplier?: number;
    }
  };
  synergies: {
    [key: string]: number;
  };
  sameTimingConflicts?: {
    [key: string]: number;
  };
  maxScore?: number;
  conditions_negative?: {
    [key: string]: number;
  };
}

export interface UserSupplement {
    id: string;
    name: string;
    frequency: string;
    timing: TimeOfDay;
    startDate: string;
    endDate?: string;
    notes?: string;
}

export interface SupplementHistoryEntry {
    supplementId: string;
    action: 'added' | 'removed' | 'modified';
    timing: TimeOfDay;
    timestamp: string;
    changes?: Partial<UserSupplement>;
    previousScore?: number;
    newScore?: number;
}