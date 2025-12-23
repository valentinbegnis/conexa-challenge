👉 [Go to Spanish version](./README-es.md)

# Conexa Challenge – React Native Developer

**React Native mobile application built with Expo** as part of the Conexa technical challenge.

This document explains **how to run the project locally** and **the technical decisions taken for each feature**.

## Requirements

Before running the project, make sure you have the following installed:

- **Node.js** ≥ 18 (I am using 24.12.0)
- **npm** or **yarn**
- **Expo CLI**
- **Android Studio** (for Android emulator) or **Xcode** (for iOS simulator)
- A physical device with **Expo Go** (optional)

## Project Setup

### 1. Clone repository

```bash
git clone git@github.com:valentinbegnis/conexa-challenge.git
cd conexa-challenge
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Expo development server

```bash
npx expo start
```

## Technical Decisions

### Data Fetching & Caching

The application uses **React Query (TanStack Query)** to fetch data from the public **JSONPlaceholder API**.

Data sources:

- Posts
- Users

React Query is responsible for:

- Fetching remote data
- Caching responses in memory
- Preventing unnecessary refetches
- Providing loading and error states to the UI

Why React Query:

- It removes the need for manual loading/error state handling
- Built-in caching improves performance and UX
- Keeps server state clearly separated from client state

The cached data lives in memory and is automatically reused across screens (e.g. navigating between Home, Users, and Post Detail).

### Client State vs Server State

A clear distinction is made between **server state** and **client state**:

- **Server State**
  - Managed by React Query
  - Posts and users fetched from JSONPlaceholder
  - Cached in memory
  - Refetched only when needed

- **Client State**
  - Managed by Zustand
  - Favorite posts
  - Authentication state

This separation avoids mixing responsibilities and keeps the architecture predictable and scalable.

### Favorites Management

Favorite posts are handled using a **dedicated Zustand store**.

Responsibilities:

- Toggle posts from favorites
- Expose derived state (e.g. favorite count)
- Share state across multiple screens (Home, Favorites, Post Detail)

Why Zustand:

- Minimal boilerplate
- Ideal for small but global client state
- No unnecessary complexity compared to Redux

### Authentication State

Authentication is handled using a **dedicated Zustand store**.

Characteristics:

- Mocked authentication flow (no backend)
- Stores user session and login state
- Persisted using AsyncStorage
- Shared across the entire app

Why a separate auth store:

- Clear separation of concerns
- Easy to extend with real tokens or API calls
- Matches how production apps structure auth logic

Protected routes depend directly on this store, making auth boundaries explicit.

### State Persistence (AsyncStorage)

Zustand is integrated with **AsyncStorage** to persist critical client state across app restarts.

Persisted state:

- Favorite posts
- Auth session

Why persistence:

- Favorites should not be lost when the app is closed
- User should remain logged in after restarting the app
- Matches real-world mobile app expectations

Implementation:

- Zustand `persist` middleware
- AsyncStorage as the storage engine
- Automatic rehydration on app launch

### Post Detail & Sharing Feature

The Post Detail screen includes an **extra feature**: content sharing.

Features:

- Share post content using the native share dialog
- Works with WhatsApp and any compatible installed app
- Uses the platform-native Share API

### Performance & List Optimization

Base list performance was good given the scope of the challenge.

As a sanity check, frame metrics were collected on Android using `adb dumpsys gfxinfo`. Based on these results, minor adjustments were applied to list rendering to prevent unnecessary re-renders:

- Item rendering is memoized using `useCallback`
- Derived data (filters, favorites) uses `useMemo`
- Avoided inline functions and unnecessary closures

### Navigation Architecture

The app uses **Expo Router** with a clear separation between navigation layers:

- **Stack navigation**
  - Authentication
  - Post detail screen

- **Tab navigation**
  - Home
  - Favorites
  - Users

Why this structure:

- Keeps tab navigation isolated
- Allows full-screen detail views
- Simplifies protected routes

### Testing Strategy

The project includes **unit and screen tests** using:

- Jest
- React Native Testing Library
- jest-expo preset

Tested areas:

- Zustand stores (favorites)
- Home screen search behavior
- Favorites screen empty and populated states

### Login UX & Validation

Although authentication is mocked, the login flow was designed to mirror real UX expectations:

- Email format validation
- Disabled submit button for invalid input
- Loading feedback during login
- Keyboard handling and dismissal
