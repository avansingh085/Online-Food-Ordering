import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import apiClient from '../api/apiClient';

export interface CartItem {
 itemId:any,
 customizationId:any,
 quantity:any
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<any, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);


  const fetchCart=async ()=>{
    try{
       const res=await apiClient.get('/users/cart?page=1&limit=20');
       console.log(res.data)
       setItems(res.data.items)
    }catch(err){
       console.log("error during fetch cart data",err);
    }
  }

  useEffect(()=>{
   
     fetchCart()
   
  },[])

  const addToCart = async (newItem: Omit<CartItem, 'quantity'>) => {
    try{

   await apiClient.post('/users/cart',newItem);
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.itemId === newItem.itemId);
      if (existingItem) {
        return prevItems.map(item =>
          item.itemId === newItem.itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  }catch(error){
   console.log("fetch failed during add cart",error);
  }
  };

  const removeFromCart =async (id: string) => {

    try{
   await apiClient.delete(`/users/cart/${id}`)
    setItems(prevItems => prevItems.filter(item => item.itemId !== id));

    }
    catch(err)
    {
      console.log(err,"error during remove cart");
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try{

      await apiClient.put(`/users/cart/${id}}`);

    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.itemId === id ? { ...item, quantity } : item
      )
    );

  }catch(err){
   console.log("error during update cart",err);
  }
  };

  const clearCart = async () => {
    try{
      await apiClient.delete('/users/cart/clear');
    setItems([]);
    }catch(err){

    }
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (0 * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};