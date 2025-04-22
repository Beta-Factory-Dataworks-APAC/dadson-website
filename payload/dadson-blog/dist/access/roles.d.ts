import { User } from '../payload-types.js';
type AccessArgs = {
    req: {
        user?: User;
    };
};
export declare const isAdmin: ({ req: { user } }: AccessArgs) => boolean;
export declare const isAdminOrEditor: ({ req: { user } }: AccessArgs) => boolean;
export declare const isAdminFieldLevel: ({ req: { user } }: AccessArgs) => boolean;
export {};
