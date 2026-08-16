const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { User, Session, LoginLog, Notification } = require('../models');

const PLANS = {
  1: { name: 'Foort Start', amount: 6500, daily: 217 },
  2: { name: 'Foort Growth', amount: 15000, daily: 500 },
  3: { name: 'Foort Premium', amount: 35000, daily: 1167 },
  4: { name: 'Foort Business', amount: 65000, daily: 2167 },
  5: { name: 'Foort Elite', amount: 103000, daily: 3434 },
};

const generateReferralCode = () => {
  return `REF${Date.now().toString().slice(-8)}`;
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePasswords = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

const generateToken = (userId) => {
  return jwt.sign(
    { userId, iat: Math.floor(Date.now() / 1000) },
    process.env.JWT_SECRET || 'your_jwt_secret_key',
    { expiresIn: process.env.JWT_EXPIRATION || '24h' }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
  } catch (error) {
    return null;
  }
};

const register = async (phone, fullName, password, referralCode) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser) {
      throw new Error('Phone number already registered');
    }

    // Validate referral code if provided
    let referredBy = null;
    if (referralCode) {
      const referrer = await User.findOne({ where: { referralCode } });
      if (!referrer) {
        throw new Error('Invalid referral code');
      }
      referredBy = referrer.id;
    }

    // Create new user
    const newUser = await User.create({
      phone,
      fullName,
      passwordHash: hashPassword(password),
      referralCode: generateReferralCode(),
      referredBy,
      balance: 1000.00,
    });

    // Create welcome notification
    await Notification.create({
      userId: newUser.id,
      type: 'welcome',
      title: 'Bem-vindo à INVESTORA',
      message: 'A INVESTORA é uma plataforma digital criada para oferecer uma experiência de investimento simples, segura e eficiente.',
    });

    const token = generateToken(newUser.id);
    await Session.create({
      userId: newUser.id,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return {
      id: newUser.id,
      phone: newUser.phone,
      fullName: newUser.fullName,
      referralCode: newUser.referralCode,
      token,
    };
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

const login = async (phone, password, ipAddress, userAgent) => {
  try {
    const user = await User.findOne({ where: { phone } });

    if (!user) {
      await LoginLog.create({ phone, success: false, reason: 'User not found', ipAddress, userAgent });
      throw new Error('Invalid credentials');
    }

    if (user.isBlocked) {
      throw new Error(`Account blocked: ${user.blockReason}`);
    }

    if (!comparePasswords(password, user.passwordHash)) {
      user.failedLoginAttempts += 1;
      user.lastFailedLogin = new Date();

      if (user.failedLoginAttempts >= 3) {
        user.isBlocked = true;
        user.blockReason = 'Too many failed login attempts';
      }

      await user.save();
      await LoginLog.create({
        userId: user.id,
        success: false,
        reason: 'Invalid password',
        ipAddress,
        userAgent,
      });

      throw new Error('Invalid credentials');
    }

    // Reset failed attempts on successful login
    user.failedLoginAttempts = 0;
    user.lastLogin = new Date();
    await user.save();

    // Create session
    const token = generateToken(user.id);
    await Session.create({
      userId: user.id,
      token,
      ipAddress,
      userAgent,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await LoginLog.create({
      userId: user.id,
      success: true,
      ipAddress,
      userAgent,
    });

    return {
      id: user.id,
      phone: user.phone,
      fullName: user.fullName,
      isAdmin: user.isAdmin,
      token,
    };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

const logout = async (userId, token) => {
  try {
    await Session.destroy({ where: { userId, token } });
    return true;
  } catch (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }
};

module.exports = {
  PLANS,
  generateReferralCode,
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken,
  register,
  login,
  logout,
};
