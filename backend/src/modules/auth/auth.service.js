const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../config/db');

/**
 * Service to handle business logic for Authentication
 */
class AuthService {
    async registerUser(userData) {
        const { name, email, password } = userData;

        // Check if user exists
        const userExists = await db.query('SELECT * FROM users WHERE email = $1', [
            email,
        ]);
        if (userExists.rows.length > 0) {
            throw new Error('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, role',
            [name, email, hashedPassword]
        );

        return result.rows[0];
    }

    async loginUser(email, password) {
        // Find user
        const result = await db.query('SELECT * FROM users WHERE email = $1', [
            email,
        ]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Sign JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}

module.exports = new AuthService();
