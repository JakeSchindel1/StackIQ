# Development Notes

## Current Status
- Implemented basic type definitions for supplements and user data
- Created storage service for handling local/cloud data sync
- Established project structure

## Key Implementation Details

### Supplement Scoring System
- Base scores for each supplement
- Condition-based modifiers
- Synergy bonuses between supplements
- Time-of-day considerations
- Maximum score caps

### Storage Implementation
- AsyncStorage for local data
- Firebase integration for cloud storage
- Automatic sync on user login
- Offline support with local fallback
- Conflict resolution based on timestamps

### Survey System
- Basic and detailed survey options
- Question types: multiple-choice, single-choice, scale, boolean
- Condition mapping for supplement recommendations

## Premium Features Design
- AI-powered check-ins for personalized recommendations
- Historical data tracking for improved suggestions
- Subscription-based access control
- Cloud storage for long-term history

## TODO
[ ] Complete Firebase setup
[ ] Implement basic navigation
[ ] Build survey screens
[ ] Create supplement stack components
[ ] Add time-based theming
[ ] Set up notifications system

## Questions to Resolve
- AI API integration specifics
- Data retention policy for free vs premium users
- Offline data sync limitations
- Push notification scheduling strategy

## Important Constants/Config
```typescript
const STORAGE_KEYS = {
  USER_PROFILE: 'user_profile',
  SUPPLEMENT_STACKS: 'supplement_stacks',
  LAST_SYNC: 'last_sync_timestamp'
};

const TIME_OF_DAY = ['AM', 'PM', 'FLEX'] as const;
```