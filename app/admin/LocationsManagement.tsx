"use client"

import { useState, useEffect } from "react"
import { Loader2, PlusCircle, X } from "lucide-react"

interface Location {
  location_id: string
  location_name: string
  province_id: number
}

export default function LocationsManagement() {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({ location_name: "", province_id: "" })

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("http://13.216.32.230:4002/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query { getLocations { location_id location_name province_id } }`,
        }),
      })
      if (!response.ok) throw new Error("Failed to fetch locations")
      const data = await response.json()
      setLocations(data.data.getLocations)
    } catch (err) {
      setError("Error al cargar ubicaciones. Por favor, intente más tarde.")
      console.error("Error fetching locations:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateLocation = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("http://13.216.32.230:4003/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          mutation createLocation($input: LocationInput!) {
            createLocation(input: $input) {
              location_id
              location_name
              province_id
            }
          }
        `,
          variables: {
            input: {
              location_name: formData.location_name,
              province_id: Number.parseInt(formData.province_id),
            },
          },
        }),
      })

      const result = await response.json()

      if (result.errors) {
        throw new Error(result.errors[0].message)
      }

      await fetchLocations()
      setIsFormOpen(false)
      setFormData({ location_name: "", province_id: "" })
    } catch (err) {
      setError("Error al crear ubicación. Por favor, intente más tarde.")
      console.error("Error creating location:", err)
    } finally {
      setLoading(false)
    }
  }

  const openForm = () => {
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setFormData({ location_name: "", province_id: "" })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-gray-700">Loading locations...</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Location Management</h2>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">{error}</div>}

      <button onClick={openForm} className="mb-6 btn-primary flex items-center">
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Location
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add Location</h3>
              <button onClick={closeForm} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleCreateLocation}>
              <div className="mb-4">
                <label htmlFor="location_name" className="block mb-1 text-gray-700">
                Location Name
                </label>
                <input
                  type="text"
                  id="location_name"
                  value={formData.location_name}
                  onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                  className="input-elegant w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="province_id" className="block mb-1 text-gray-700">
                Province ID
                </label>
                <input
                  type="number"
                  id="province_id"
                  value={formData.province_id}
                  onChange={(e) => setFormData({ ...formData, province_id: e.target.value })}
                  className="input-elegant w-full"
                  required
                />
              </div>
              <button type="submit" className="w-full btn-primary">
                Create
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table-elegant">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Province ID</th>
            </tr>
          </thead>
          <tbody>
            {locations && locations.length > 0 ? (
              locations.map((location) => (
                <tr key={location.location_id}>
                  <td>{location.location_id}</td>
                  <td>{location.location_name}</td>
                  <td>{location.province_id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No locations available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

