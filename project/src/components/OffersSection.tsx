import React, { useContext } from 'react';
import { Clock, Truck, Star, Gift } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { OffersContext } from '../context/OffersContext';

const OffersSection: React.FC = () => {
  const { getOffers } = useAdmin();
  
  const iconMap = {
    'Truck': <Truck className="h-8 w-8" />,
    'Clock': <Clock className="h-8 w-8" />,
    'Star': <Star className="h-8 w-8" />,
    'Gift': <Gift className="h-8 w-8" />
  };
  
  const { offers: offersData } = useContext(OffersContext);

  interface OfferItem {
    _id: string;
    offerTitle: string;
    offerDescription: string;
    offerPrice: number;
    offerDiscount: number;
  }

  interface OfferSection {
    _id: string;
    offerSectionType: keyof typeof iconMap;
    offerSectionDescription: string;
    offerItems: OfferItem[];
  }

  interface OfferWithIcon extends OfferSection {
    icon: React.ReactNode;
  }

  const offers: OfferWithIcon[] = offersData.map((offer: OfferSection) => ({
    ...offer,
    icon: iconMap[offer.offerSectionType as keyof typeof iconMap] || <Gift className="h-8 w-8" />
  }));

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {offers.map((offer) => (
          <div key={offer._id}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                {offer.offerSectionType}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                {offer.offerSectionDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {offer.offerItems.map((item) => (
                <div
                  key={item._id}
                  className="group bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200"
                >
                  <div className="bg-gray-800 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform duration-300">
                    {offer.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.offerTitle}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {item.offerDescription}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-gray-900">
                      ${item.offerPrice.toFixed(2)}
                    </span>
                    {item.offerDiscount > 0 && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-semibold">
                        {item.offerDiscount}% OFF
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">
            🍕 Flash Sale Alert! 🍔
          </h3>
          <p className="text-lg mb-6">
            Get 40% off on all combo meals - Limited time offer!
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;