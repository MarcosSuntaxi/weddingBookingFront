"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Loader2 } from "lucide-react"
import type React from "react" // Added import for React

interface Service {
  id: string
  name: string
  price: number
}

interface SelectedService {
  id: string
  name: string
  price: number
  type: string
}

export default function ClientBooking() {
  const [clientName, setClientName] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [catering, setCatering] = useState<Service[]>([])
  const [music, setMusic] = useState<Service[]>([])
  const [decoration, setDecoration] = useState<Service[]>([])
  const [photography, setPhotography] = useState<Service[]>([])
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSummary, setShowSummary] = useState(false)
  const [selectedServiceDetails, setSelectedServiceDetails] = useState<SelectedService[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    setError(null)
    try {
      // Catering
      try {
        const cateringResponse = await fetch("http://44.208.178.247:8072/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                getAllCatering {
                  id_catering
                  name
                  price
                }
              }
            `,
          }),
        })
        if (!cateringResponse.ok) throw new Error("Error en el servicio de catering")
        const cateringData = await cateringResponse.json()
        if (cateringData.errors) throw new Error(cateringData.errors[0].message)
        setCatering(cateringData.data.getAllCatering)
      } catch (err) {
        console.error("Error fetching catering:", err)
        setCatering([])
      }

      // Music
      try {
        const musicResponse = await fetch("http://54.173.57.181:8062/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                getAllMusic {
                  id_music
                  name
                  price
                }
              }
            `,
          }),
        })
        if (!musicResponse.ok) throw new Error("Error en el servicio de música")
        const musicData = await musicResponse.json()
        if (musicData.errors) throw new Error(musicData.errors[0].message)
        setMusic(musicData.data.getAllMusic)
      } catch (err) {
        console.error("Error fetching music:", err)
        setMusic([])
      }

      // Decoration
      try {
        const decorationResponse = await fetch("http://44.212.202.69:8042/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                getAllDecoration {
                  id_decoration
                  name
                  price
                }
              }
            `,
          }),
        })
        if (!decorationResponse.ok) throw new Error("Error en el servicio de decoración")
        const decorationData = await decorationResponse.json()
        if (decorationData.errors) throw new Error(decorationData.errors[0].message)
        setDecoration(decorationData.data.getAllDecoration)
      } catch (err) {
        console.error("Error fetching decoration:", err)
        setDecoration([])
      }

      // Photography
      try {
        const photographyResponse = await fetch("http://3.229.141.153:8052/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `
              query {
                getAllPhotography {
                  id_photograhy
                  name
                  price
                }
              }
            `,
          }),
        })
        if (!photographyResponse.ok) throw new Error("Error en el servicio de fotografía")
        const photographyData = await photographyResponse.json()
        if (photographyData.errors) throw new Error(photographyData.errors[0].message)
        setPhotography(photographyData.data.getAllPhotography)
      } catch (err) {
        console.error("Error fetching photography:", err)
        setPhotography([])
      }
    } catch (error) {
      console.error("Error fetching services:", error)
      setError("Error al cargar los servicios. Por favor, intente más tarde.")
    } finally {
      setLoading(false)
    }
  }

  const getSelectedServiceDetails = () => {
    const details: SelectedService[] = []

    if (selectedServices.catering) {
      const service = catering.find((s) => s.id_catering === selectedServices.catering)
      if (service) details.push({ id: service.id_catering, name: service.name, price: service.price, type: "catering" })
    }
    if (selectedServices.music) {
      const service = music.find((s) => s.id_music === selectedServices.music)
      if (service) details.push({ id: service.id_music, name: service.name, price: service.price, type: "music" })
    }
    if (selectedServices.decoration) {
      const service = decoration.find((s) => s.id_decoration === selectedServices.decoration)
      if (service)
        details.push({ id: service.id_decoration, name: service.name, price: service.price, type: "decoration" })
    }
    if (selectedServices.photography) {
      const service = photography.find((s) => s.id_photograhy === selectedServices.photography)
      if (service)
        details.push({ id: service.id_photograhy, name: service.name, price: service.price, type: "photography" })
    }

    return details
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const details = getSelectedServiceDetails()
    setSelectedServiceDetails(details)
    setShowSummary(true)
  }

  const handleConfirm = () => {
    // Here you would send the booking data to your backend
    router.push("/client/confirmation")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading services...</span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Services for your Wedding</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border">
          <h2 className="text-xl font-medium mb-4">Customer Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1">Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Event Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="dd/mm/aaaa"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-medium mb-4">Catering</h2>
            <select
              value={selectedServices.catering || ""}
              onChange={(e) => setSelectedServices({ ...selectedServices, catering: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Catering</option>
              {catering.map((service) => (
                <option key={service.id_catering} value={service.id_catering}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-medium mb-4">Music</h2>
            <select
              value={selectedServices.music || ""}
              onChange={(e) => setSelectedServices({ ...selectedServices, music: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Music</option>
              {music.map((service) => (
                <option key={service.id_music} value={service.id_music}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-medium mb-4">Decoration</h2>
            <select
              value={selectedServices.decoration || ""}
              onChange={(e) => setSelectedServices({ ...selectedServices, decoration: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Decoration</option>
              {decoration.map((service) => (
                <option key={service.id_decoration} value={service.id_decoration}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-medium mb-4">Photography</h2>
            <select
              value={selectedServices.photography || ""}
              onChange={(e) => setSelectedServices({ ...selectedServices, photography: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Photography</option>
              {photography.map((service) => (
                <option key={service.id_photograhy} value={service.id_photograhy}>
                  {service.name} - ${service.price}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Save Reservation
        </button>
      </form>

      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              Order #{Math.floor(Math.random() * 1000)} - {clientName}
            </h2>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Event date:</p>
                  <p className="font-semibold">{new Date(date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Location:</p>
                  <p className="font-semibold">{location}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-600">State:</p>
                <p className="font-semibold text-green-600">To be confirmed</p>
              </div>
            </div>

            <table className="w-full mb-6">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Service</th>
                  <th className="text-right py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedServiceDetails.map((service) => (
                  <tr key={service.id} className="border-b">
                    <td className="py-2">{service.name}</td>
                    <td className="text-right py-2">${service.price}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="py-2">Total</td>
                  <td className="text-right py-2">
                    ${selectedServiceDetails.reduce((sum, service) => sum + service.price, 0)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowSummary(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Volver
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Confirm Reservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

