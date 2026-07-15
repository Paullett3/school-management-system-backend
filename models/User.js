// models/User.js
import mongoose from 'mongoose';

// Define the User Schema with strict role-based access control (RBAC)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a full name'],
      default: 'Omni School Test User',
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      default: '1234', // Default password for testing workability
    },
    role: {
      type: String,
      enum: ['student', 'parent', 'teacher', 'admin', 'registrar'],
      default: 'student',
    },
    // Links parents to specific student IDs to limit their view to permitted subsets
    linkedStudentIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // Prevents unauthorized modifications to academic records once finalized
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

export default mongoose.model('User', userSchema);