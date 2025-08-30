import React, { useState } from "react";

// Define the interfaces
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

export interface Customize {
  itemId: string;
  name: string;
  size: SizeOption[];
  options: CustomizationOption[];
}

interface CustomizeCartProps {
  product: Customize;
  onSave: (customization: Customize) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const CustomizeCart: React.FC<CustomizeCartProps> = ({ 
  product, 
  onSave, 
  onCancel,
  isOpen 
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});

  const handleToggleChoice = (key: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    
    // Add selected size price
    if (selectedSize) {
      const size = product.size.find(s => s.type === selectedSize);
      if (size) total += size.price;
    }
    
    // Add selected options prices
    Object.keys(selectedOptions).forEach(key => {
      if (selectedOptions[key]) {
        for (const option of product.options) {
          const choice = option.choices.find(c => c.key === key);
          if (choice) {
            total += choice.price;
            break;
          }
        }
      }
    });
    
    return total;
  };

  const handleSave = () => {
    // Create a customized product object
    const customizedProduct: Customize = {
      ...product,
      size: product.size.filter(size => size.type === selectedSize),
      options: product.options.map(option => ({
        ...option,
        choices: option.choices.map(choice => ({
          ...choice,
          value: !!selectedOptions[choice.key]
        }))
      }))
    };
    
    // Call the onSave callback
    onSave(customizedProduct);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90  flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-none w-full h-full max-h-screen overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-black text-white">
          <h2 className="text-2xl font-bold">Customize {product.name}</h2>
          <button 
            onClick={onCancel}
            className="text-3xl leading-none hover:text-gray-300 transition-colors"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 grid md:grid-cols-2 gap-8">
          {/* Left Column - Options */}
          <div>
            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Size</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {product.size.map((size) => (
                  <button
                    key={size.type}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      selectedSize === size.type 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedSize(size.type)}
                  >
                    <div className="font-medium text-lg">{size.type}</div>
                    {size.price > 0 && (
                      <div className="text-sm mt-1">+${size.price.toFixed(2)}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Customization Options */}
            {product.options.map((option) => (
              <div key={option.title} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{option.title}</h3>
                <div className="space-y-3">
                  {option.choices.map((choice) => (
                    <label 
                      key={choice.key} 
                      className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!selectedOptions[choice.key]}
                        onChange={() => handleToggleChoice(choice.key)}
                        className="hidden"
                      />
                      <div className={`w-6 h-6 border-2 rounded-sm mr-4 flex items-center justify-center ${
                        selectedOptions[choice.key] ? 'bg-black border-black' : 'border-gray-400'
                      }`}>
                        {selectedOptions[choice.key] && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                      <span className="flex-1 text-gray-800 text-lg">{choice.key}</span>
                      {choice.price > 0 && (
                        <span className="text-gray-600 font-medium">+${choice.price.toFixed(2)}</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Right Column - Summary */}
          <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-4 ">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h3>
            
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-700 mb-2">Selected Options:</h4>
              
              {selectedSize && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Size: {selectedSize}</span>
                  <span className="font-medium">
                    ${product.size.find(s => s.type === selectedSize)?.price.toFixed(2) || '0.00'}
                  </span>
                </div>
              )}
              
              {Object.entries(selectedOptions)
                .filter(([_, isSelected]) => isSelected)
                .map(([key, _]) => {
                  let optionPrice = 0;
                  let optionName = key;
                  
                  // Find the option and its price
                  for (const option of product.options) {
                    const choice = option.choices.find(c => c.key === key);
                    if (choice) {
                      optionPrice = choice.price;
                      optionName = choice.key;
                      break;
                    }
                  }
                  
                  return (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span>{optionName}</span>
                      <span className="font-medium">+${optionPrice.toFixed(2)}</span>
                    </div>
                  );
                })}
              
              <div className="flex justify-between pt-4 mt-2 border-t border-gray-200">
                <span className="font-semibold text-gray-800">Total:</span>
                <span className="text-xl font-bold text-black">${calculateTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={onCancel}
                className="flex-1 py-4 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium text-lg"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={!selectedSize}
                className={`flex-1 py-4 px-6 rounded-lg text-white font-medium text-lg transition-colors ${
                  selectedSize 
                    ? 'bg-black hover:bg-gray-800' 
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeCart;