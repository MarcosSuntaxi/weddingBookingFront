"use client"

import { useState, useEffect } from "react"

interface Service {
  id: string
  name: string
  price: number
}

export default function ServiceManagement() {
  const [services, setServices] = useState<{ [key: string]: Service[] }>({
    catering: [],
    music: [],
    decoration: [],
    photography: [],
  })
  const [newService, setNewService] = useState({ type: "", name: "", price: "" })

  useEffect(() => {
    fetchAllServices()
  }, [])

  const fetchAllServices = async () => {
    try {
      const cateringResponse = await fetch("http://44.208.178.247:8072/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "{ getAllCatering { id_catering name price } }" }),
      })
      const cateringData = await cateringResponse.json()

      const musicResponse = await fetch("http://54.173.57.181:8062/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "{ getAllMusic { id_music name price } }" }),
      })
      const musicData = await musicResponse.json()

      const decorationResponse = await fetch("http://44.212.202.69:8042/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "{ getAllDecoration { id_decoration name price } }" }),
      })
      const decorationData = await decorationResponse.json()

      const photographyResponse = await fetch("http://3.229.141.153:8052/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "{ getAllPhotography { id_photograhy name price } }" }),
      })
      const photographyData = await photographyResponse.json()

      setServices({
        catering: cateringData.data.getAllCatering,
        music: musicData.data.getAllMusic,
        decoration: decorationData.data.getAllDecoration,
        photography: photographyData.data.getAllPhotography,
      })
    } catch (error) {
      console.error("Error fetching services:", error)
    }
  }

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let url = ""
      let body = {}
      switch (newService.type) {
        case "catering":
          url = "http://44.208.178.247:8071/cateringC/create"
          body = { name: newService.name, price: Number.parseFloat(newService.price) }
          break
        case "music":
          url = "http://54.173.57.181:8061/musicC/create"
          body = { name: newService.name, price: Number.parseFloat(newService.price) }
          break
        case "decoration":
          url = "http://44.212.202.69:8041/decorationC/create"
          body = { name: newService.name, price: Number.parseFloat(newService.price) }
          break
        case "photography":
          url = "http://3.229.141.153:8051/photographyC/create"
          body = { name: newService.name, price: Number.parseFloat(newService.price) }
          break
        default:
          throw new Error("Invalid service type")
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error("Failed to create service")
      }

      // Refresh the services list
      await fetchAllServices()

      // Reset the form
      setNewService({ type: "", name: "", price: "" })
    } catch (error) {
      console.error("Error creating service:", error)
    }
  }

  const handleDeleteService = async (type: string, id: string) => {
    try {
      let url = ""
      switch (type) {
        case "catering":
          url = `http://44.208.178.247:8074/cateringD/delete/${id}`
          break
        case "music":
          url = `http://184.72.70.45:8064/musicD/delete/${id}`
          break
        case "decoration":
          url = `http://44.212.202.69:8044/decorationD/delete/${id}`
          break
        case "photography":
          url = `http://3.229.141.153:8054/photographyD/delete/${id}`
          break
        default:
          throw new Error("Invalid service type")
      }

      const response = await fetch(url, { method: "DELETE" })

      if (!response.ok) {
        throw new Error("Failed to delete service")
      }

      // Refresh the services list
      await fetchAllServices()
    } catch (error) {
      console.error("Error deleting service:", error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Service Management</h2>

      <form onSubmit={handleCreateService} className="mb-8">
        <h3 className="text-xl font-bold mb-2">Create New Service</h3>
        <div className="flex space-x-4">
          <select
            value={newService.type}
            onChange={(e) => setNewService({ ...newService, type: e.target.value })}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="catering">Catering</option>
            <option value="music">Music</option>
            <option value="decoration">Decoration</option>
            <option value="photography">Photography</option>
          </select>
          <input
            type="text"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            placeholder="Service Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">
            Create
          </button>
        </div>
      </form>

      {Object.entries(services).map(([type, serviceList]) => (
        <div key={type} className="mb-8">
          <h3 className="text-xl font-bold mb-2 capitalize">{type}</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Price</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {serviceList.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>${service.price}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteService(type, service.id)}
                      className="bg-red-500 text-white p-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

