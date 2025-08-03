# Google OAuth Implementation Test Guide

## Tổng quan
Đã triển khai chức năng đăng nhập với Google OAuth sử dụng 2 API endpoints:
- `http://localhost:4000/auth/google` - Khởi tạo OAuth flow
- `http://localhost:4000/google/callback` - Xử lý callback từ Google

## Cấu trúc Implementation

### 1. API Service (`src/api/auth.ts`)
- ✅ `googleAuth.initiateLogin()` - Redirect đến Google OAuth
- ✅ `googleAuth.handleCallback()` - Xử lý callback từ Google
- ✅ `googleAuth.checkAuthStatus()` - Kiểm tra trạng thái đăng nhập
- ✅ `authUtils` - Utility functions cho localStorage
- ✅ `emailAuth` - Traditional email/password auth
- ✅ `logout()` - Đăng xuất

### 2. Auth Context (`src/contexts/AuthContext.tsx`)
- ✅ React Context để quản lý authentication state
- ✅ `useAuth()` hook
- ✅ `useRequireAuth()` hook cho protected routes
- ✅ Auto-check auth status on app load
- ✅ Persistent authentication với localStorage

### 3. Auth Callback Page (`src/app/pages/auth-callback.tsx`)
- ✅ Xử lý callback từ Google OAuth
- ✅ Loading, success, error states
- ✅ Auto redirect về trang home sau khi thành công
- ✅ Error handling cho các trường hợp lỗi

### 4. Auth Form Component (`src/components/auth-form.tsx`)
- ✅ Tích hợp Google OAuth button
- ✅ Loading states và disabled states
- ✅ Error handling và display
- ✅ Email/password login integration

### 5. Router Configuration (`src/app/page.tsx`)
- ✅ AuthProvider wrapper
- ✅ Route cho `/auth/callback`
- ✅ Route cho `/home`

## Test Cases

### Test Case 1: Google OAuth Flow
**Mục tiêu**: Test toàn bộ Google OAuth flow

**Bước thực hiện**:
1. Mở ứng dụng tại `http://localhost:3000`
2. Click "Tiếp tục với Google" button
3. Kiểm tra redirect đến `http://localhost:4000/auth/google`
4. Backend sẽ redirect đến Google OAuth
5. Sau khi đăng nhập Google, sẽ redirect về `/auth/callback`
6. Callback page xử lý và redirect về `/home`

**Kết quả mong đợi**:
- ✅ Button disabled khi loading
- ✅ Redirect đúng endpoints
- ✅ Callback page hiển thị loading state
- ✅ Thành công redirect về home page
- ✅ User state được lưu trong localStorage

### Test Case 2: Error Handling
**Mục tiêu**: Test xử lý lỗi trong OAuth flow

**Bước thực hiện**:
1. Simulate lỗi từ Google (access_denied)
2. Simulate lỗi từ backend API
3. Simulate network errors

**Kết quả mong đợi**:
- ✅ Error messages hiển thị đúng
- ✅ Retry button hoạt động
- ✅ Không crash application

### Test Case 3: Authentication State Management
**Mục tiêu**: Test quản lý trạng thái authentication

**Bước thực hiện**:
1. Đăng nhập thành công
2. Refresh page
3. Check localStorage persistence
4. Test logout functionality

**Kết quả mong đợi**:
- ✅ Auth state persist sau refresh
- ✅ User data lưu trong localStorage
- ✅ Logout clear auth data
- ✅ Auto redirect về login khi chưa auth

### Test Case 4: UI/UX States
**Mục tiêu**: Test các trạng thái UI

**Bước thực hiện**:
1. Test loading states
2. Test disabled states
3. Test error display
4. Test success feedback

**Kết quả mong đợi**:
- ✅ Loading spinners hiển thị đúng
- ✅ Buttons disabled khi cần thiết
- ✅ Error messages clear và helpful
- ✅ Success feedback rõ ràng

## Backend Requirements

Để implementation hoạt động đúng, backend cần:

### 1. `/auth/google` endpoint
```javascript
// GET /auth/google
// - Tạo Google OAuth authorization URL
// - Redirect user đến Google OAuth
// - Include state parameter để security
```

### 2. `/google/callback` endpoint
```javascript
// GET /google/callback?code=xxx&state=xxx
// - Nhận authorization code từ Google
// - Exchange code để lấy access token
// - Lấy user info từ Google API
// - Tạo JWT token hoặc session
// - Return user data và token
```

### 3. `/auth/status` endpoint (optional)
```javascript
// GET /auth/status
// - Kiểm tra authentication status
// - Return user info nếu đã đăng nhập
```

## Security Considerations

- ✅ State parameter để prevent CSRF attacks
- ✅ HTTPS required cho production
- ✅ Secure token storage
- ✅ Token expiration handling
- ✅ Error message không expose sensitive info

## Next Steps

1. **Backend Integration**: Implement backend endpoints
2. **Testing**: Test với real Google OAuth credentials
3. **Error Handling**: Enhance error handling cho edge cases
4. **Security**: Add additional security measures
5. **User Experience**: Polish UI/UX based on user feedback
