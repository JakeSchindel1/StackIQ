# Project Context for AI Sessions

## Core Functionality
The app helps users track and optimize their supplement intake through:
- Morning/Night supplement stacks
- Survey-based recommendations
- Local & cloud storage
- Time-based UI themes
- Reminder notifications

## Premium Features (Planned)
- AI-powered check-ins
- Historical data analysis
- Personalized recommendations
- Extended data retention

## Current Implementation State

### Completed
- Basic type definitions
- Storage service structure
- Project file organization

### In Progress
- Storage service implementation
- Core type refinements

### Next Steps
- Navigation setup
- Basic UI components
- Survey implementation

## Key Business Logic

### Supplement Scoring
```typescript
interface SupplementScore {
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
  maxScore?: number;
}
```

### Storage Strategy
- Local storage for all users
- Cloud sync for registered users
- Offline-first approach
- Conflict resolution based on timestamps

## Important Notes
- Using Expo for development
- Firebase for backend
- TypeScript throughout
- Plan to integrate AI API for premium features

## File Structure
Key files and their purposes are documented in the project root directory structure.

## Current Challenges
- Efficient local/cloud data sync
- Survey response processing
- Premium feature gating
- AI integration planning

## Storage Architecture

### SupplementStorageService
The `supplementStorage.ts` service handles all data persistence with a dual storage approach:

1. Local Storage (AsyncStorage)
   - Stores data for all users (guest and authenticated)
   - Provides offline access
   - Acts as primary data source for guest users
   - Serves as cache for authenticated users

2. Cloud Storage (Firebase)
   - Only for authenticated users
   - Syncs automatically on login
   - Provides data persistence across devices
   - Handles conflict resolution based on timestamps

### Key Features
- Automatic sync between local and cloud storage
- Offline-first approach (always saves locally first)
- Conflict resolution using timestamp comparison
- Guest user support with local-only storage
- Seamless transition from guest to authenticated user

### Usage Example
```typescript
// Save supplements
await supplementStorage.saveSupplementStack({
  AM: morningSupplements,
  PM: nightSupplements,
  FLEX: flexibleSupplements
});

// Load supplements
const supplements = await supplementStorage.loadSupplementStack();
```

### Data Flow
1. Save Operation:
   - Save to local storage
   - If authenticated, also save to Firebase
   
2. Load Operation:
   - If authenticated:
     - Try loading from Firebase
     - Fall back to local if offline
   - If guest:
     - Load from local storage only

3. Sync Operation:
   - Triggered on user login
   - Merges local and cloud data
   - Resolves conflicts using timestamps

## Subscription System

### Type Structure
The subscription system is built around several key interfaces in `subscription.ts`:

1. Base Types:
```typescript
type SubscriptionTier = 'free' | 'premium';

interface SubscriptionStatus {
  tier: SubscriptionTier;
  startDate?: string;
  endDate?: string;
  autoRenew: boolean;
  features: PremiumFeatures;
}
```

2. Premium Features:
```typescript
interface PremiumFeatures {
  aiConsultation: boolean;
  extendedHistory: boolean;
  advancedAnalytics: boolean;
}
```

### Check-In System
Premium users can access AI-powered check-ins:

1. Check-In Data:
```typescript
interface CheckIn {
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
```

2. AI Suggestions:
```typescript
interface AISuggestion {
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
```

### User Profile Extension
The system extends the base UserProfile with subscription data:
```typescript
interface ExtendedUserProfile extends UserProfile {
  subscription?: SubscriptionStatus;
  checkIns?: CheckIn[];
  aiInteractionHistory?: {
    lastCheckIn: string;
    totalCheckIns: number;
    implementedSuggestions: number;
    helpfulSuggestions: number;
  };
}
```

### AI Integration
Structures for AI API communication:

1. Request Format:
```typescript
interface AICheckInRequest {
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
```

2. Response Format:
```typescript
interface AICheckInResponse {
  suggestions: AISuggestion[];
  analysis: {
    patterns?: string[];
    concerns?: string[];
    positiveIndicators?: string[];
  };
}
```

### Feature Access Control
- Free users: Basic supplement tracking and recommendations
- Premium users: 
  - AI-powered check-ins
  - Historical data analysis
  - Advanced supplement recommendations
  - Extended data retention

### Data Flow
1. User Check-In:
   - User submits daily wellness data
   - System checks subscription status
   - If premium, triggers AI analysis
   
2. AI Processing:
   - Analyzes current supplements
   - Reviews historical data
   - Generates personalized recommendations

3. User Feedback:
   - Users can mark suggestions as implemented
   - Provide feedback on suggestion helpfulness
   - System tracks effectiveness metrics
