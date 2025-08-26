import React from 'react';
import { FiGift, FiImage } from 'react-icons/fi';

interface PlaceholderSectionProps {
  icon: React.ReactNode;
  message: string;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ icon, message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {icon}
      <p className="text-lg text-gray-500 mt-4">{message}</p>
    </div>
  );
};

export default PlaceholderSection;