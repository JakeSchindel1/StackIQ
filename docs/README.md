# Supplement Tracking App

## Project Overview
Mobile app for tracking and recommending supplements based on user surveys and patterns. Features both local and cloud storage with Firebase integration.

## Current Implementation
- Local and Firebase storage system for supplement data
- Types defined for supplements, user profiles, and scoring
- Basic file structure established

## Core Features
- AM/PM supplement tracking
- Survey-based recommendations
- Local storage for offline/guest use
- Cloud sync for registered users
- Time-based theme switching
- Push notifications for supplement reminders

## Planned Premium Features
- AI-powered check-ins
- Personalized supplement suggestions
- Historical data analysis
- Advanced analytics

## Project Structure
```
src/
├── navigation/
│   ├── AppNavigator.tsx
│   └── StackNavigators/
├── screens/
│   ├── Auth/                      
│   │   ├── SignInScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   ├── Home/
│   ├── Search/
│   ├── Survey/
│   │   ├── BasicSurvey/
│   │   └── DetailedSurvey/
│   └── Profile/
├── components/
│   ├── SupplementStack/
│   ├── Survey/
│   └── TimeBasedGreeting.tsx
├── data/
│   ├── supplements/
│   ├── survey/
│   └── types/
│       ├── core.ts
│       ├── index.ts
│       └── subscription.ts
├── services/
│   ├── storage/
│   │   └── supplementStorage.ts
│   ├── subscription/
│   │   └── subscriptionService.ts
│   └── auth/        
│       ├── providers/
│       │   └── GoogleAuth.ts              
│       ├── AuthService.ts         
│       └── components/            
│           └── AuthForms.tsx
├── hooks/
└── utils/
```

## Tech Stack
- React Native with Expo
- Firebase for backend
- AsyncStorage for local data
- TypeScript for type safety

## Setup
1. Install dependencies:
```bash
npx expo install @react-native-async-storage/async-storage
# Additional dependencies to be added
```

## Next Steps
1. Complete storage service implementation
2. Set up basic navigation
3. Implement core survey screens
4. Build supplement stack components
5. Add time-based theming