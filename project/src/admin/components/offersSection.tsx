import React, { useContext, useEffect, useState } from 'react';
import OffersService from '../services/offersService';
import { OffersContext } from '../../context/OffersContext'


// Types
interface OfferItem {
    _id: string;
    itemId?: string;
    offerTitle: string;
    offerDescription: string;
    offerImage?: string;
    offerPrice: number;
    offerDiscount: number;
}

interface Offer {
    _id: string;
    offerSectionType: string;
    offerSectionDescription: string;
    offerItems: OfferItem[];
}

// Initial data
const initialOfferItem: OfferItem = {
    _id: '',
    offerTitle: '',
    offerDescription: '',
    offerPrice: 0,
    offerDiscount: 0
};

const initialOffer: Offer = {
    _id: '',
    offerSectionType: '',
    offerSectionDescription: '',
    offerItems: []
};

// Main Component
const OfferManagementSystem: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [currentOffer, setCurrentOffer] = useState<Offer>(initialOffer);
    const [currentOfferItem, setCurrentOfferItem] = useState<OfferItem>(initialOfferItem);
    const [selectedOfferId, setSelectedOfferId] = useState<string>('');
    const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
    const [editingOfferItemId, setEditingOfferItemId] = useState<string | null>(null);
    const [isEditingOffer, setIsEditingOffer] = useState(false);
    const [isEditingOfferItem, setIsEditingOfferItem] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // Removed unused destructured elements from OffersContext
    const { offers: alloffers = [],Refresh } = useContext(OffersContext);
    useEffect(() => {

        if (alloffers.length) setOffers(alloffers);

    }, [alloffers]);
    const handleOfferChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentOffer({ ...currentOffer, [name]: value });
    };

    // Handle offer item input changes
    const handleOfferItemChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentOfferItem({
            ...currentOfferItem,
            [name]: name === 'offerPrice' || name === 'offerDiscount' ? Number(value) : value
        });
    };

    // Create a new offer
    const createOffer = async () => {
        if (currentOffer?.offerSectionType.trim() === '') return;
        let newOffer = { ...currentOffer };
        const res = await OffersService.createOffer(currentOffer);
        Refresh();
        if (!res) return;

        setOffers([...offers, currentOffer]);
        setCurrentOffer(initialOffer);
    };

    // Update an existing offer
    const updateOffer = async () => {
        if (!editingOfferId) return;

       await OffersService.updateOfferSection(editingOfferId, currentOffer);
       Refresh();
        setOffers(offers.map(offer =>
            offer._id === editingOfferId ? { ...currentOffer, offerItems: offer.offerItems } : offer
        ));

        setCurrentOffer(initialOffer);
        setEditingOfferId(null);
        setIsEditingOffer(false);
    };

    // Delete an offer
    const deleteOffer =async (id: string) => {
       await OffersService.deleteOffer(id, '');
       Refresh();
        setOffers(offers.filter(offer => offer._id !== id));
        if (selectedOfferId === id) {
            setSelectedOfferId('');
        }
    };

    // Add an offer item to the selected offer
    const addOfferItem = async () => {
        if (currentOfferItem.offerTitle.trim() === '' || !selectedOfferId) return;

        const newOfferItem: OfferItem = {
            ...currentOfferItem,
            _id: Date.now().toString()
        };
        await OffersService.createOfferItem(selectedOfferId, currentOfferItem);
        Refresh();
        setOffers(offers.map(offer =>
            offer._id === selectedOfferId
                ? { ...offer, offerItems: [...offer.offerItems, newOfferItem] }
                : offer
        ));

        setCurrentOfferItem(initialOfferItem);
    };

    // Update an existing offer item
    const updateOfferItem =async () => {
        if (!editingOfferItemId || !selectedOfferId) return;

        await OffersService.updateOfferItem(selectedOfferId, editingOfferItemId, currentOfferItem);
        Refresh();
        
        setOffers(offers.map(offer =>
            offer._id === selectedOfferId
                ? {
                    ...offer,
                    offerItems: offer.offerItems.map(item =>
                        item._id === editingOfferItemId ? currentOfferItem : item
                    )
                }
                : offer
        ));

        setCurrentOfferItem(initialOfferItem);
        setEditingOfferItemId(null);
        setIsEditingOfferItem(false);
    };

    // Delete an offer item
    const deleteOfferItem =async (itemId: string) => {
        if (!selectedOfferId) return;
       await OffersService.deleteOffer(selectedOfferId, itemId);
       Refresh();
        setOffers(offers.map(offer =>
            offer._id === selectedOfferId
                ? { ...offer, offerItems: offer.offerItems.filter(item => item._id !== itemId) }
                : offer
        ));
    };

    // Start editing an offer
    const startEditingOffer = (offer: Offer) => {
        setCurrentOffer(offer);
        setEditingOfferId(offer._id);
        setIsEditingOffer(true);
        setSelectedOfferId(offer._id);
    };

    // Start editing an offer item
    const startEditingOfferItem = (item: OfferItem) => {
        setCurrentOfferItem(item);
        setEditingOfferItemId(item._id);
        setIsEditingOfferItem(true);
    };

    // Cancel editing
    const cancelEditing = () => {
        setCurrentOffer(initialOffer);
        setCurrentOfferItem(initialOfferItem);
        setEditingOfferId(null);
        setEditingOfferItemId(null);
        setIsEditingOffer(false);
        setIsEditingOfferItem(false);
    };

    // Save the entire offer
    const saveOffer = () => {
        if (isEditingOffer) {
            updateOffer();
        } else {
            createOffer();
        }
    };

    // Save offer item
    const saveOfferItem = async () => {
        if (isEditingOfferItem) {
            updateOfferItem();
        } else {
            
            addOfferItem();
        }
    };

    // Get the selected offer
    const selectedOffer = offers.find(offer => offer._id === selectedOfferId);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Offer Management System</h1>

                {/* Offer Form */}
                <div className="mb-8 p-6 border border-gray-300 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        {isEditingOffer ? 'Edit Offer' : 'Create New Offer'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Offer Section Type</label>
                            <input
                                type="text"
                                name="offerSectionType"
                                value={currentOffer.offerSectionType}
                                onChange={handleOfferChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                                placeholder="e.g., Summer Sale, Winter Collection"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Offer Section Description</label>
                            <input
                                type="text"
                                name="offerSectionDescription"
                                value={currentOffer.offerSectionDescription}
                                onChange={handleOfferChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                                placeholder="Brief description of the offer section"
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={saveOffer}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                            {isEditingOffer ? 'Update Offer' : 'Add Offer'}
                        </button>
                        {isEditingOffer && (
                            <button
                                onClick={cancelEditing}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                {/* Offer Selection Dropdown */}
                <div className="mb-8 p-6 border border-gray-300 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Offer</h2>
                    {offers.length === 0 ? (
                        <p className="text-gray-600">No offers available. Please create an offer first.</p>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full px-4 py-2 text-left border border-gray-300 rounded-md bg-white flex justify-between items-center"
                            >
                                <span>
                                    {selectedOfferId
                                        ? offers.find(o => o._id === selectedOfferId)?.offerSectionType
                                        : "Select an offer"}
                                </span>
                                <svg
                                    className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {offers.map(offer => (
                                        <div
                                            key={offer._id}
                                            onClick={() => {
                                                setSelectedOfferId(offer._id);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedOfferId === offer._id ? 'bg-gray-200' : ''
                                                }`}
                                        >
                                            {offer.offerSectionType}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Offer Item Form - Only show if an offer is selected */}
                {selectedOfferId && (
                    <div className="mb-8 p-6 border border-gray-300 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            {isEditingOfferItem ? 'Edit Offer Item' : 'Add Offer Item to'} {selectedOffer?.offerSectionType}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Title</label>
                                <input
                                    type="text"
                                    name="offerTitle"
                                    value={currentOfferItem.offerTitle}
                                    onChange={handleOfferItemChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    placeholder="Item title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Description</label>
                                <input
                                    type="text"
                                    name="offerDescription"
                                    value={currentOfferItem.offerDescription}
                                    onChange={handleOfferItemChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    placeholder="Item description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Price ($)</label>
                                <input
                                    type="number"
                                    name="offerPrice"
                                    value={currentOfferItem.offerPrice}
                                    onChange={handleOfferItemChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Discount (%)</label>
                                <input
                                    type="number"
                                    name="offerDiscount"
                                    value={currentOfferItem.offerDiscount}
                                    onChange={handleOfferItemChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    placeholder="0"
                                    min="0"
                                    max="100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Offer Image</label>
                                <input
                                    type="text"
                                    name="offerImage"
                                    value={currentOfferItem.offerImage}
                                    onChange={handleOfferItemChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    placeholder="Image URL"
                                    
                                />
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={saveOfferItem}
                                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                                {isEditingOfferItem ? 'Update Item' : 'Add Item'}
                            </button>
                            {isEditingOfferItem && (
                                <button
                                    onClick={() => {
                                        setCurrentOfferItem(initialOfferItem);
                                        setIsEditingOfferItem(false);
                                        setEditingOfferItemId(null);
                                    }}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Selected Offer Items */}
                {selectedOffer && selectedOffer.offerItems.length > 0 && (
                    <div className="mb-8 p-6 border border-gray-300 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Offer Items in {selectedOffer.offerSectionType}
                            </h2>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => startEditingOffer(selectedOffer)}
                                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300"
                                >
                                    Edit Offer
                                </button>
                                <button
                                    onClick={() => deleteOffer(selectedOffer._id)}
                                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300"
                                >
                                    Delete Offer
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {selectedOffer.offerItems.map(item => (
                                <div key={item._id} className="border border-gray-300 rounded-lg p-4">
                                    <span className="text-gray-700 float-right bg-lime-400">{item.offerDiscount}% off</span>
                                    <img src={item.offerImage} alt={item.offerTitle} className="mt-2 w-full h-32 object-cover rounded-md" />
                                    <div className="h-2 grid items-center justify-center" >
                                    <h3 className="font-semibold text-gray-800">{item.offerTitle}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{item.offerDescription}</p>
                                  
                                  
                                    </div>
                                      <span className="text-gray-700 float-right">${item.offerPrice.toFixed(2)}</span>
                                    <div className="flex space-x-2 mt-16">
                                        <button
                                            onClick={() => startEditingOfferItem(item)}
                                            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteOfferItem(item._id)}
                                            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Offers List */}
                <div className="p-6 border border-gray-300 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">All Offers</h2>
                    {offers.length === 0 ? (
                        <p className="text-gray-600">No offers saved yet.</p>
                    ) : (
                        <div className="space-y-6">
                            {offers.map(offer => (
                                <div key={offer._id} className="border border-gray-300 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{offer.offerSectionType}</h3>
                                            <p className="text-sm text-gray-600">{offer.offerSectionDescription}</p>
                                        </div>
                                    
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedOfferId(offer._id);
                                                    startEditingOffer(offer);
                                                }}
                                                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteOffer(offer._id)}
                                                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    {offer.offerItems.length > 0 && (
                                        <div>
                                            <h4 className="font-medium text-gray-800 mb-2">Offer Items:</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {offer.offerItems.map(item => (
                                                    <div key={item._id} className="border border-gray-300 bg-lime-300 rounded-lg p-3">
                                                        
                                                        <img src={item.offerImage} className='h-20 w-full'/>
                                                        <h5 className="font-medium text-gray-800">{item.offerTitle}</h5>
                                                        <p className="text-xs text-gray-600">{item.offerDescription}</p>

                                    
                                                        <div className="flex justify-between mt-1">
                                                            <span className="text-sm text-gray-700">${item.offerPrice.toFixed(2)}</span>
                                                            <span className="text-sm text-gray-700">{item.offerDiscount}% off</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OfferManagementSystem;