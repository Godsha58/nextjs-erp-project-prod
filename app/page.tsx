"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
   const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("isAuthenticated") !== "true") {
      router.push("/login");
    }
  }, [router]);
  //Holis//
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 pt-28 pb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Our ERP System</h1>
        <p className="text-lg text-gray-700 mb-10">Select a module to get started:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          <Link href="/finance" className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Finance Module</h2>
            <p className="text-gray-600">Manage your financial operations efficiently.</p>
          </Link>
          <Link href="/human-resources" className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Human Resources Module</h2>
            <p className="text-gray-600">Streamline your HR processes and employee management.</p>
          </Link>
          <Link href="/sales" className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sales Module</h2>
            <p className="text-gray-600">Boost your sales with our comprehensive tools.</p>
          </Link>
          <Link href="/inventory" className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Inventory Module</h2>
            <p className="text-gray-600">Keep track of your inventory with ease.</p>
          </Link>
          <Link href="/maintenance" className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Maintenance Module</h2>
            <p className="text-gray-600">Ensure your assets are well-maintained.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
