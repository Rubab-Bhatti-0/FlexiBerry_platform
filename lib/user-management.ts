import { User } from './types';

// Mock data for initial implementation
const mockUsers: User[] = [
  {
    id: '1',
    email: 'alex@email.com',
    first_name: 'Alex',
    last_name: 'Taylor',
    phone: '+1-555-0001',
    role: 'buyer',
    status: 'active',
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
  },
  {
    id: '2',
    email: 'emma@email.com',
    first_name: 'Emma',
    last_name: 'Wilson',
    phone: '+1-555-0002',
    role: 'buyer',
    status: 'active',
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z',
  },
  {
    id: '3',
    email: 'david@email.com',
    first_name: 'David',
    last_name: 'Brown',
    phone: '+1-555-0003',
    role: 'buyer',
    status: 'inactive',
    created_at: '2024-01-08T00:00:00Z',
    updated_at: '2024-01-08T00:00:00Z',
  },
  {
    id: '4',
    email: 'admin@flexiberry.com',
    first_name: 'Admin',
    last_name: 'User',
    role: 'super_admin',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  }
];

export async function getUsers() {
  // Simulate API call
  return mockUsers;
}

export async function getUserById(id: string) {
  return mockUsers.find(u => u.id === id);
}

export async function createUser(userData: Partial<User>) {
  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    email: userData.email || '',
    first_name: userData.first_name || '',
    last_name: userData.last_name || '',
    phone: userData.phone,
    role: userData.role || 'buyer',
    status: userData.status || 'active',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockUsers.push(newUser);
  return newUser;
}

export async function updateUser(id: string, userData: Partial<User>) {
  const index = mockUsers.findIndex(u => u.id === id);
  if (index !== -1) {
    mockUsers[index] = { ...mockUsers[index], ...userData, updated_at: new Date().toISOString() };
    return mockUsers[index];
  }
  return null;
}

export async function deleteUser(id: string) {
  const index = mockUsers.findIndex(u => u.id === id);
  if (index !== -1) {
    mockUsers.splice(index, 1);
    return true;
  }
  return false;
}
