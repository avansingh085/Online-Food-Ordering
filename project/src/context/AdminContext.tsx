import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../data/menuData';
import { menuItems as initialMenuItems } from '../data/menuData';
import apiClient from '../api/apiClient';

interface AdminUser {
  id: string;
  username: string;
  email: string;
}

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  textColor: string;
}

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  offer: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
  date: string;
  address: string;
  phone: string;
}

interface AdminContextType {
  adminUser: AdminUser | null;
  isAdminAuthenticated: boolean;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  deleteMenuItem: (id: string) => void;
  updateOffer: (id: string, updates: Partial<Offer>) => void;
  updateHeroSlide: (id: number, updates: Partial<HeroSlide>) => void;
  getMenuItems: () => Promise<MenuItem[]>;
  getOffers: () => Offer[];
  getHeroSlides: () => HeroSlide[];
  getOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getDashboardStats: () => {
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    totalCustomers: number;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: '1',
      title: 'Free Delivery',
      subtitle: 'On orders above ₹299',
      icon: 'Truck',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      id: '2',
      title: '30 Min Delivery',
      subtitle: 'Or it\'s on us!',
      icon: 'Clock',
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      id: '3',
      title: 'First Order',
      subtitle: 'Get 25% off',
      icon: 'Star',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      id: '4',
      title: 'Weekend Special',
      subtitle: 'Buy 2 Get 1 Free',
      icon: 'Gift',
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    }
  ]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([
    {
      id: 1,
      title: "Margherita Perfection",
      subtitle: "Fresh Mozzarella • Basil • Tomato Sauce",
      image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=800",
      offer: "20% OFF"
    },
    {
      id: 2,
      title: "Ultimate Pepperoni",
      subtitle: "Premium Pepperoni • Extra Cheese • Crispy Crust",
      image: "https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=800",
      offer: "Buy 1 Get 1"
    },
    {
      id: 3,
      title: "Meat Lovers Special",
      subtitle: "Pepperoni • Sausage • Ham • Bacon",
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800",
      offer: "30% OFF"
    },
    {
      id: 4,
      title: "Veggie Supreme",
      subtitle: "Bell Peppers • Mushrooms • Olives • Onions",
      image: "https://images.pexels.com/photos/3644014/pexels-photo-3644014.jpeg?auto=compress&cs=tinysrgb&w=800",
      offer: "Free Delivery"
    }
  ]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 299 },
        { name: 'Classic Cheeseburger', quantity: 2, price: 199 }
      ],
      total: 697,
      status: 'pending',
      date: new Date().toISOString(),
      address: '123 Main St, Delhi',
      phone: '+91 9876543210'
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      items: [
        { name: 'Pepperoni Deluxe', quantity: 1, price: 399 }
      ],
      total: 439,
      status: 'preparing',
      date: new Date(Date.now() - 3600000).toISOString(),
      address: '456 Oak Ave, Mumbai',
      phone: '+91 9876543211'
    }
  ]);

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    // Simple admin authentication (in production, use proper backend authentication)
    if (username === 'admin' && password === 'admin123') {
      setAdminUser({
        id: '1',
        username: 'admin',
        email: 'admin@bekspizza.com'
      });
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setAdminUser(null);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `${item.discount}-${Date.now()}`
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const updateOffer = (id: string, updates: Partial<Offer>) => {
    setOffers(prev => prev.map(offer => 
      offer.id === id ? { ...offer, ...updates } : offer
    ));
  };

  const updateHeroSlide = (id: number, updates: Partial<HeroSlide>) => {
    setHeroSlides(prev => prev.map(slide => 
      slide.id === id ? { ...slide, ...updates } : slide
    ));
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const getDashboardStats = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const totalCustomers = new Set(orders.map(order => order.customerEmail)).size;
    
    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      totalCustomers
    };
  };

  const getMenuItems =async () => {
   
        const res=await  apiClient.get('/item/all');
       return res.data;
   

  };
  const getOffers = () => offers;
  const getHeroSlides = () => heroSlides;
  const getOrders = () => orders;

  return (
    <AdminContext.Provider value={{
      adminUser,
      isAdminAuthenticated: !!adminUser,
      adminLogin,
      adminLogout,
      updateMenuItem,
      addMenuItem,
      deleteMenuItem,
      updateOffer,
      updateHeroSlide,
      getMenuItems,
      getOffers,
      getHeroSlides,
      getOrders,
      updateOrderStatus,
      getDashboardStats
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};