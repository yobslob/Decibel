import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  profilePic: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    maxLength: 200,
  },
  currentAura: {
    type: String,
    default: "#A0A0A0A0",
  },
  connection: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  preferences: {
    allowMoodSharing: {
      type: Boolean,
      default: true,
    },
    contentSuggestionsEnabled: {
      type: Boolean,
      default: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update updatedAt before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export User model
export default mongoose.model("User", userSchema, "users");
