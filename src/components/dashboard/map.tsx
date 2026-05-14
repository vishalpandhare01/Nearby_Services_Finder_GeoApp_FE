"use client";
import { useEffect, useState } from "react";
import L from "leaflet";
import {
  useMapEvents,
  Marker,
  TileLayer,
  MapContainer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

// Fix default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type FormDataType = {
  name: string;
  category: string;
  latitude: string;
  longitude: string;
  rating: string;
};

type Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

type Position = {
  lat: number;
  lng: number;
};

function LocationMarker({
  position,
  onSelect,
}: {
  position: Position | null;
  onSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function MapComponent({ formData, setFormData }: Props) {
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (formData.latitude && formData.longitude) {
      setPosition({
        lat: Number(formData.latitude),
        lng: Number(formData.longitude),
      });
    }
  }, [formData.latitude, formData.longitude]);

  const handleSelect = (lat: number, lng: number) => {
    setPosition({ lat, lng });

    setFormData((prev) => ({
      ...prev,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          value={formData.latitude}
          readOnly
          placeholder="Latitude"
          className="rounded-lg border p-2"
        />

        <input
          value={formData.longitude}
          readOnly
          placeholder="Longitude"
          className="rounded-lg border p-2"
        />
      </div>

      <MapContainer
        center={[19.0176, 72.8562]}
        zoom={13}
        className="h-[400px] w-full rounded-xl"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          position={position}
          onSelect={handleSelect}
        />
      </MapContainer>
    </div>
  );
}

export default MapComponent;
