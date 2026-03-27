import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  userType: z.enum(['buyer', 'seller']),
  // Buyer specific fields
  cnicNumber: z.string().regex(/^\d{5}-\d{7}-\d{1}$/, 'Invalid CNIC format (12345-1234567-1)').optional(),
  phoneNumber: z.string().min(10, 'Invalid phone number').optional(),
  dob: z.string().optional(),
  // Vendor specific fields
  shopName: z.string().min(3, 'Shop name must be at least 3 characters').optional(),
  shopLocation: z.string().min(5, 'Shop location required').optional(),
  businessType: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.userType === 'buyer') {
    return !!data.cnicNumber && !!data.phoneNumber && !!data.dob;
  }
  return true;
}, {
  message: "Verification details are required for buyers",
  path: ["cnicNumber"],
}).refine((data) => {
  if (data.userType === 'seller') {
    return !!data.shopName && !!data.shopLocation;
  }
  return true;
}, {
  message: "Shop details are required for vendors",
  path: ["shopName"],
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const newPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const productSchema = z.object({
  name: z.string().min(3, 'Product name required'),
  description: z.string().min(10, 'Description required'),
  category: z.string().min(1, 'Category required'),
  price: z.number().positive('Price must be positive'),
  downPayment: z.number().nonnegative('Down payment must be non-negative').optional(),
  stockQuantity: z.number().int().nonnegative('Stock quantity must be non-negative'),
});

export const installmentPlanSchema = z.object({
  durationMonths: z.number().int().positive('Duration must be positive'),
  monthlyAmount: z.number().positive('Monthly amount must be positive'),
  interestRate: z.number().nonnegative('Interest rate must be non-negative').optional(),
});

export const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
    installmentDuration: z.number().int().positive().optional(),
  })),
  shippingAddress: z.string().min(10, 'Shipping address required'),
  deliveryAddress: z.string().min(10, 'Delivery address required').optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type NewPasswordInput = z.infer<typeof newPasswordSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type InstallmentPlanInput = z.infer<typeof installmentPlanSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
