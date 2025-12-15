const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mern_cms');
    console.log('✓ Connected to MongoDB');
    
    // Delete old user
    await User.deleteOne({ email: 'admin@test.com' });
    console.log('✓ Cleared old user');
    
    // Create new user
    const password = await bcrypt.hash('admin123', 10);
    const newUser = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: password,
      role: 'admin'
    });
    
    console.log('\n✅ USER CREATED SUCCESSFULLY!\n');
    console.log('📧 Email: admin@test.com');
    console.log('🔐 Password: admin123');
    console.log('🆔 User ID:', newUser._id);
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
