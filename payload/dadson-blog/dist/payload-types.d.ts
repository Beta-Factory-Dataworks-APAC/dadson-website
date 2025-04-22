export interface User {
    id: string;
    role?: 'admin' | 'editor' | 'contributor';
    email?: string;
    name?: string;
    resetPasswordToken?: string;
    resetPasswordExpiration?: string;
    loginAttempts?: number;
    lockUntil?: string;
}
