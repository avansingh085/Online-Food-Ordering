import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit, FiSave, FiX, FiCheck } from 'react-icons/fi';

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

export interface Customize {
  size: string[];
  options: CustomizationOption[];
}

interface CustomizationCreatorProps {
  initialData?: Customize;
  onSubmit: (data: Customize) => void;
  onCancel?: () => void;
  mode: 'create' | 'edit';
}

const CustomizationCreator: React.FC<CustomizationCreatorProps> = ({
  initialData = { size: [], options: [] },
  onSubmit,
  onCancel,
  mode
}) => {
  const [customization, setCustomization] = useState<Customize>(initialData);
  const [newSize, setNewSize] = useState('');
  const [newOptionTitle, setNewOptionTitle] = useState('');

  const addSize = () => {
    if (newSize.trim() && !customization.size.includes(newSize.trim())) {
      setCustomization(prev => ({
        ...prev,
        size: [...prev.size, newSize.trim()]
      }));
      setNewSize('');
    }
  };

  const removeSize = (sizeToRemove: string) => {
    setCustomization(prev => ({
      ...prev,
      size: prev.size.filter(size => size !== sizeToRemove)
    }));
  };

  const addOption = () => {
    if (newOptionTitle.trim()) {
      setCustomization(prev => ({
        ...prev,
        options: [...prev.options, {
          title: newOptionTitle.trim(),
          choices: []
        }]
      }));
      setNewOptionTitle('');
    }
  };

  const removeOption = (index: number) => {
    setCustomization(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const addChoice = (optionIndex: number) => {
    setCustomization(prev => {
      const newOptions = [...prev.options];
      newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        choices: [...newOptions[optionIndex].choices, {
          key: '',
          value: false,
          price: 0,
          isPresent: false
        }]
      };
      return { ...prev, options: newOptions };
    });
  };

  const removeChoice = (optionIndex: number, choiceIndex: number) => {
    setCustomization(prev => {
      const newOptions = [...prev.options];
      newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        choices: newOptions[optionIndex].choices.filter((_, i) => i !== choiceIndex)
      };
      return { ...prev, options: newOptions };
    });
  };

  const updateChoice = (optionIndex: number, choiceIndex: number, field: keyof OptionChoice, value: any) => {
    setCustomization(prev => {
      const newOptions = [...prev.options];
      const newChoices = [...newOptions[optionIndex].choices];
      newChoices[choiceIndex] = { ...newChoices[choiceIndex], [field]: value };
      newOptions[optionIndex] = { ...newOptions[optionIndex], choices: newChoices };
      return { ...prev, options: newOptions };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(customization);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {mode === 'create' ? 'Create Customization' : 'Edit Customization'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sizes Section */}
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sizes</h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              placeholder="Add new size (e.g., Small, Medium, Large)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              type="button"
              onClick={addSize}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Add Size
            </button>
          </div>
          
          {customization.size.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {customization.size.map((size, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                >
                  <span className="text-sm text-gray-900">{size}</span>
                  <button
                    type="button"
                    onClick={() => removeSize(size)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Options Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customization Options</h3>
          
          {/* Add New Option */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newOptionTitle}
              onChange={(e) => setNewOptionTitle(e.target.value)}
              placeholder="Add option title (e.g., Toppings, Sauce, Cheese)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              type="button"
              onClick={addOption}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Add Option
            </button>
          </div>

          {/* Options List */}
          {customization.options.map((option, optionIndex) => (
            <div key={optionIndex} className="border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-medium text-gray-900">{option.title}</h4>
                <button
                  type="button"
                  onClick={() => removeOption(optionIndex)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Choices */}
              <div className="space-y-3">
                {option.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex} className="flex items-center gap-4 p-3 bg-gray-50 rounded-md">
                    <input
                      type="text"
                      value={choice.key}
                      onChange={(e) => updateChoice(optionIndex, choiceIndex, 'key', e.target.value)}
                      placeholder="Choice name (e.g., Extra Cheese, Pepperoni)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700">Price:</label>
                      <input
                        type="number"
                        value={choice.price}
                        onChange={(e) => updateChoice(optionIndex, choiceIndex, 'price', Number(e.target.value))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700">Available:</label>
                      <input
                        type="checkbox"
                        checked={choice.isPresent}
                        onChange={(e) => updateChoice(optionIndex, choiceIndex, 'isPresent', e.target.checked)}
                        className="w-4 h-4 text-gray-900 focus:ring-gray-900"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-700">Default:</label>
                      <input
                        type="checkbox"
                        checked={choice.value}
                        onChange={(e) => updateChoice(optionIndex, choiceIndex, 'value', e.target.checked)}
                        className="w-4 h-4 text-gray-900 focus:ring-gray-900"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeChoice(optionIndex, choiceIndex)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addChoice(optionIndex)}
                className="mt-3 px-3 py-1 text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2 text-sm"
              >
                <FiPlus className="w-3 h-3" />
                Add Choice
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
          >
            <FiSave className="w-4 h-4" />
            {mode === 'create' ? 'Create Customization' : 'Save Changes'}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
            >
              <FiX className="w-4 h-4" />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomizationCreator;