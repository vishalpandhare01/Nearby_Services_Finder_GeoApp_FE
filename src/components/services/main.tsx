"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getServiceList } from "@/api/service_management";


type Service = {
  id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  rating?: number;
  distance?: number;
  created_at: string;
};

function useDebounce(value: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// fix default marker icon issue in Next.js
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 13);
    }
  }, [lat, lng, map]);

  return null;
}

export default function ServiceMap() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [lattitude, setLatitude] = useState(19.0176);
  const [longitude, setLongitude] = useState(72.8562);
  const [category, setCategory] = useState("");
  const [radius, setRadius] = useState(5); // km
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const center: [number, number] = [lattitude, longitude];


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
    });
  }, []);

  async function fetchServices() {
    setLoading(true);
    try {
      const res = await getServiceList(
        lattitude.toString(),
        longitude.toString(),
        radius,
        20,
        1,
        category
      );

      setServices(res || []);
      console.log("Fetched services:", res);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  }

  const debouncedCategory = useDebounce(category, 500);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setUserLocation({ lat, lng });
        setLatitude(lat);
        setLongitude(lng);
      },
      (err) => {
        console.error("Location error:", err);
      }
    );
  }, []);

  useEffect(() => {
    fetchServices();
  }, [lattitude, longitude, radius, debouncedCategory]);


  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg relative">
      <div className="absolute z-[1000] top-4 left-12 bg-white shadow-md rounded-lg p-2 w-[280px]">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Search hospitals, clinics..."
          className="w-full px-3 py-2 text-sm text-black border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          placeholder="Radius (km)"
          title="Radius (km)"
          className="w-full px-3 py-2 text-sm text-black border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {loading && (
        <div className="absolute z-[999] top-3 left-3 bg-white px-3 py-1 rounded shadow text-sm">
          Loading services...
        </div>
      )}

      <MapContainer
        center={center}
        zoom={12}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Recenter lat={center[0]} lng={center[1]} />

        {services && services.map((service) => (
          <Marker
            key={service.id}
            position={[service.latitude, service.longitude]}
            icon={defaultIcon}
          >
            <Popup>
              <div className="min-w-[180px]">
                <h2 className="font-semibold">{service.name}</h2>
                <p className="text-sm text-gray-600">
                  {service.category}
                </p>

                {service.rating && (
                  <p className="text-sm">⭐ {service.rating}</p>
                )}

                {service.distance && (
                  <p className="text-xs text-gray-500">
                    {service.distance} km away
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={L.icon({
              iconUrl:
                "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })}
          >
            <Popup>
              <b>Your Location</b>
            </Popup>
          </Marker>
        )}
      </MapContainer>

    </div>
  );
}