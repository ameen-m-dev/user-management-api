const bcrypt = require('bcryptjs');
const database = require('../src/database/db');

async function createAdminUser() {
  try {
    await database.connect();
    await database.initialize();

    const adminData = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'AdminPass123!',
      firstName: 'Admin',
      lastName: 'User'
    };

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const passwordHash = await bcrypt.hash(adminData.password, saltRounds);

    // Check if admin already exists
    const existingAdmin = await database.get(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [adminData.email, adminData.username]
    );

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const sql = `
      INSERT INTO users (username, email, password_hash, first_name, last_name, role)
      VALUES (?, ?, ?, ?, ?, 'admin')
    `;

    const result = await database.run(sql, [
      adminData.username,
      adminData.email,
      passwordHash,
      adminData.firstName,
      adminData.lastName
    ]);

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('🆔 User ID:', result.id);
    console.log('👤 Role: admin');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await database.close();
  }
}

createAdminUser();
