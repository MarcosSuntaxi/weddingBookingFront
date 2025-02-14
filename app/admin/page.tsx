"use client"

import { useState } from "react"
import UserManagement from "./UserManagement"
import ServiceManagement from "./ServiceManagement"
import LocationsManagement from "./LocationsManagement"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Panel de Administración de Bodas</h1>
      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setActiveTab("users")}
          className={`btn-secondary ${activeTab === "users" ? "bg-primary text-white" : ""}`}
        >
          Gestión de Usuarios
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`btn-secondary ${activeTab === "services" ? "bg-primary text-white" : ""}`}
        >
          Gestión de Servicios
        </button>
        <button
          onClick={() => setActiveTab("locations")}
          className={`btn-secondary ${activeTab === "locations" ? "bg-primary text-white" : ""}`}
        >
          Gestión de Ubicaciones
        </button>
      </div>
      {activeTab === "users" && <UserManagement />}
      {activeTab === "services" && <ServiceManagement />}
      {activeTab === "locations" && <LocationsManagement />}
    </div>
  )
}

