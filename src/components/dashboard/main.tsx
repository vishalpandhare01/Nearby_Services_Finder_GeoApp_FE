"use client";

import { ChangeEvent, FormEvent, useState, useEffect, use } from "react";
import { getAllServices, createService, updateService, deleteService } from "@/api/service_management";

interface Service {
  id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  rating: number;
  created_at: string;
  distance: number;
}

const initialServices: Service[] = [
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

interface FormDataType {
  name: string;
  category: string;
  latitude: string;
  longitude: string;
  rating: string;
}

const emptyForm: FormDataType = {
  name: "",
  category: "",
  latitude: "",
  longitude: "",
  rating: "",
};

export default function Dashboard() {
  const [services, setServices] =
    useState<Service[]>([]);

  const [formData, setFormData] =
    useState<FormDataType>(emptyForm);

  const [editId, setEditId] = useState<string | null>(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState<boolean>(false);

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  function fetchServices() {
    setLoading(true);
    setError(null);
    getAllServices()
      .then((data) => {
        setServices(data);
        })
        .catch((err: any) => {
            setError(err.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccess(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

  // Add or Update Service
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editId) {
        await updateService({
          name: formData.name,
          category: formData.category,
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
          rating: Number(formData.rating),
        }, editId);
      } else {
        await createService({
          name: formData.name,
          category: formData.category,
          latitude: Number(formData.latitude),
          longitude: Number(formData.longitude),
          rating: Number(formData.rating),
        });
      }
     fetchServices();
      setEditId(null);
      setFormData(emptyForm);
      setSuccess(editId ? "Service updated successfully!" : "Service added successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit Service
  const handleEdit = (service: Service) => {
    setEditId(service.id);

    setFormData({
      name: service.name,
      category: service.category,
      latitude: service.latitude.toString(),
      longitude: service.longitude.toString(),
      rating: service.rating.toString(),
    });
  };

  // Delete Service
  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    setError(null);
    try {
       const res = await deleteService(deleteId);
       if(res){
           fetchServices();
           setDeleteId(null);
           setShowDeleteModal(false);
           setSuccess("Service deleted successfully!");
       }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {error && (
        <div className="fixed top-4 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 rounded-3xl bg-red-600/95 px-4 py-3 text-sm text-white shadow-2xl">
          {error}
        </div>
      )}

      {success && (
        <div className="fixed top-4 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 rounded-3xl bg-green-600/95 px-4 py-3 text-sm text-white shadow-2xl">
          {success}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Service Dashboard
        </h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editId ? "Edit Service" : "Add Service"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Service Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              step="any"
              name="latitude"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              step="any"
              name="longitude"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              step="0.1"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
              className="border p-3 rounded-lg"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {editId ? "Update Service" : "Add Service"}
            </button>
          </form>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Latitude</th>
                <th className="text-left p-4">Longitude</th>
                <th className="text-left p-4">Rating</th>
                <th className="text-left p-4">Created At</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {services.map((service) => (
                <tr
                  key={service.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">{service.name}</td>

                  <td className="p-4 capitalize">
                    {service.category}
                  </td>

                  <td className="p-4">
                    {service.latitude}
                  </td>

                  <td className="p-4">
                    {service.longitude}
                  </td>

                  <td className="p-4">
                    {service.rating}
                  </td>

                  <td className="p-4">
                    {service.created_at}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          handleEdit(service)
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setDeleteId(service.id);
                          setShowDeleteModal(true);
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DELETE MODAL */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                Confirm Delete
              </h2>

              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this
                service?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  OK Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}