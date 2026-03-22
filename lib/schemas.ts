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
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
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
