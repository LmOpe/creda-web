export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
    Email: string;
    Password: string;
    FirstName: string;
    LastName: string;
    PhoneCountryCode: string;
    PhoneNumber: string;
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

export type VerifyCodeSuccess = {
  success: true;
  message: string;
  traceId: string;
  statusCode: number;
};

export type VerifyCodeError = {
  type: string;
  title: string;
  status: number;
  message: string;
};

export type VerificationStatus = "pending" | "success" | "failed";