/**
 * Demo helpers for testing Google OAuth implementation
 * These functions help simulate and test the OAuth flow
 */

import { googleAuth, authUtils, User } from "@/api/auth";

// Mock user data for testing
export const mockUser: User = {
  id: "demo-user-123",
  email: "demo@example.com",
  firstName: "Demo",
  lastName: "User",
  profileImageUrl: "https://via.placeholder.com/150",
  provider: "google",
};

// Mock token for testing
export const mockToken = "demo-jwt-token-123456789";

/**
 * Demo function to simulate successful Google OAuth callback
 * Use this to test the callback flow without actual Google OAuth
 */
export const simulateSuccessfulCallback = () => {
  // Simulate URL with authorization code
  const mockCode = "demo-auth-code-123";
  const mockState = "demo-state-456";
  
  // Update URL to simulate callback
  const newUrl = `${window.location.origin}/auth/callback?code=${mockCode}&state=${mockState}`;
  window.history.pushState({}, "", newUrl);
  
  // Trigger a page reload to simulate the callback
  window.location.reload();
};

/**
 * Demo function to simulate failed Google OAuth callback
 */
export const simulateFailedCallback = (errorType: "access_denied" | "server_error" = "access_denied") => {
  const newUrl = `${window.location.origin}/auth/callback?error=${errorType}`;
  window.history.pushState({}, "", newUrl);
  window.location.reload();
};

/**
 * Demo function to simulate successful authentication
 * This bypasses the actual OAuth flow for testing
 */
export const simulateSuccessfulAuth = () => {
  // Save mock auth data to localStorage
  authUtils.saveAuthData(mockToken, mockUser);
  
  // Redirect to home page
  window.location.href = "/home";
};

/**
 * Demo function to clear all auth data
 */
export const clearDemoAuth = () => {
  authUtils.clearAuthData();
  window.location.href = "/";
};

/**
 * Demo function to check current auth status
 */
export const checkDemoAuthStatus = () => {
  const user = authUtils.getUser();
  const token = authUtils.getToken();
  const isAuth = authUtils.isAuthenticated();
  
  console.log("=== Demo Auth Status ===");
  console.log("User:", user);
  console.log("Token:", token);
  console.log("Is Authenticated:", isAuth);
  console.log("========================");
  
  return { user, token, isAuth };
};

/**
 * Demo function to test error handling
 */
export const testErrorHandling = () => {
  // Test various error scenarios
  const errors = [
    "Network error",
    "Invalid credentials",
    "Server unavailable",
    "Token expired",
  ];
  
  const randomError = errors[Math.floor(Math.random() * errors.length)];
  console.error("Demo Error:", randomError);
  
  return randomError;
};

/**
 * Demo function to simulate loading states
 */
export const simulateLoading = (duration: number = 2000) => {
  console.log("Demo: Starting loading simulation...");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Demo: Loading simulation complete");
      resolve(true);
    }, duration);
  });
};

/**
 * Demo function to test localStorage functionality
 */
export const testLocalStorage = () => {
  console.log("=== Testing localStorage ===");
  
  // Test saving data
  authUtils.saveAuthData(mockToken, mockUser);
  console.log("✅ Saved auth data");
  
  // Test retrieving data
  const retrievedUser = authUtils.getUser();
  const retrievedToken = authUtils.getToken();
  console.log("✅ Retrieved user:", retrievedUser);
  console.log("✅ Retrieved token:", retrievedToken);
  
  // Test authentication check
  const isAuth = authUtils.isAuthenticated();
  console.log("✅ Is authenticated:", isAuth);
  
  // Test clearing data
  authUtils.clearAuthData();
  const clearedUser = authUtils.getUser();
  const clearedToken = authUtils.getToken();
  console.log("✅ After clearing - User:", clearedUser);
  console.log("✅ After clearing - Token:", clearedToken);
  
  console.log("============================");
};

/**
 * Demo function to test URL parameter parsing
 */
export const testUrlParsing = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const state = urlParams.get("state");
  const error = urlParams.get("error");
  
  console.log("=== URL Parameters ===");
  console.log("Code:", code);
  console.log("State:", state);
  console.log("Error:", error);
  console.log("======================");
  
  return { code, state, error };
};

// Export all demo functions for easy access in browser console
if (typeof window !== "undefined") {
  (window as any).demoHelpers = {
    simulateSuccessfulCallback,
    simulateFailedCallback,
    simulateSuccessfulAuth,
    clearDemoAuth,
    checkDemoAuthStatus,
    testErrorHandling,
    simulateLoading,
    testLocalStorage,
    testUrlParsing,
    mockUser,
    mockToken,
  };
  
  console.log("Demo helpers loaded! Use window.demoHelpers to access functions.");
}
