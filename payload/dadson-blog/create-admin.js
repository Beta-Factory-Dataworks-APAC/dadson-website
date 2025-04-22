import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dadson-blog';

// Admin user details
const adminUser = {
  email: 'admin@dadson.com',
  password: 'admin123', // Change this in production!
  name: 'Admin User',
  role: 'admin',
};

// Define User schema like in PayloadCMS
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  role: { type: String, default: 'editor' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

async function createAdmin() {
  try {
    console.log(`Connecting to MongoDB at ${MONGODB_URI}`);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create Users collection
    const UserModel = mongoose.model('users', userSchema);

    // Check if admin already exists
    const existingAdmin = await UserModel.findOne({ email: adminUser.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminUser.password, 10);

    // Create admin user
    const user = new UserModel({
      ...adminUser,
      password: hashedPassword,
    });

    await user.save();
    console.log('Admin user created successfully');
    console.log(`Username: ${adminUser.email}`);
    console.log(`Password: ${adminUser.password}`);
    console.log('Please login at http://localhost:3001/admin');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.connection.close();
  }
}

createAdmin(); 