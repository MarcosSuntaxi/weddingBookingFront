"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserCircle2, Lock } from "lucide-react"

// Datos de usuarios para autenticación
const users = [
  { email: "masuntaxic@uce.edu.ec", password: "admin123", role: "administrator" },
  { email: "pjcatota@uce.edu.ec", password: "admin123", role: "user" },
  { email: "jccruz@uce.edu.ec", password: "admin123", role: "user" },
  { email: "alice_w@uce.edu.ec", password: "admin123", role: "user" },
  { email: "david_k@uce.edu.ec", password: "admin123", role: "user" },
  { email: "lpaladines@uce.edu.ec", password: "admin123", role: "user" },
  { email: "csanguano@uce.edu.ec", password: "admin123", role: "user" },
  { email: "email@uce.edu.ec", password: "admin123", role: "user" },
  { email: "sacarrec@uce.edu.ec", password: "admin123", role: "user" },
  { email: "acarrec@uce.edu.ec", password: "admin123", role: "user" },
  { email: "ccarrac@uce.edu.ec", password: "admin123", role: "user" },
]

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      if (user.role === "administrator") {
        router.push("/admin")
      } else {
        router.push("/client")
      }
    } else {
      setError("Credenciales inválidas. Por favor, intente nuevamente.")
    }
  }

  return (
    <div className="min-h-screen elegant-bg flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido</h1>
          <p className="text-gray-600">Ingrese sus credenciales para continuar</p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <UserCircle2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@uce.edu.ec"
                className="pl-10 w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                className="pl-10 w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Credenciales de prueba:</p>
          <p>Email: masuntaxic@uce.edu.ec</p>
          <p>Contraseña: admin123</p>
        </div>
      </div>
    </div>
  )
}

