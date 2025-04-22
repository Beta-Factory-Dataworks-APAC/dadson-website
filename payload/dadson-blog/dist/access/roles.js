// Helper to check if user has specific roles
const checkRole = (user, roles) => {
    if (!user)
        return false;
    return roles.includes(user.role);
};
// Access control: Is the user an admin?
export const isAdmin = ({ req: { user } }) => {
    return checkRole(user, ['admin']);
};
// Access control: Is the user an admin or editor?
export const isAdminOrEditor = ({ req: { user } }) => {
    return checkRole(user, ['admin', 'editor']);
};
// Field Level Access control: Is the user an admin? (For restricting field updates)
export const isAdminFieldLevel = ({ req: { user } }) => {
    return checkRole(user, ['admin']);
};
