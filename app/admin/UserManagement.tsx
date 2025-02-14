"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Loader2, PlusCircle, Pencil, Trash2, X, ArrowLeft, LogOut, RefreshCcw } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
}

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Alice Johnson", email: "alice@example.com" },
]

const mockFetchUsers = () => {
  return new Promise<User[]>((resolve) => {
    setTimeout(() => resolve(mockUsers), 1000)
  })
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const router = useRouter()

  const fetchUsers = useCallback(async (retryCount = 0) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/users`)
      if (!response.ok) throw new Error("Failed to fetch users")
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      console.error("Error fetching users:", err)
      if (retryCount < 2) {
        setTimeout(() => fetchUsers(retryCount + 1), 2000)
      } else {
        setError("No se pudo conectar con el servidor. Usando datos de demostración.")
        const mockData = await mockFetchUsers()
        setUsers(mockData)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error("Failed to create user")
      await fetchUsers()
      setIsFormOpen(false)
      setFormData({ name: "", email: "" })
    } catch (err) {
      setError("Error al crear usuario. Por favor, intente más tarde.")
      console.error("Error creating user:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error("Failed to update user")
      await fetchUsers()
      setIsFormOpen(false)
      setEditingUser(null)
      setFormData({ name: "", email: "" })
    } catch (err) {
      setError("Error al actualizar usuario. Por favor, intente más tarde.")
      console.error("Error updating user:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("¿Está seguro de que desea eliminar este usuario?")) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete user")
      await fetchUsers()
    } catch (err) {
      setError("Error al eliminar usuario. Por favor, intente más tarde.")
      console.error("Error deleting user:", err)
    } finally {
      setLoading(false)
    }
  }

  const openForm = (user: User | null = null) => {
    if (user) {
      setEditingUser(user)
      setFormData({ name: user.name, email: user.email })
    } else {
      setEditingUser(null)
      setFormData({ name: "", email: "" })
    }
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingUser(null)
    setFormData({ name: "", email: "" })
  }

  const handleGoBack = () => {
    router.back()
  }

  const handleLogout = () => {
    // Aquí iría la lógica para cerrar sesión
    router.push("/login") // Asumiendo que tienes una ruta de login
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
        <span className="ml-2 text-black">Cargando usuarios...</span>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handleGoBack} className="text-black hover:text-pink-700 transition-colors flex items-center">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Regresar
        </button>
        <button onClick={handleLogout} className="text-black hover:text-pink-700 transition-colors flex items-center">
          <LogOut className="w-5 h-5 mr-2" />
          Cerrar Sesión
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-black">Gestión de Usuarios</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => fetchUsers()} className="flex items-center text-red-600 hover:text-red-800">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Reintentar
          </button>
        </div>
      )}

      <button
        onClick={() => openForm()}
        className="mb-6 bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors flex items-center"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Añadir Usuario
      </button>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black">{editingUser ? "Editar Usuario" : "Añadir Usuario"}</h3>
              <button onClick={closeForm} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1 text-black">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded-md text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 text-black">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border rounded-md text-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors"
              >
                {editingUser ? "Actualizar" : "Crear"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-100">
              <th className="p-3 text-left text-black">Nombre</th>
              <th className="p-3 text-left text-black">Email</th>
              <th className="p-3 text-left text-black">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-pink-100">
                <td className="p-3 text-black">{user.name}</td>
                <td className="p-3 text-black">{user.email}</td>
                <td className="p-3">
                  <button onClick={() => openForm(user)} className="mr-2 text-blue-500 hover:text-blue-700">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

