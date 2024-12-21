"use client"
import React, { useState } from 'react';

const PropertyDashboard = () => {
  const [properties, setProperties] = useState([
    { id: 1, name: 'Greenwood Apartments', type: 'Apartment', status: 'Available' },
    { id: 2, name: 'Sunny Hills Villa', type: 'House', status: 'Rented' },
    { id: 3, name: 'Downtown Office Space', type: 'Commercial', status: 'Available' },
  ]);
  const [filter, setFilter] = useState({ type: '', status: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: '',
    type: 'Apartment',
    status: 'Available',
  });

  // Filtered Properties
  const filteredProperties = properties.filter((property) => {
    return (
      (filter.type ? property.type === filter.type : true) &&
      (filter.status ? property.status === filter.status : true)
    );
  });

  // Handle New Property Submission
  const handleAddProperty = () => {
    const updatedProperties = [
      ...properties,
      { ...newProperty, id: properties.length + 1 },
    ]
    localStorage.setItem("properties", JSON.stringify(updatedProperties))
    setProperties(updatedProperties);
    setIsModalOpen(false);
    setNewProperty({ name: '', type: 'Apartment', status: 'Available' });
  };
  React.useEffect(() => {
    const storedProperties = localStorage.getItem("properties");
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    }
  }, [])
  return (
    <div className="min-h-screen px-2 md:px-6">
      {/* Title section */}
      <section className="mb-6">
        <h1 className="text-3xl font-bold gradient-text">Property Management Dashboard</h1>
        <p className="text-gray-500">Manage your properties efficiently</p>
      </section>

      {/* Key Numbers */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-white/20 p-4 card-shadow rounded-md text-center">
          <p className="text-gray-600 dark:text-gray-100">Check-ins</p>
          <h2 className="text-2xl font-bold">12</h2>
        </div>
        <div className="bg-white dark:bg-white/20 p-4 card-shadow rounded-md text-center">
          <p className="text-gray-600 dark:text-gray-100">Check-outs</p>
          <h2 className="text-2xl font-bold">32</h2>
        </div>
        <div className="bg-white dark:bg-white/20 p-4 card-shadow rounded-md text-center">
          <p className="text-gray-600 dark:text-gray-100">Available Properties</p>
          <h2 className="text-2xl font-bold">{properties.filter((p) => p.status === 'Available').length}</h2>
        </div>
        <div className="bg-white dark:bg-white/20 p-4 card-shadow rounded-md text-center">
          <p className="text-gray-600 dark:text-gray-100">Rented Properties</p>
          <h2 className="text-2xl font-bold">{properties.filter((p) => p.status === 'Rented').length}</h2>
        </div>
      </section>

      {/* Filters and create new */}
      <section id="filter" className=" mb-6">
          <h2 className="text-lg font-bold mb-4 gradient-text">Filter Properties</h2>
        <div id="filter" className="bg-white text-gray-600 dark:bg-white/20 dark:text-gray-100 p-4 flex justify-between items-end flex-wrap gap-3 card-shadow rounded-md">
          <div>
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <h4 className='mb-1'>Types</h4>
                <select
                  className="border rounded-md p-2 w-full md:w-auto bg-white text-gray-600 dark:bg-white/20 dark:text-gray-100 "
                  value={filter.type}
                  onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                >
                  <option value="">All Types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              <div>
                <h4 className='mb-1'>Status</h4>
                <select
                  className="border rounded-md p-2 w-full md:w-auto bg-white text-gray-600 dark:bg-white/20 dark:text-gray-100 "
                  value={filter.status}
                  onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                >
                  <option value="">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                </select>
              </div>
            </div>
          </div>
          {/* Add Property Button */}
          <div>
            <button
              className="bg-[#1dd760] text-black px-4 py-2 rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              Add New Property
            </button>
          </div>
        </div>
      </section>

      {/* Properties List */}
      <section>
      <h2 className="text-lg font-bold mb-4 w-full md:w-1/4 gradient-text">Properties</h2>
      <div id="properties" className="relative bg-white text-gray-600 dark:bg-white/20 dark:text-gray-100 p-4 card-shadow rounded-md">
        <div className="space-y-4">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div
                key={property.id}
                className="flex justify-between items-center border-b dark:border-gray-500 pb-2 last:border-b-0"
              >
                <div>
                  <p className="font-medium">{property.name}</p>
                  <p className="text-sm text-gray-400">{property.type}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${property.status === 'Available'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-200 text-gray-600'
                    }`}
                >
                  {property.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No properties found</p>
          )}
        </div>
        <div className="section-background">
          <div className="background-gradient">
            <div className="gradient-line"></div>
          </div>
        </div>
      </div>
      </section>

      {/* Add Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white text-gray-600 dark:bg-[#474747] dark:text-gray-100  p-6 rounded-md shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Property</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Property Name"
                className="border rounded-md p-2 w-full bg-white text-gray-600 dark:bg-[#474747] dark:text-gray-100"
                value={newProperty.name}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, name: e.target.value })
                }
              />
              <select
                className="border rounded-md p-2 w-full bg-white text-gray-600 dark:bg-[#474747] dark:text-gray-100"
                value={newProperty.type}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, type: e.target.value })
                }
              >
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Commercial">Commercial</option>
              </select>
              <select
                className="border rounded-md p-2 w-full bg-white text-gray-600 dark:bg-[#474747] dark:text-gray-100"
                value={newProperty.status}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, status: e.target.value })
                }
              >
                <option value="Available">Available</option>
                <option value="Rented">Rented</option>
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md"
                onClick={handleAddProperty}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDashboard;
