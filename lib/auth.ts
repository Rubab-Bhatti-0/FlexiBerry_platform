import bcrypt from 'bcryptjs';

// Mock user database (in-memory for demo purposes)
const mockUsers = [
  {
    id: '1',
    email: 'buyer@demo.com',
    password_hash: '$2a$10$abcdef123456',
    firstName: 'Demo',
    lastName: 'Buyer',
    role: 'buyer',
    status: 'active',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '2',
    email: 'seller@demo.com',
    password_hash: '$2a$10$abcdef123456',
    firstName: 'Demo',
    lastName: 'Seller',
    role: 'seller',
    status: 'active',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '3',
    email: 'admin@demo.com',
    password_hash: '$2a$10$abcdef123456',
    firstName: 'Demo',
    lastName: 'Admin',
    role: 'admin',
    status: 'active',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // For demo: accept 'demo1234' as password for all demo accounts
  if (password === 'demo1234') {
    return true;
  }
  return bcrypt.compare(password, hash);
}

export async function registerUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  role: 'buyer' | 'seller' = 'buyer'
) {
  try {
    // Check if user already exists
    const existing = mockUsers.find(u => u.email === email);
    if (existing) {
      throw new Error('Email already registered');
    }

    const passwordHash = await hashPassword(password);
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      password_hash: passwordHash,
      firstName: firstName,
      lastName: lastName,
      role,
      status: 'active',
      created_at: new Date(),
      updated_at: new Date(),
    };

    mockUsers.push(newUser);
    return newUser;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    return user;
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(email: string, newPassword: string) {
  try {
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    const passwordHash = await hashPassword(newPassword);
    user.password_hash = passwordHash;
    user.updated_at = new Date();

    return user;
  } catch (error) {
    throw error;
  }
}
