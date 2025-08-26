import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiArrowLeft, FiBox } from 'react-icons/fi';
import { MenuItem } from '../../types/admin';
import CustomizationCreator from './customizationModels';
import { demoBurgerCustomization } from '../../data/demoData';
import CustomizationComponent from './customizations';

interface MenuManagementProps {
    menuItems: MenuItem[];
    updateMenuItem: (id: string, data: Partial<MenuItem>) => void;
    addMenuItem: (item: MenuItem) => void;
    deleteMenuItem: (id: string) => void;
}

const MenuManagement: React.FC<MenuManagementProps> = ({
    menuItems,
    updateMenuItem,
    addMenuItem,
    deleteMenuItem
}) => {
    const [editingItem, setEditingItem] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<MenuItem>>({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [showCustomization, setShowCustomization] = useState(false);
    const [newItemForm, setNewItemForm] = useState<Omit<MenuItem, 'id'>>({
        name: '',
        description: '',
        price: 0,
        image: '',
        discount: 0
    });

    const handleEditItem = (item: MenuItem) => {
        setEditingItem(item.id);
        setEditForm(item);
    };

    const handleSaveEdit = () => {
        if (editingItem && editForm) {
            updateMenuItem(editingItem, editForm);
            setEditingItem(null);
            setEditForm({});
        }
    };

    const handleAddItem = () => {
        const newItem: MenuItem = {
            ...newItemForm,
            id: Date.now().toString()
        };
        addMenuItem(newItem);
        setNewItemForm({
            name: '',
            description: '',
            price: 0,
            image: '',
            discount: 0
        });
        setShowAddForm(false);
    };


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Menu Items</h2>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center px-4 py-2 space-x-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                >
                    <FiPlus className="w-4 h-4" />
                    <span>Add Item</span>
                </button>
            </div>

            {showAddForm && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Add New Item</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={newItemForm.name}
                            onChange={(e) => setNewItemForm(prev => ({ ...prev, name: e.target.value }))}
                            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newItemForm.price}
                            onChange={(e) => setNewItemForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newItemForm.image}
                            onChange={(e) => setNewItemForm(prev => ({ ...prev, image: e.target.value }))}
                            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                        />
                        <textarea
                            placeholder="Description"
                            value={newItemForm.description}
                            onChange={(e) => setNewItemForm(prev => ({ ...prev, description: e.target.value }))}
                            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 md:col-span-2"
                            rows={3}
                        />
                    </div>
                    <div className="flex mt-4 space-x-2">
                        <button
                            onClick={handleAddItem}
                            className="flex items-center px-4 py-2 space-x-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                        >
                            <FiSave className="w-4 h-4" />
                            <span>Save</span>
                        </button>
                        <button
                            onClick={() => setShowCustomization(!showCustomization)}
                            className="flex items-center px-4 py-2 space-x-2 text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                        >
                            <FiBox className="w-4 h-4" />
                            <span>customize default</span>
                        </button>
                       
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="flex items-center px-4 py-2 space-x-2 text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            )}
         {
                            showCustomization && <CustomizationComponent customization={demoBurgerCustomization} />
                        }
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {menuItems.map((item) => (
                    <div key={item.id} className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100">
                        <img src={item.image} alt={item.name} className="object-cover w-full h-48" />
                        <div className="p-4">
                            {editingItem === item.id ? (
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={editForm.name || ''}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                                    />
                                    <input
                                        type="number"
                                        value={editForm.price || 0}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                                    />
                                    <textarea
                                        value={editForm.description || ''}
                                        onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                                        rows={2}
                                    />
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleSaveEdit}
                                            className="flex items-center px-3 py-1 space-x-1 text-sm text-white bg-gray-900 rounded hover:bg-gray-800"
                                        >
                                            <FiSave className="w-3 h-3" />
                                            <span>Save</span>
                                        </button>
                                        <button
                                            onClick={() => setEditingItem(null)}
                                            className="flex items-center px-3 py-1 space-x-1 text-sm text-gray-900 bg-gray-100 rounded hover:bg-gray-200"
                                        >
                                            <FiArrowLeft className="w-3 h-3" />
                                            <span>Cancel</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.name}</h3>
                                    <p className="mb-2 text-sm text-gray-600">{item.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditItem(item)}
                                                className="p-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                                            >
                                                <FiEdit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteMenuItem(item.id)}
                                                className="p-2 text-red-700 bg-red-100 rounded hover:bg-red-200"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuManagement;