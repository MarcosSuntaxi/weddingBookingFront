"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

export default function Confirmation() {
  const router = useRouter()

  useEffect(() => {
    // Automatically redirect after 5 seconds
    const timeout = setTimeout(() => {
      router.push("/")
    }, 5000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto text-center p-8">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">¡Reserva Confirmada!</h1>
        <p className="text-gray-600 mb-8">
          Gracias por confiar en nosotros para tu día especial. Te hemos enviado un correo electrónico con los detalles
          de tu reserva.
        </p>
        <button onClick={() => router.push("/")} className="btn-primary w-full">
          Volver al Inicio
        </button>
        <p className="text-sm text-gray-500 mt-4">Serás redirigido automáticamente en 5 segundos...</p>
      </div>
    </div>
  )
}

