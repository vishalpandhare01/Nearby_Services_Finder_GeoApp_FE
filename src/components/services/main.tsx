"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Leaflet must be loaded dynamically in Next.js
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

type Service = {
  id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  rating?: number;
  distance?: number;
};


const mockServices = [
  {
    id: "1",
    name: "Apollo Hospital",
    category: "hospital",
    latitude: 19.0176,
    longitude: 72.8562,
    rating: 4.5,
    created_at: "2026-05-13T10:00:00Z",
    distance: 2.3,
  },
  {
    id: "2",
    name: "SBI ATM",
    category: "atm",
    latitude: 19.0201,
    longitude: 72.8601,
    rating: 4.0,
    created_at: "2026-05-13T10:10:00Z",
    distance: 1.2,
  },
  {
    id: "3",
    name: "Reliance Smart",
    category: "shop",
    latitude: 19.0142,
    longitude: 72.8589,
    rating: 4.2,
    created_at: "2026-05-13T10:20:00Z",
    distance: 3.1,
  },
  {
    id: "4",
    name: "Fortis Hospital",
    category: "hospital",
    latitude: 19.0225,
    longitude: 72.8702,
    rating: 4.6,
    created_at: "2026-05-13T10:30:00Z",
    distance: 4.0,
  },
  {
    id: "5",
    name: "HDFC ATM",
    category: "atm",
    latitude: 19.0189,
    longitude: 72.8521,
    rating: 3.9,
    created_at: "2026-05-13T10:40:00Z",
    distance: 0.8,
  },
];
export default function ServicesComponent() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setServices(mockServices);
  }, []);

  const center: [number, number] = [19.0176, 72.8562];

   return (
    <div className="h-screen w-full flex flex-col">
      {/* Header */}
      <div className="p-4 shadow bg-white">
        <h1 className="text-xl font-bold">Services Map</h1>
        <p className="text-sm text-gray-500">
          Nearby Hospitals, ATMs, Shops
        </p>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapContainer
          center={center}
          zoom={13}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {services.map((s) => (
            <Marker key={s.id} position={[s.latitude, s.longitude]}>
              <Popup>
                <div className="space-y-1">
                  <h2 className="font-bold">{s.name}</h2>
                  <p className="text-sm">Category: {s.category}</p>
                  <p className="text-sm">⭐ {s.rating}</p>
                  <p className="text-blue-600 text-sm">
                    {s.distance} km away
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}