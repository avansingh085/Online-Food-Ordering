import React, { useState } from 'react';
import {
  FiEdit, FiTrash2, FiPlus, FiSave, FiX, FiCheck,
  FiSliders, FiList, FiDollarSign, FiType, FiBox,
  FiToggleLeft, FiToggleRight, FiChevronDown, FiChevronUp
} from 'react-icons/fi';

interface OptionChoice {
  key: string;
  value: boolean;
  price: number;
  isPresent: boolean;
}

interface CustomizationOption {
  title: string;
  choices: OptionChoice[];
}

interface SizeOption {
  type: string;
  price: number;
}

interface CustomizeProps {
  customization: {
    size: SizeOption[];
    name: string;
    itemId: string;
    options: CustomizationOption[];
  };
  onSave?: (customization: any) => void;
  onCancel?: () => void;
  mode?: 'view' | 'edit' | 'create';
}

const CustomizationComponent: React.FC<CustomizeProps> = ({
  customization,
  onSave,
  onCancel,
  mode = 'view'
}) => {
  const [editMode, setEditMode] = useState(mode === 'edit' || mode === 'create');
  const [expandedOptions, setExpandedOptions] = useState<number[]>([]);
  const [formData, setFormData] = useState(customization);

  // Toggle option expansion
  const toggleOption = (index: number) => {
    if (expandedOptions.includes(index)) {
      setExpandedOptions(expandedOptions.filter(i => i !== index));
    } else {
      setExpandedOptions([...expandedOptions, index]);
    }
  };

  // Update form data handlers
  const updateName = (name: string) => {
    setFormData(prev => ({ ...prev, name }));
  };

  const updateSize = (index: number, field: keyof SizeOption, value: string | number) => {
    setFormData(prev => {
      const newSizes = [...prev.size];
      newSizes[index] = { ...newSizes[index], [field]: value };
      return { ...prev, size: newSizes };
    });
  };

  const addSize = () => {
    setFormData(prev => ({
      ...prev,
      size: [...prev.size, { type: '', price: 0 }]
    }));
  };

  const removeSize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      size: prev.size.filter((_, i) => i !== index)
    }));
  };

  const updateOptionTitle = (index: number, title: string) => {
    setFormData(prev => {
      const newOptions = [...prev.options];
      newOptions[index] = { ...newOptions[index], title };
      return { ...prev, options: newOptions };
    });
  };

  const updateChoice = (
    optionIndex: number,
    choiceIndex: number,
    field: keyof OptionChoice,
    value: string | number | boolean
  ) => {
    setFormData(prev => {
      const newOptions = [...prev.options];
      const newChoices = [...newOptions[optionIndex].choices];
      newChoices[choiceIndex] = { ...newChoices[choiceIndex], [field]: value };
      newOptions[optionIndex] = { ...newOptions[optionIndex], choices: newChoices };
      return { ...prev, options: newOptions };
    });
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, { title: '', choices: [] }]
    }));
  };

  const removeOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const addChoice = (optionIndex: number) => {
    setFormData(prev => {
      const newOptions = [...prev.options];
      newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        choices: [
          ...newOptions[optionIndex].choices,
          { key: '', value: false, price: 0, isPresent: true }
        ]
      };
      return { ...prev, options: newOptions };
    });
  };

  const removeChoice = (optionIndex: number, choiceIndex: number) => {
    setFormData(prev => {
      const newOptions = [...prev.options];
      newOptions[optionIndex] = {
        ...newOptions[optionIndex],
        choices: newOptions[optionIndex].choices.filter((_, i) => i !== choiceIndex)
      };
      return { ...prev, options: newOptions };
    });
  };

  const handleSave = () => {
    if (onSave) {
      
      onSave(formData);
    }
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(customization);
    setEditMode(false);
    if (onCancel) onCancel();
  };

  // Render view mode
  if (!editMode) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 inset-0">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FiBox className="w-6 h-6" />
            {customization.name}
          </h2>
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
          >
            <FiEdit className="w-4 h-4" />
            Edit
          </button>
        </div>

        {/* Sizes */}
        {customization.size.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
              <FiSliders className="w-5 h-5" />
              Sizes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {customization.size.map((size, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="font-medium text-gray-900">{size.type}</div>
                  <div className="text-gray-600 flex items-center gap-1">
                    <FiDollarSign className="w-4 h-4" />
                    {size.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Options */}
        {customization.options.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
              <FiList className="w-5 h-5" />
              Customization Options
            </h3>
            <div className="space-y-4">
              {customization.options.map((option, optionIndex) => (
                <div key={optionIndex} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleOption(optionIndex)}
                    className="w-full p-4 flex justify-between items-center text-left"
                  >
                    <span className="font-medium text-gray-900">{option.title}</span>
                    {expandedOptions.includes(optionIndex) ? (
                      <FiChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <FiChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedOptions.includes(optionIndex) && (
                    <div className="p-4 border-t border-gray-200">
                      <div className="space-y-3">
                        {option.choices.map((choice, choiceIndex) => (
                          <div key={choiceIndex} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                            <div className="flex items-center gap-3">
                              <span className={`w-3 h-3 rounded-full ${choice.value ? 'bg-blue-500' : 'border border-gray-300'}`}></span>
                              <span className={choice.isPresent ? 'text-gray-900' : 'text-gray-400 line-through'}>
                                {choice.key}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">
                                ${choice.price.toFixed(2)}
                              </span>
                              {!choice.isPresent && (
                                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                                  Not Available
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render edit mode
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiBox className="w-6 h-6" />
        {mode === 'create' ? 'Create Customization' : 'Edit Customization'}
      </h2>

      {/* Name Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Customization Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="Enter customization name"
        />
      </div>

      {/* Sizes Section */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <FiSliders className="w-5 h-5" />
          Sizes
        </h3>
        
        {formData.size.map((size, index) => (
          <div key={index} className="flex gap-3 mb-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size Type
              </label>
              <input
                type="text"
                value={size.type}
                onChange={(e) => updateSize(index, 'type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="e.g., Small, Medium, Large"
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="number"
                  value={size.price}
                  onChange={(e) => updateSize(index, 'price', Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <button
              onClick={() => removeSize(index)}
              className="px-3 py-2 text-red-600 bg-red-100 rounded-md hover:bg-red-200"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        <button
          onClick={addSize}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Add Size
        </button>
      </div>

      {/* Options Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <FiList className="w-5 h-5" />
          Customization Options
        </h3>
        
        {formData.options.map((option, optionIndex) => (
          <div key={optionIndex} className="border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Option Title
                </label>
                <input
                  type="text"
                  value={option.title}
                  onChange={(e) => updateOptionTitle(optionIndex, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="e.g., Toppings, Sauce, Cheese"
                />
              </div>
              <button
                onClick={() => removeOption(optionIndex)}
                className="ml-3 px-3 py-2 text-red-600 bg-red-100 rounded-md hover:bg-red-200"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Choices */}
            <div className="space-y-3">
              {option.choices.map((choice, choiceIndex) => (
                <div key={choiceIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                  <input
                    type="text"
                    value={choice.key}
                    onChange={(e) => updateChoice(optionIndex, choiceIndex, 'key', e.target.value)}
                    placeholder="Choice name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  
                  <div className="w-24">
                    <div className="relative">
                      <FiDollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        value={choice.price}
                        onChange={(e) => updateChoice(optionIndex, choiceIndex, 'price', Number(e.target.value))}
                        className="w-full pl-7 pr-2 py-2 border border-gray-300 rounded-md"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Available:</span>
                    <button
                      onClick={() => updateChoice(optionIndex, choiceIndex, 'isPresent', !choice.isPresent)}
                      className={`p-1 rounded-full ${choice.isPresent ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {choice.isPresent ? <FiCheck className="w-4 h-4" /> : <FiX className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Default:</span>
                    <button
                      onClick={() => updateChoice(optionIndex, choiceIndex, 'value', !choice.value)}
                      className={`p-1 rounded-full ${choice.value ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {choice.value ? <FiCheck className="w-4 h-4" /> : <FiX className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    onClick={() => removeChoice(optionIndex, choiceIndex)}
                    className="p-2 text-red-600 bg-red-100 rounded-md hover:bg-red-200"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => addChoice(optionIndex)}
              className="mt-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2 text-sm"
            >
              <FiPlus className="w-3 h-3" />
              Add Choice
            </button>
          </div>
        ))}
        
        <button
          onClick={addOption}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Add Option
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
        >
          <FiSave className="w-4 h-4" />
          {mode === 'create' ? 'Create Customization' : 'Save Changes'}
        </button>
        
        <button
          onClick={handleCancel}
          className="px-6 py-2 text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
        >
          <FiX className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CustomizationComponent;