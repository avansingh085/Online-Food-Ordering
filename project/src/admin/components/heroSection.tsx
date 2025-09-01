import React, { useState, useEffect } from 'react';
import heroService from '../services/heroService';
import { useAdmin } from '../../context/AdminContext';

// Interface matching your Mongoose schema
interface HeroSection {
  _id?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroDescription: string;
  heroLink: string;
}

// Mock data for demonstration
const initialHeroSections: HeroSection[] = [];

const HeroSectionManager: React.FC = () => {
  const [heroSections, setHeroSections] = useState<HeroSection[]>(initialHeroSections);
  const [currentHero, setCurrentHero] = useState<HeroSection>({
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    heroDescription: '',
    heroLink: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  
       const fetchHeroSections = async () => {
        const sections = await heroService.getAllHeroSections();
        console.log(sections,"HEROOOOOO")
        if (sections&&Array.isArray(sections)) {
            setHeroSections(sections);

        }

    }
  
useEffect(() => {

    fetchHeroSections();
    }, []);
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentHero({
      ...currentHero,
      [name]: value
    });
  };

  // Add a new hero section
  const addHeroSection =async () => {
    let newHero = {
      ...currentHero,
     
    };
   
   await heroService.addHeroSection(newHero);
   await fetchHeroSections();
    setHeroSections([...heroSections, {_id:"12345",...newHero}]);
    resetForm();
  };

  // Update an existing hero section
  const updateHeroSection = async () => {
    if (!currentHero._id) return;
    await heroService.updateHeroSection(currentHero._id,currentHero);
    setHeroSections(heroSections.map(hero => 
      hero._id === currentHero._id ? currentHero : hero
    ));
    resetForm();
  };

  // Delete a hero section
  const deleteHeroSection = async (id: string) => {
    await heroService.deleteHeroSection(id);
   await fetchHeroSections();
    setHeroSections(heroSections.filter(hero => hero._id !== id));
  };

  // Edit a hero section
  const editHeroSection = (hero: HeroSection) => {
    setCurrentHero(hero);
    setIsEditing(true);
  };

  // Reset the form
  const resetForm = () => {
    setCurrentHero({
      heroTitle: '',
      heroSubtitle: '',
      heroImage: '',
      heroDescription: '',
      heroLink: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold text-black mb-8">Hero Sections Manager</h1>
      
      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-black mb-4">
          {isEditing ? 'Edit Hero Section' : 'Add New Hero Section'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
            <input
              type="text"
              name="heroTitle"
              value={currentHero.heroTitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
            <input
              type="text"
              name="heroSubtitle"
              value={currentHero.heroSubtitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Image URL</label>
            <input
              type="text"
              name="heroImage"
              value={currentHero.heroImage}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Description</label>
            <textarea
              name="heroDescription"
              value={currentHero.heroDescription}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Link</label>
            <input
              type="text"
              name="heroLink"
              value={currentHero.heroLink}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={updateHeroSection}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Update
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 text-black rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addHeroSection}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Add Hero Section
            </button>
          )}
        </div>
      </div>
      
      {/* List Section */}
      <div>
        <h2 className="text-2xl font-semibold text-black mb-4">Existing Hero Sections</h2>
        
        {heroSections.length === 0 ? (
          <p className="text-gray-600">No hero sections found. Add one above.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {heroSections.map(hero => (
              <div key={hero._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <div className="mb-4">
                  <img 
                    src={hero.heroImage} 
                    alt={hero.heroTitle}
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-black mb-2">{hero.heroTitle}</h3>
                <h4 className="text-lg text-gray-800 mb-2">{hero.heroSubtitle}</h4>
                <p className="text-gray-600 mb-3">{hero.heroDescription}</p>
                <a href={hero.heroLink} className="text-blue-600 hover:underline block mb-4">
                  {hero.heroLink}
                </a>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => editHeroSection(hero)}
                    className="px-3 py-1 bg-gray-800 text-white rounded text-sm hover:bg-gray-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHeroSection(hero._id!)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSectionManager;