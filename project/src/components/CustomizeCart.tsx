import React, { useState } from "react";
import CustomizeCart from "./CustomizeModel";
import { useCart } from "../context/CartContext";

interface ProductPageProps{
    showCustomizer:any,
    setShowCustomizer:any,
    customization:any,
    itemId:string
}
const ProductPage : React.FC<ProductPageProps> =({showCustomizer,setShowCustomizer,customization,itemId})=> {
  const {addToCart}=useCart();
const samplePizza = {
  itemId: "pizza-101",
  name: "Deluxe Pizza",
  description: "A fully loaded pizza with rich cheese, fresh veggies, and premium toppings.",
  basePrice: 8.99,
  size: [
    { type: "Small (8 inch)", price: 0 },
    { type: "Medium (10 inch)", price: 2.00 },
    { type: "Large (12 inch)", price: 4.00 },
    { type: "Extra Large (14 inch)", price: 6.50 }
  ],
  crust: [
    { type: "Thin Crust", price: 0 },
    { type: "Regular Crust", price: 0 },
    { type: "Cheese Burst", price: 2.50 },
    { type: "Stuffed Crust", price: 3.00 }
  ],
  options: [
    {
      title: "Cheese Options",
      choices: [
        { key: "Regular Cheese", value: false, price: 0, isPresent: true },
        { key: "Extra Cheese", value: false, price: 1.50, isPresent: true },
        { key: "Mozzarella", value: false, price: 2.00, isPresent: true },
        { key: "Cheddar Mix", value: false, price: 2.50, isPresent: true }
      ]
    },
    {
      title: "Veg Toppings",
      choices: [
        { key: "Onion", value: false, price: 0.75, isPresent: true },
        { key: "Tomato", value: false, price: 0.75, isPresent: true },
        { key: "Capsicum", value: false, price: 1.00, isPresent: true },
        { key: "Olives", value: false, price: 1.50, isPresent: true },
        { key: "Mushrooms", value: false, price: 1.50, isPresent: true },
        { key: "Jalapenos", value: false, price: 1.25, isPresent: true },
        { key: "Sweet Corn", value: false, price: 1.00, isPresent: true }
      ]
    },
    {
      title: "Non-Veg Toppings",
      choices: [
        { key: "Chicken Tikka", value: false, price: 2.50, isPresent: true },
        { key: "Pepperoni", value: false, price: 2.75, isPresent: true },
        { key: "BBQ Chicken", value: false, price: 3.00, isPresent: true },
        { key: "Sausage", value: false, price: 2.25, isPresent: true },
        { key: "Ham", value: false, price: 2.50, isPresent: true },
        { key: "Bacon", value: false, price: 3.00, isPresent: true }
      ]
    },
    {
      title: "Dips & Sides",
      choices: [
        { key: "Garlic Dip", value: false, price: 1.00, isPresent: true },
        { key: "BBQ Dip", value: false, price: 1.00, isPresent: true },
        { key: "Spicy Mayo", value: false, price: 1.25, isPresent: true },
        { key: "Cheesy Jalapeno Dip", value: false, price: 1.50, isPresent: true },
        { key: "Potato Wedges", value: false, price: 2.50, isPresent: true },
        { key: "Garlic Breadsticks", value: false, price: 3.00, isPresent: true }
      ]
    },
    {
      title: "Drinks",
      choices: [
        { key: "Coke", value: false, price: 1.50, isPresent: true },
        { key: "Pepsi", value: false, price: 1.50, isPresent: true },
        { key: "Sprite", value: false, price: 1.50, isPresent: true },
        { key: "Cold Coffee", value: false, price: 2.50, isPresent: true },
        { key: "Iced Tea", value: false, price: 2.00, isPresent: true }
      ]
    }
  ]
};


  const handleSaveCustomization = (customizedProduct: any) => {
    console.log("Customized product:", customizedProduct);
    setShowCustomizer(false);
    
       addToCart({itemId,customizedProduct,quantity:1})
    
  };

  return (
    <div className="absolute">
     
      <CustomizeCart
        product={customization} 
        onSave={handleSaveCustomization}
        onCancel={() => setShowCustomizer(false)}
        isOpen={showCustomizer} 
      />
    </div>
  );
};

export default ProductPage;