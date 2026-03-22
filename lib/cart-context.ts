// Cart item interface
export interface ICartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  installmentDuration: number; // 6 or 12
  image: string;
  seller: string;
}

// Cart context type
export interface ICart {
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
  downPayment: number;
}

// Initialize empty cart
export const getInitialCart = (): ICart => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  downPayment: 0,
});

// Add item to cart
export const addToCart = (cart: ICart, item: ICartItem): ICart => {
  const existingItem = cart.items.find(
    i => i.productId === item.productId && i.installmentDuration === item.installmentDuration
  );

  let updatedItems: ICartItem[];
  if (existingItem) {
    updatedItems = cart.items.map(i =>
      i.id === existingItem.id ? { ...i, quantity: i.quantity + item.quantity } : i
    );
  } else {
    updatedItems = [...cart.items, item];
  }

  return calculateCartTotals(updatedItems);
};

// Remove item from cart
export const removeFromCart = (cart: ICart, itemId: string): ICart => {
  const updatedItems = cart.items.filter(i => i.id !== itemId);
  return calculateCartTotals(updatedItems);
};

// Update item quantity
export const updateQuantity = (cart: ICart, itemId: string, quantity: number): ICart => {
  const updatedItems = cart.items.map(i =>
    i.id === itemId ? { ...i, quantity: Math.max(1, quantity) } : i
  );
  return calculateCartTotals(updatedItems);
};

// Clear cart
export const clearCart = (): ICart => getInitialCart();

// Calculate totals
export const calculateCartTotals = (items: ICartItem[]): ICart => {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const downPayment = Math.round(totalPrice * 0.2); // 20% down payment

  return {
    items,
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice,
    downPayment,
  };
};

// Calculate monthly installment
export const calculateMonthlyInstallment = (
  totalPrice: number,
  downPayment: number,
  months: number
): number => {
  const remaining = totalPrice - downPayment;
  return Math.round(remaining / months);
};
