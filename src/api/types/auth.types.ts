export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  phoneNumber: string;
  role: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileResponse {
  id: string;
  firstName: string;
  lastName: string;
  phoneCountryCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  data: {
    userResponse: UserResponse;
    userProfileResponse: UserProfileResponse;
  };
  success: boolean;
  message: string;
  traceId: string;
  statusCode: number;
}
