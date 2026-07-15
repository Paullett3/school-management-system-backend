import mongoose from 'mongoose';

const gradeRecordSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseSection: { type: String, required: true },
    gradeValue: { type: String, required: true }, // e.g., 'A', '88%', 'B+'
    comments: { type: String },
    // Critical security flag: prevents edits by teachers once set to true
    isLocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('GradeRecord', gradeRecordSchema);