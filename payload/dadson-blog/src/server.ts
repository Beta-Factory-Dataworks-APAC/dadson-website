import express from 'express';
import payload from 'payload';
import type { Payload as PayloadType } from 'payload';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Use port 3001 to avoid conflicts with Next.js
const PORT = process.env.PAYLOAD_PORT || 3001;

// --- Payload CMS Initialization ---
const start = async () => {
  try {
    // Type assertion to help TypeScript recognize .init()
    await (payload as unknown as PayloadType).init({
      secret: process.env.PAYLOAD_SECRET || 'dadson-blog-secret-key',
      express: app,
      email: {
        fromName: 'Dadson Logistics',
        fromAddress: 'noreply@dadsonlogistics.com',
        logMockCredentials: true,
      },
      onInit: () => {
        console.log(`Payload Admin running at http://localhost:${PORT}/admin`);
      },
    });

    // Add static file handling for media uploads
    app.use('/media', express.static(path.resolve(__dirname, '../../media')));

    // Start server
    app.listen(PORT, () => {
      console.log(`PayloadCMS server running at http://localhost:${PORT}`);
      console.log(`Admin panel available at http://localhost:${PORT}/admin`);
    });
  } catch (error) {
    console.error('Error starting PayloadCMS:', error);
  }
};

start(); 