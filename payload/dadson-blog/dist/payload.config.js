import { buildConfig } from 'payload/config';
import path from 'path';
// Import collection configs (rename them to avoid conflicts)
import { Users as UsersCollection } from './collections/Users.js';
import { Categories as CategoriesCollection } from './collections/Categories.js';
import { Media as MediaCollection } from './collections/Media.js';
import { Articles as ArticlesCollection } from './collections/Articles.js';
import AdminLogo from './components/AdminLogo.js';
import BeforeLogin from './components/BeforeLogin.js';
// Import db adapter based on environment
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
// Temporary placeholder collections
const Users = { slug: 'users' };
const Categories = { slug: 'categories' };
const Media = { slug: 'media' };
const Articles = { slug: 'articles' };
export default buildConfig({
    serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
    admin: {
        user: 'users',
        meta: {
            titleSuffix: '- Dadson Logistics',
            favicon: '/favicon.ico', // Ensure this exists in your public dir
            ogImage: '/og-image.jpg', // Ensure this exists in your public dir
        },
        css: path.resolve(__dirname, './styles/admin.css'),
        components: {
            beforeLogin: [
                BeforeLogin, // Custom login screen component
            ],
            graphics: {
                Logo: AdminLogo, // Custom logo component
            },
        },
    },
    editor: slateEditor({}), // Use Slate editor
    db: mongooseAdapter({
        url: process.env.MONGODB_URI || 'mongodb://localhost/dadson-blog',
    }),
    collections: [
        UsersCollection,
        CategoriesCollection,
        MediaCollection,
        ArticlesCollection
    ],
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    },
    graphQL: {
        schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
    },
    // Theme colors defined directly in payload.config.ts
    // For more complex themes, consider Payload Theming (https://payloadcms.com/docs/admin/theming)
    // NOTE: For theme colors to apply correctly, ensure you have the corresponding
    // CSS variables defined in your admin.css or use Payload's theme generator.
    // The current admin.css uses --theme-* variables which Payload recognizes.
    // theme: { 
    //   colors: {
    //     primary: '#00B4E1', // Primary blue
    //     secondary: '#03033D', // Primary navy
    //     background: '#FFFFFF', // Primary white
    //     text: '#101B21', // Primary dark
    //   },
    // },
});
