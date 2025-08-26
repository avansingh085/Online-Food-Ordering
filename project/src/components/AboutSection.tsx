import React from 'react';
import { Award, Clock, Heart, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      number: "50,000+",
      label: "Happy Customers"
    },
    {
      icon: <Award className="h-6 w-6" />,
      number: "5",
      label: "Years of Excellence"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      number: "30min",
      label: "Average Delivery"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      number: "100%",
      label: "Made with Love"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                About Beks Pizza & Burger
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Since 2019, Beks Pizza & Burger has been serving the most delicious and authentic 
                  Italian pizzas and American-style burgers to our beloved customers. Our passion 
                  for quality ingredients and traditional cooking methods ensures every bite is 
                  a memorable experience.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We believe in using only the freshest ingredients sourced from local farms, 
                  hand-tossed dough made daily, and recipes passed down through generations. 
                  Our commitment to excellence has made us the favorite food destination for 
                  thousands of families.
                </p>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="bg-gray-900 text-white w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <img
                src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Restaurant Interior"
                className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-700 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-900 text-white w-14 h-14 rounded-xl flex items-center justify-center">
                  <Award className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 mb-1">Top Rated</div>
                  <div className="text-sm text-gray-600 font-medium">Food Delivery</div>
                </div>
              </div>
            </div>

            {/* Secondary Floating Card */}
            <div className="absolute -top-6 -right-6 bg-gray-900 text-white rounded-2xl p-4 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">4.9/5</div>
                <div className="text-sm font-medium">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center bg-gray-50 rounded-3xl p-12">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-gray-900 mx-auto mb-8"></div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <p className="text-xl text-gray-700 leading-relaxed italic">
              "To bring families and friends together over extraordinary food experiences, 
              delivered with speed, quality, and a smile. Every meal we create is crafted 
              with passion and served with pride."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;