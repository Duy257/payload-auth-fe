# Google OAuth Implementation Guide

## Tổng quan

Đã triển khai thành công chức năng đăng nhập với Google OAuth sử dụng 2 API endpoints:
- `http://localhost:4000/auth/google` - Khởi tạo OAuth flow
- `http://localhost:4000/google/callback` - Xử lý callback từ Google

## Cấu trúc Files

```
src/
├── api/
│   └── auth.ts                 # API service cho authentication
├── contexts/
│   └── AuthContext.tsx         # React Context cho auth state
├── app/
│   ├── pages/
│   │   ├── auth-callback.tsx   # Callback page xử lý OAuth response
│   │   ├── home.tsx           # Protected home page
│   │   └── landing.tsx        # Landing page với auth form
│   └── page.tsx               # Main app với routing
├── components/
│   └── auth-form.tsx          # Auth form component
├── utils/
│   └── demo-helpers.ts        # Demo utilities cho testing
└── tests/
    └── google-oauth-test.md   # Test guide
```

## Cách sử dụng

### 1. Khởi chạy ứng dụng

```bash
npm run dev
# hoặc
bun dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### 2. Test Google OAuth Flow

1. **Mở ứng dụng** tại `http://localhost:3000`
2. **Click "Tiếp tục với Google"** button
3. **Sẽ redirect** đến `http://localhost:4000/auth/google`
4. **Backend xử lý** và redirect đến Google OAuth
5. **Sau khi đăng nhập Google**, redirect về `/auth/callback`
6. **Callback page xử lý** và redirect về `/home`

### 3. Demo Functions (Development Mode)

Trong development mode, có thể sử dụng demo functions trong browser console:

```javascript
// Simulate successful authentication
window.demoHelpers.simulateSuccessfulAuth();

// Check current auth status
window.demoHelpers.checkDemoAuthStatus();

// Clear auth data
window.demoHelpers.clearDemoAuth();

// Test localStorage functionality
window.demoHelpers.testLocalStorage();

// Simulate callback scenarios
window.demoHelpers.simulateSuccessfulCallback();
window.demoHelpers.simulateFailedCallback();
```

## API Endpoints Requirements

### Backend cần implement:

#### 1. `GET /auth/google`
```javascript
// Khởi tạo Google OAuth flow
// - Tạo authorization URL với Google OAuth
// - Include state parameter cho security
// - Redirect user đến Google OAuth page
```

#### 2. `GET /google/callback`
```javascript
// Xử lý callback từ Google OAuth
// Query parameters: ?code=xxx&state=xxx
// - Verify state parameter
// - Exchange authorization code cho access token
// - Lấy user info từ Google API
// - Tạo JWT token hoặc session
// - Redirect về frontend với user data
```

#### 3. `GET /auth/status` (Optional)
```javascript
// Kiểm tra authentication status
// - Return user info nếu đã authenticated
// - Return error nếu chưa authenticated
```

## Features Implemented

### ✅ Core Features
- Google OAuth integration
- Authentication state management
- Persistent login với localStorage
- Auto-redirect sau authentication
- Error handling và user feedback
- Loading states và UI feedback

### ✅ Security Features
- State parameter cho CSRF protection
- Secure token storage
- Error message sanitization
- Authentication status verification

### ✅ User Experience
- Responsive design
- Loading indicators
- Error messages
- Success feedback
- Smooth transitions

## Components Overview

### 1. `AuthContext` (`src/contexts/AuthContext.tsx`)
- Quản lý global authentication state
- Provide `useAuth()` hook
- Auto-check auth status on app load
- Handle login/logout operations

### 2. `AuthForm` (`src/components/auth-form.tsx`)
- UI component cho login/register
- Google OAuth button integration
- Email/password form (ready for implementation)
- Error handling và validation

### 3. `AuthCallback` (`src/app/pages/auth-callback.tsx`)
- Xử lý OAuth callback từ Google
- Parse URL parameters (code, state, error)
- Handle success/error scenarios
- Auto-redirect sau xử lý

### 4. API Service (`src/api/auth.ts`)
- `googleAuth.initiateLogin()` - Start OAuth flow
- `googleAuth.handleCallback()` - Process callback
- `authUtils` - localStorage utilities
- Type definitions cho authentication

## Testing

### Manual Testing
1. Test Google OAuth flow end-to-end
2. Test error scenarios (access denied, network errors)
3. Test authentication persistence
4. Test logout functionality

### Demo Testing
Sử dụng demo helpers để test các scenarios:
```javascript
// Test successful auth flow
window.demoHelpers.simulateSuccessfulAuth();

// Test error handling
window.demoHelpers.simulateFailedCallback('access_denied');

// Test localStorage
window.demoHelpers.testLocalStorage();
```

## Next Steps

1. **Backend Implementation**: Implement required API endpoints
2. **Google OAuth Setup**: Configure Google OAuth credentials
3. **Production Setup**: Configure production URLs và security
4. **Enhanced Error Handling**: Add more specific error scenarios
5. **User Profile Management**: Add profile editing features
6. **Email/Password Auth**: Complete traditional auth implementation

## Troubleshooting

### Common Issues

1. **Redirect không hoạt động**
   - Kiểm tra backend endpoints có running không
   - Verify URL configuration

2. **Authentication state không persist**
   - Check localStorage permissions
   - Verify token format

3. **Callback page lỗi**
   - Check URL parameters parsing
   - Verify backend response format

### Debug Tools

Sử dụng browser console để debug:
```javascript
// Check current auth state
window.demoHelpers.checkDemoAuthStatus();

// Check URL parameters
window.demoHelpers.testUrlParsing();

// Test localStorage
window.demoHelpers.testLocalStorage();
```
