import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center">
      <h1 className="text-5xl font-bold mb-8 text-gray-800">Elegant Wedding Planning</h1>
      <p className="text-xl mb-8 text-gray-600 max-w-2xl">
        Welcome to our exclusive wedding planning system. Make your dream wedding a reality with our premium services 
        and breathtaking locations.
      </p>
      <Link
        href="/login"
        className="btn-primary text-lg font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Get Started
      </Link>
    </div>
  );
}
