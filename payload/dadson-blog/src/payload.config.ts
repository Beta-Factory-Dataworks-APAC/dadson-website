import { buildConfig } from 'payload/config';
import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { fileURLToPath } from 'url';
import { slateEditor } from '@payloadcms/richtext-slate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    user: 'users',
  },
  editor: slateEditor({}),
  collections: [
    { 
      slug: 'users', 
      auth: true, 
      admin: { useAsTitle: 'email' }, 
      fields: [
        { name: 'email', type: 'email', required: true, unique: true },
        { name: 'password', type: 'text', required: true, hidden: true }
      ] 
    }
  ],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost/dadson-blog',
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true, // Disable GraphQL for simplicity during this test
  }
});