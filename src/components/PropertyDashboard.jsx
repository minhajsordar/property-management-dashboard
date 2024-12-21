"use client";
import React, { useState } from "react";

const PropertyDashboard = () => {
  const staticDate = "21/12/2024, 18:48:50"
  const initialProperties = [
    {
      id: 1,
      name: "Greenwood Apartments",
      type: "Apartment",
      status: "Available",
      createdAt: staticDate,
      updatedAt: staticDate,
    },
    {
      id: 2,
      name: "Sunny Hills Villa",
      type: "House",
      status: "Rented",
      createdAt: staticDate,
      updatedAt: staticDate,
    },
    {
      id: 3,
      name: "Downtown Office Space",
      type: "Commercial",
      status: "Available",
      createdAt: staticDate,
      updatedAt: staticDate,
    },
  ]
  const [properties, setProperties] = useState(initialProperties);
  const [filteredProperties, setfilteredProperties] = useState(initialProperties)
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "ascending" });
  const [filter, setFilter] = useState({ type: "", status: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: "",
    type: "Apartment",
    status: "Available",
  });

  // Handle New Property Submission
  const handleAddProperty = () => {
    if (!newProperty.name.trim()) {
      alert("Property name is required.");
      return;
    }

    if (properties.some((prop) => prop.name === newProperty.name)) {
      alert("Property name must be unique.");
      return;
    }

    const newProp = {
      ...newProperty,
      id: properties.length + 1,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    const updatedProperties = [...properties, newProp];
    setProperties(updatedProperties);
    localStorage.setItem("properties", JSON.stringify(updatedProperties));
    setIsModalOpen(false);
    setNewProperty({ name: "", type: "Apartment", status: "Available" });
  };

  // Handle Status Update
  const handleStatusUpdate = (id, newStatus) => {
    const updatedProperties = properties.map((property) =>
      property.id === id
        ? { ...property, status: newStatus, updatedAt: new Date().toLocaleString() }
        : property
    );
    setProperties(updatedProperties);
    localStorage.setItem("properties", JSON.stringify(updatedProperties));
  };

  // Handle Delete
  const handleDeleteProperty = (id) => {
    const updatedProperties = properties.filter((property) => property.id !== id);
    setProperties(updatedProperties);
    setfilteredProperties(updatedProperties)
    localStorage.setItem("properties", JSON.stringify(updatedProperties));
  };
  // Handle sort operation
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  // Update table on sorting, filtering, and adding new item.
  React.useEffect(() => {
    const sortedAndFilteredData = [...JSON.parse(JSON.stringify(properties))].filter((property) => {
      return (
        (filter.type ? property.type === filter.type : true) &&
        (filter.status ? property.status === filter.status : true)
      );
    }).sort((a, b) => {
      const key = sortConfig.key
      const direction = sortConfig.direction
      if (key) {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue < bValue) {
          return direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return direction === "ascending" ? 1 : -1;
        }
      }
      return 0;
    })
    setfilteredProperties(sortedAndFilteredData)
  }, [filter, sortConfig, properties]);
  // Parse data from localStorage
  React.useEffect(() => {
    const storedProperties = localStorage.getItem("properties");
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh_-_170px)] px-2 md:px-6">
      {/* Title Section */}
      <section className="mb-6">
        <h1 className="text-3xl font-bold gradient-text">
          Property Management Dashboard
        </h1>
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

      {/* Filters and Add Property */}
      <section className="mb-6">
        <h2 className="text-lg font-bold mb-4 gradient-text">Filter Properties</h2>
        <div
          id="filter"
          className="bg-white text-gray-600 dark:bg-white/20 dark:text-gray-100 p-4 flex justify-between items-end flex-wrap gap-3 card-shadow rounded-md"
        >
          <div>
            <div className="flex flex-col md:flex-row gap-4">
              <div>
                <h4 className="mb-1">Types</h4>
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
                <h4 className="mb-1">Status</h4>
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
          <div className="animated-outline p-[2px] relative max-w-max max-h-max rounded-full overflow-hidden">
            <button
              className="bg-[#1dd760] text-black px-4 py-2 rounded-full relative z-[999]"
              onClick={() => setIsModalOpen(true)}
            >
              Add New Property
            </button>
          </div>
        </div>
      </section>

      {/* Properties List */}
      <section className="relative">

        <h2 className="text-lg font-bold mb-4">
          <span className="gradient-text">Properties</span>{` (${properties.length})`}
        </h2>
        <div
          id="properties"
          className="relative bg-white text-gray-600 dark:bg-white/20 dark:text-gray-100 p-4 card-shadow rounded-md w-full overflow-auto"
        >
          <table className="w-full">
            <thead>
              <tr>
                {[
                  { label: "Name", key: "name" },
                  { label: "Type", key: "type" },
                  { label: "Status", key: "status" },
                  { label: "Created At", key: "createdAt" },
                  { label: "Updated At", key: "updatedAt" },
                ].map((column) => (
                  <th
                    key={column.key}
                    className="text-left p-4 cursor-pointer"
                    onClick={() => handleSort(column.key)}
                  >
                    {column.label}
                    <svg
                      className={`w-4 h-4 inline-block ml-2 ${sortConfig.key === column.key
                        ? sortConfig.direction === "ascending"
                          ? "rotate-0"
                          : "rotate-180"
                        : ""
                        }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 20V10m0 10-3-3m3 3 3-3m5-13"
                      />
                    </svg>
                  </th>
                ))}
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <tr key={property.id} className="border-t dark:border-gray-500">
                    <td className="font-medium p-4 text-nowrap">{property.name}</td>
                    <td className="text-sm text-gray-400 p-4">{property.type}</td>
                    <td className=" p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm  text-nowrap ${property.status === "Available"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-200 text-gray-600"
                          }`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="text-sm text-gray-400 p-4">
                      {property?.createdAt}
                    </td>
                    <td className="text-sm text-gray-400 p-4">
                      {property.updatedAt}
                    </td>
                    <td className=" p-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              property.id,
                              property.status === "Available"
                                ? "Rented"
                                : "Available"
                            )
                          }
                          className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full  text-nowrap"
                        >
                          Toggle Status
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="text-sm bg-red-500 text-white px-3 py-1 rounded-full  text-nowrap"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-gray-500">No properties found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="section-background">
          <div className="background-gradient">
            <div className="gradient-line" />
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
                className="border rounded-full py-2 px-4 w-full bg-white text-gray-600 dark:bg-[#474747] dark:text-gray-100"
                value={newProperty.name}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, name: e.target.value })
                }
              />
              <select
                className="border rounded-full py-2 px-4 w-full bg-white text-gray-600 dark:bg-[#474747] dark:text-gray-100"
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
                className="border rounded-full py-2 px-4 w-full bg-white text-gray-600 dark:bg-[#474747] dark:text-gray-100"
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
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-full"
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
