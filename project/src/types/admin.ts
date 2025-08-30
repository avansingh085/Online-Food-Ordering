export interface OptionChoice {
  key: string;
  value: boolean;
  price: number;
  isPresent: boolean;
}

export interface CustomizationOption {
  title: string;
  choices: OptionChoice[];
}

export interface SizeOption {
  type: string;
  price: number;
}

export interface updateCustomization {
  _id:string;
  size: SizeOption[];
  name: string;
  itemId: string;
  options: CustomizationOption[];
  
}

export interface CustomizationData {
  size: SizeOption[];
  name: string;
  itemId: string;
  options: CustomizationOption[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  discount: number;
  customizationId:any
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    quantity: number;
    name: string;
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalCustomers: number;
}

export interface Transaction{
    id:string;
    userId:string;
    userName:string;
    amount:number;
    status:'pending' | 'completed' | 'failed' | 'refunded';
    type: 'purchase' | 'refund' | 'topup';
    createdAt:string;
    orderId:string;
    paymentMethod:string;
}

export interface PaginationMeta{
    currentPage:number;
    totalPages:number;
    totalItems:number;
    itemPerPage:number;
    hasNext:boolean;
    hasPrev:boolean;
}

export interface PaginatedResponse<T>{
    data:T[];
    meta:PaginationMeta;
}
export type AdminTab = 'dashboard' | 'menu' | 'offers' | 'hero' | 'orders' | 'customizations' |'transactions';