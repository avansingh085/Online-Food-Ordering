export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  discount:number|null
  //category: 'pizza' | 'burger' | 'fries';
  //rating: number;
  //size?: string;
}

export const menuItems: MenuItem[] = [
  // Pizza Items
  {
    id: 'pizza-1',
    name: 'Margherita Classic',
    description: 'Fresh mozzarella, basil, tomato sauce on a crispy thin crust',
    price: 299,
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },
  {
    id: 'pizza-2',
    name: 'Pepperoni Deluxe',
    description: 'Premium pepperoni, mozzarella cheese, secret sauce',
    price: 399,
    image: 'https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },
  {
    id: 'pizza-3',
    name: 'Meat Lovers Supreme',
    description: 'Pepperoni, sausage, ham, bacon, ground beef',
    price: 499,
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },
  {
    id: 'pizza-4',
    name: 'Veggie Garden',
    description: 'Bell peppers, mushrooms, olives, onions, tomatoes',
    price: 349,
    image: 'https://images.pexels.com/photos/3644014/pexels-photo-3644014.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },
  {
    id: 'pizza-5',
    name: 'BBQ Chicken Ranch',
    description: 'Grilled chicken, BBQ sauce, red onions, cilantro',
    price: 449,
    image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },
  {
    id: 'pizza-6',
    name: 'Hawaiian Paradise',
    description: 'Ham, pineapple, mozzarella, sweet & tangy sauce',
    price: 379,
    image: 'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg?auto=compress&cs=tinysrgb&w=400',
   discount:0
  },

  // Burger Items
  {
    id: 'burger-1',
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty, cheese, lettuce, tomato, special sauce',
    price: 199,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
   discount:0
  },
  {
    id: 'burger-2',
    name: 'Chicken Deluxe',
    description: 'Crispy chicken breast, mayo, lettuce, pickles',
    price: 229,
    image: 'https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },
  {
    id: 'burger-3',
    name: 'Double Bacon Burger',
    description: 'Two beef patties, bacon, cheese, onions, BBQ sauce',
    price: 299,
    image: 'https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },
  {
    id: 'burger-4',
    name: 'Veggie Burger',
    description: 'Plant-based patty, avocado, sprouts, tomato',
    price: 179,
    image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },
  {
    id: 'burger-5',
    name: 'Spicy Jalapeño Burger',
    description: 'Spicy beef patty, jalapeños, pepper jack cheese',
    price: 249,
    image: 'https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=400',
   discount:0
  },
  {
    id: 'burger-6',
    name: 'Mushroom Swiss Burger',
    description: 'Beef patty, sautéed mushrooms, swiss cheese',
    price: 269,
    image: 'https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },

  // French Fries Items
  {
    id: 'fries-1',
    name: 'Classic French Fries',
    description: 'Golden crispy fries with sea salt',
    price: 99,
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
   discount:0
  },
  {
    id: 'fries-2',
    name: 'Cheesy Loaded Fries',
    description: 'Crispy fries topped with melted cheese sauce',
    price: 149,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },
  {
    id: 'fries-3',
    name: 'Bacon Cheese Fries',
    description: 'Loaded fries with bacon bits and cheese',
    price: 179,
    image: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },
  {
    id: 'fries-4',
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries with cinnamon',
    price: 129,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },
  {
    id: 'fries-5',
    name: 'Spicy Chili Fries',
    description: 'Fries topped with spicy chili and jalapeños',
    price: 169,
    image: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  },
  {
    id: 'fries-6',
    name: 'Truffle Parmesan Fries',
    description: 'Gourmet fries with truffle oil and parmesan',
    price: 199,
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
    discount:0
  }
];