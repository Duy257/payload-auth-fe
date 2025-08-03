import axios from "axios";

const API_URL = "http://localhost:4000";

// Types for authentication
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  provider?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface GoogleAuthResponse {
  authUrl?: string;
  success: boolean;
  message?: string;
}

// Google OAuth Functions
export const googleAuth = {
  /**
   * Khởi tạo Google OAuth flow
   * Redirect user đến Google OAuth authorization page
   */
  initiateLogin: async (): Promise<void> => {
    // Redirect đến endpoint bằng cửa sổ mới
    window.open(`${API_URL}/auth/oauth/google`, "_blank");
  },

  /**
   * Xử lý callback từ Google OAuth (được gọi từ callback page)
   * @param code - Authorization code từ Google
   * @param state - State parameter để verify request
   */
  handleCallback: async (code: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/oauth/google/callback`,
        { code },
        { withCredentials: true }
      );

      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
        message: response.data.message,
      };
    } catch (error: any) {
      console.error("Google OAuth callback error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Đăng nhập Google thất bại",
      };
    }
  },

  /**
   * Kiểm tra trạng thái authentication hiện tại
   */
  checkAuthStatus: async (): Promise<AuthResponse> => {
    try {
      const response = await axios.get(`${API_URL}/auth/status`, {
        withCredentials: true,
      });

      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Chưa đăng nhập",
      };
    }
  },
};

// Traditional email/password auth (existing functionality)
export const emailAuth = {
  /**
   * Đăng nhập bằng email và password
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Đăng nhập thất bại",
      };
    }
  },

  /**
   * Đăng ký tài khoản mới
   */
  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);

      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Đăng ký thất bại",
      };
    }
  },
};

// Logout function
export const logout = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });

    // Clear local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Đăng xuất thất bại",
    };
  }
};

// Utility functions
export const authUtils = {
  /**
   * Lưu token và user info vào localStorage
   */
  saveAuthData: (token: string, user: User): void => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
  },

  /**
   * Lấy token từ localStorage
   */
  getToken: (): string | null => {
    return localStorage.getItem("authToken");
  },

  /**
   * Lấy user info từ localStorage
   */
  getUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Xóa auth data khỏi localStorage
   */
  clearAuthData: (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  /**
   * Kiểm tra xem user đã đăng nhập chưa
   */
  isAuthenticated: (): boolean => {
    const token = authUtils.getToken();
    const user = authUtils.getUser();
    return !!(token && user);
  },
};
