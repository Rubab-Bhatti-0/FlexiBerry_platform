export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  date_of_birth?: string;
  role: 'buyer' | 'seller' | 'admin' | 'super_admin';
  status: 'active' | 'inactive' | 'banned';
  profile_image_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface Seller {
  id: string;
  user_id: string;
  shop_name: string;
  shop_description?: string;
  shop_image_url?: string;
  shop_banner_url?: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  rating: number;
  total_products: number;
  total_orders: number;
  verification_documents_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  price: number;
  down_payment?: number;
  sku?: string;
  stock_quantity: number;
  is_featured: boolean;
  rating: number;
  review_count: number;
  images_url: string[];
  created_at: string;
  updated_at: string;
}

export interface ProductInstallment {
  id: string;
  product_id: string;
  duration_months: number;
  monthly_amount: number;
  total_amount: number;
  interest_rate?: number;
  created_at: string;
}

export interface Bundle {
  id: string;
  seller_id: string;
  name: string;
  description?: string;
  bundle_type: string;
  total_price: number;
  down_payment?: number;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id?: string;
  bundle_id?: string;
  quantity: number;
  installment_duration_months?: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  order_number: string;
  total_amount: number;
  down_payment?: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'partial' | 'paid';
  installment_duration_months?: number;
  shipping_address?: string;
  delivery_address?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Installment {
  id: string;
  order_id: string;
  user_id: string;
  installment_number: number;
  total_installments: number;
  due_date: string;
  amount: number;
  paid_amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'waived';
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title?: string;
  comment?: string;
  helpful_count: number;
  verified_purchase: boolean;
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  order_id?: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}
