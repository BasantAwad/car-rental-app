import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Update this to your MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/YOUR_DATABASE_NAME';

async function hashPasswords() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const users = await User.find({});
  let updatedCount = 0;

  for (const user of users) {
    // If the password is already hashed (starts with $2), skip
    if (user.password && user.password.startsWith('$2')) continue;

    // Otherwise, hash the plain text password
    const hashed = await bcrypt.hash(user.password, 10);
    user.password = hashed;
    await user.save();
    updatedCount++;
    console.log(`Updated password for user: ${user.email}`);
  }

  console.log(`Done! Updated ${updatedCount} user(s).`);
  await mongoose.disconnect();
}

hashPasswords().catch(err => {
  console.error('Error hashing passwords:', err);
  process.exit(1);
});
