// Placeholder for access control functions
import { User } from '../payload-types.js'; // Use correct path to types

// Define roles
type Role = 'admin' | 'editor' | 'contributor';

// Types for access control
type AccessArgs = {
  req: {
    user?: User;
  };
};

// Helper to check if user has specific roles
const checkRole = (user: User | undefined, roles: Role[]): boolean => {
  if (!user) return false;
  return roles.includes(user.role as Role);
};

// Access control: Is the user an admin?
export const isAdmin = ({ req: { user } }: AccessArgs) => {
  return checkRole(user, ['admin']);
};

// Access control: Is the user an admin or editor?
export const isAdminOrEditor = ({ req: { user } }: AccessArgs) => {
  return checkRole(user, ['admin', 'editor']);
};

// Field Level Access control: Is the user an admin? (For restricting field updates)
export const isAdminFieldLevel = ({ req: { user } }: AccessArgs): boolean => {
  return checkRole(user, ['admin']);
}; 