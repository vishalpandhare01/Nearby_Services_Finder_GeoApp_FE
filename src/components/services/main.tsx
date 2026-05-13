"use client";

import React from "react";
import { MapPin, Star, Navigation } from "lucide-react";

interface ServiceCardProps {
  name: string;
  category: string;
  rating?: number;
  distance?: number;
  latitude: number;
  longitude: number;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  category,
  rating,
  distance,
  latitude,
  longitude,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-2xl p-5 border border-gray-200 hover:shadow-xl transition duration-300 cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>

          <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
            {category}
          </span>
        </div>

        {rating && (
          <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="mt-4 flex items-center gap-2 text-gray-600">
        <MapPin className="w-5 h-5 text-red-500" />
        <span className="text-sm">
          {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </span>
      </div>

      {/* Distance */}
      {distance !== undefined && (
        <div className="mt-3 flex items-center gap-2 text-gray-700">
          <Navigation className="w-4 h-4 text-green-600" />
          <span className="text-sm">
            {distance.toFixed(2)} km away
          </span>
        </div>
      )}

      {/* Footer */}
      <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition">
        View Details
      </button>
    </div>
  );
};

export default ServiceCard;