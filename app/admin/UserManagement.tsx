"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Loader2, PlusCircle, Pencil, Trash2, X, ArrowLeft, LogOut, RefreshCcw } from "lucide-react"
import type { User, EditableUserData } from "./types"
import { fetchUsers, deleteUser, editUser, createUser } from "./actions"

const mockUsers: User[] = [
  {
    id: 1,
    username: "johndoe",
    email: "john@example.com",
    password: "hashedpassword1",
    created_at: "2023-01-01",
    role: "user",
  },
  {
    id: 2,
    username: "janesmith",
    email: "jane@example.com",
    password: "hashedpassword2",
    created_at: "2023-01-02",
    role: "admin",
  },
  {
    id: 3,
    username: "alicejohnson",
    email: "alice@example.com",
    password: "hashedpassword3",
    created_at: "2023-01-03",
    role: "user",
  },
]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState<EditableUserData>({ username: "", email: "", password: "", role: "user" })
  const router = useRouter()

  const fetchUsersData = useCallback(async (retryCount = 0) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (err) {
      console.error("Error fetching users:", err)
      if (retryCount < 2) {
        setTimeout(() => fetchUsersData(retryCount + 1), 2000)
      } else {
        setError("No se pudo conectar con el servidor. Usando datos de demostración.")
        setUsers(mockUsers)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsersData()
  }, [fetchUsersData])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await createUser(formData)
      await fetchUsersData()
      setIsFormOpen(false)
      setFormData({ username: "", email: "", password: "", role: "user" })
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
      await editUser(editingUser.id, formData)
      await fetchUsersData()
      setIsFormOpen(false)
      setEditingUser(null)
      setFormData({ username: "", email: "", password: "", role: "user" })
    } catch (err) {
      setError("Error al actualizar usuario. Por favor, intente más tarde.")
      console.error("Error updating user:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("¿Está seguro de que desea eliminar este usuario?")) return
    setLoading(true)
    setError(null)
    try {
      await deleteUser(userId)
      await fetchUsersData()
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
      setFormData({ username: user.username, email: user.email, password: "", role: user.role })
    } else {
      setEditingUser(null)
      setFormData({ username: "", email: "", password: "", role: "user" })
    }
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingUser(null)
    setFormData({ username: "", email: "", password: "", role: "user" })
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
          <button onClick={() => fetchUsersData()} className="flex items-center text-red-600 hover:text-red-800">
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
                <label htmlFor="username" className="block mb-1 text-black">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
              <div className="mb-4">
                <label htmlFor="role" className="block mb-1 text-gray-700">
                  Rol
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-2 border rounded-md text-gray-700"
                  required
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1 text-black">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-2 border rounded-md text-black"
                  required={!editingUser}
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
              <th className="p-3 text-left text-black">Nombre de Usuario</th>
              <th className="p-3 text-left text-black">Email</th>
              <th className="p-3 text-left text-black">Rol</th>
              <th className="p-3 text-left text-black">Fecha de Creación</th>
              <th className="p-3 text-left text-black">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-pink-100">
                <td className="p-3 text-black">{user.username}</td>
                <td className="p-3 text-black">{user.email}</td>
                <td className="p-3 text-black">{user.role}</td>
                <td className="p-3 text-black">{new Date(user.created_at).toLocaleDateString()}</td>
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

