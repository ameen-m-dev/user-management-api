const bcrypt = require('bcryptjs');
const database = require('../database/db');

class User {
  static async create(userData) {
    const { username, email, password, firstName, lastName } = userData;
    
    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    const sql = `
      INSERT INTO users (username, email, password_hash, first_name, last_name)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    try {
      const result = await database.run(sql, [username, email, passwordHash, firstName, lastName]);
      return { id: result.id, username, email, firstName, lastName };
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        if (error.message.includes('username')) {
          throw new Error('Username already exists');
        } else if (error.message.includes('email')) {
          throw new Error('Email already exists');
        }
      }
      throw error;
    }
  }

  static async findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return await database.get(sql, [email]);
  }

  static async findByUsername(username) {
    const sql = 'SELECT * FROM users WHERE username = ?';
    return await database.get(sql, [username]);
  }

  static async findById(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return await database.get(sql, [id]);
  }

  static async findAll() {
    const sql = 'SELECT id, username, email, first_name, last_name, role, created_at, updated_at FROM users';
    return await database.query(sql);
  }

  static async update(id, updateData) {
    const { firstName, lastName, email } = updateData;
    
    const sql = `
      UPDATE users 
      SET first_name = ?, last_name = ?, email = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    try {
      const result = await database.run(sql, [firstName, lastName, email, id]);
      if (result.changes === 0) {
        throw new Error('User not found');
      }
      return { id, firstName, lastName, email };
    } catch (error) {
      if (error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  static async delete(id) {
    const sql = 'DELETE FROM users WHERE id = ?';
    const result = await database.run(sql, [id]);
    
    if (result.changes === 0) {
      throw new Error('User not found');
    }
    
    return { id };
  }

  static async getStats() {
    const totalUsersSql = 'SELECT COUNT(*) as total FROM users';
    const newUsersTodaySql = `
      SELECT COUNT(*) as today 
      FROM users 
      WHERE DATE(created_at) = DATE('now')
    `;
    const newUsersThisWeekSql = `
      SELECT COUNT(*) as thisWeek 
      FROM users 
      WHERE created_at >= DATE('now', '-7 days')
    `;
    const newUsersThisMonthSql = `
      SELECT COUNT(*) as thisMonth 
      FROM users 
      WHERE created_at >= DATE('now', '-30 days')
    `;

    const [totalResult, todayResult, weekResult, monthResult] = await Promise.all([
      database.get(totalUsersSql),
      database.get(newUsersTodaySql),
      database.get(newUsersThisWeekSql),
      database.get(newUsersThisMonthSql)
    ]);

    return {
      total: totalResult.total,
      today: todayResult.today,
      thisWeek: weekResult.thisWeek,
      thisMonth: monthResult.thisMonth
    };
  }

  static async verifyPassword(password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
  }

  static toPublicJSON(user) {
    const { password_hash, ...publicUser } = user;
    return publicUser;
  }
}

module.exports = User;
