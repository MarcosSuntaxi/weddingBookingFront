import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Planificación de Bodas Elegantes</h1>
      <p className="text-xl mb-8 text-gray-600 max-w-2xl">
        Bienvenido a nuestro exclusivo sistema de planificación de bodas. Haga realidad la boda de sus sueños con
        nuestros servicios premium y ubicaciones de ensueño.
      </p>
      <Link
        href="/login"
        className="btn-primary text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Comenzar
      </Link>
    </div>
  )
}

