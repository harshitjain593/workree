import { apiClient } from './config';

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'COMPANY_ADMIN' | 'JOB_SEEKER';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: 'RECRUITER' | 'JOB_SEEKER';
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface ResendVerificationData {
  email: string;
}

export const authService = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (error: any) {
      console.error('Register API error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    try {
      console.log('Attempting login with:', { email: data.email });
      const response = await apiClient.post<AuthResponse>('/auth/login', data);
      console.log('Login response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Login API error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await apiClient.post<{ accessToken: string }>('/auth/refresh-token', { refreshToken });
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordData): Promise<void> => {
    await apiClient.post('/auth/forgot-password', data);
  },

  resetPassword: async (data: ResetPasswordData): Promise<void> => {
    await apiClient.post('/auth/reset-password', data);
  },

  verifyEmail: async (data: VerifyEmailData): Promise<void> => {
    await apiClient.post('/auth/verify-email', data);
  },

  resendVerification: async (data: ResendVerificationData): Promise<void> => {
    await apiClient.post('/auth/resend-verification', data);
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};
