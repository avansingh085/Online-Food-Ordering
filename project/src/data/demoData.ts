import { CustomizationData } from '../types/admin';

export const demoCustomizationData: CustomizationData = {
  size: [
    { type: "Small", price: 9.99 },
    { type: "Medium", price: 12.99 },
    { type: "Large", price: 15.99 }
  ],
  name: "Premium Pizza",
  itemId: "pizza-001",
  options: [
    {
      title: "Toppings",
      choices: [
        { key: "Extra Cheese", value: false, price: 1.5, isPresent: true },
        { key: "Pepperoni", value: true, price: 2.0, isPresent: true },
        { key: "Mushrooms", value: false, price: 1.0, isPresent: true },
        { key: "Olives", value: false, price: 0.75, isPresent: false }
      ]
    },
    {
      title: "Sauce",
      choices: [
        { key: "Extra Sauce", value: false, price: 0.5, isPresent: true },
        { key: "Light Sauce", value: false, price: 0, isPresent: true },
        { key: "No Sauce", value: false, price: 0, isPresent: true },
        { key: "Spicy Sauce", value: false, price: 0.75, isPresent: true }
      ]
    },
    {
      title: "Crust",
      choices: [
        { key: "Thin Crust", value: true, price: 0, isPresent: true },
        { key: "Thick Crust", value: false, price: 1.0, isPresent: true },
        { key: "Stuffed Crust", value: false, price: 2.5, isPresent: true },
        { key: "Gluten-Free", value: false, price: 3.0, isPresent: true }
      ]
    }
  ]
};

export const demoBurgerCustomization: CustomizationData = {
  size: [
    { type: "Single", price: 8.99 },
    { type: "Double", price: 11.99 },
    { type: "Triple", price: 14.99 }
  ],
  name: "Gourmet Burger",
  itemId: "burger-001",
  options: [
    {
      title: "Cheese",
      choices: [
        { key: "Cheddar", value: true, price: 0.5, isPresent: true },
        { key: "Swiss", value: false, price: 0.5, isPresent: true },
        { key: "Pepper Jack", value: false, price: 0.75, isPresent: true },
        { key: "Blue Cheese", value: false, price: 1.0, isPresent: false }
      ]
    },
    {
      title: "Toppings",
      choices: [
        { key: "Lettuce", value: true, price: 0, isPresent: true },
        { key: "Tomato", value: true, price: 0, isPresent: true },
        { key: "Onion", value: false, price: 0, isPresent: true },
        { key: "Pickles", value: false, price: 0, isPresent: true },
        { key: "Bacon", value: false, price: 1.5, isPresent: true },
        { key: "Avocado", value: false, price: 1.75, isPresent: true }
      ]
    },
    {
      title: "Sauce",
      choices: [
        { key: "Ketchup", value: true, price: 0, isPresent: true },
        { key: "Mayonnaise", value: false, price: 0, isPresent: true },
        { key: "BBQ Sauce", value: false, price: 0, isPresent: true },
        { key: "Special Sauce", value: false, price: 0.5, isPresent: true }
      ]
    }
  ]
};

export const demoDrinkCustomization: CustomizationData = {
  size: [
    { type: "Small", price: 2.99 },
    { type: "Medium", price: 3.99 },
    { type: "Large", price: 4.99 },
    { type: "X-Large", price: 5.99 }
  ],
  name: "Fountain Drink",
  itemId: "drink-001",
  options: [
    {
      title: "Ice Level",
      choices: [
        { key: "No Ice", value: false, price: 0, isPresent: true },
        { key: "Light Ice", value: false, price: 0, isPresent: true },
        { key: "Regular Ice", value: true, price: 0, isPresent: true },
        { key: "Extra Ice", value: false, price: 0, isPresent: true }
      ]
    },
    {
      title: "Drink Type",
      choices: [
        { key: "Coca-Cola", value: true, price: 0, isPresent: true },
        { key: "Diet Coke", value: false, price: 0, isPresent: true },
        { key: "Sprite", value: false, price: 0, isPresent: true },
        { key: "Dr. Pepper", value: false, price: 0, isPresent: true },
        { key: "Lemonade", value: false, price: 0.5, isPresent: true },
        { key: "Iced Tea", value: false, price: 0, isPresent: false }
      ]
    }
  ]
};

export const demoSaladCustomization: CustomizationData = {
  size: [
    { type: "Side", price: 5.99 },
    { type: "Regular", price: 8.99 },
    { type: "Large", price: 11.99 }
  ],
  name: "Garden Salad",
  itemId: "salad-001",
  options: [
    {
      title: "Dressing",
      choices: [
        { key: "Ranch", value: true, price: 0, isPresent: true },
        { key: "Caesar", value: false, price: 0, isPresent: true },
        { key: "Balsamic Vinaigrette", value: false, price: 0, isPresent: true },
        { key: "Honey Mustard", value: false, price: 0, isPresent: true },
        { key: "Oil & Vinegar", value: false, price: 0, isPresent: true }
      ]
    },
    {
      title: "Protein",
      choices: [
        { key: "Grilled Chicken", value: false, price: 3.99, isPresent: true },
        { key: "Fried Chicken", value: false, price: 3.5, isPresent: true },
        { key: "Tofu", value: false, price: 2.5, isPresent: true },
        { key: "No Protein", value: true, price: 0, isPresent: true }
      ]
    },
    {
      title: "Extra Toppings",
      choices: [
        { key: "Croutons", value: true, price: 0.5, isPresent: true },
        { key: "Bacon Bits", value: false, price: 1.0, isPresent: true },
        { key: "Sunflower Seeds", value: false, price: 0.75, isPresent: true },
        { key: "Extra Cheese", value: false, price: 1.0, isPresent: true }
      ]
    }
  ]
};

export const emptyCustomization: CustomizationData = {
  size: [],
  name: "",
  itemId: "",
  options: []
};