import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our ERP System</h1>
      <p className="text-lg mb-8">Select a module to get started:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link href="/finance" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Finance Module</h2>
          <p className="text-gray-600">Manage your financial operations efficiently.</p>
        </Link>
        <Link href="/human-resources" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Human Resources Module</h2>
          <p className="text-gray-600">Streamline your HR processes and employee management.</p>
        </Link>
        <Link href="/sales" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Sales Module</h2>
          <p className="text-gray-600">Boost your sales with our comprehensive tools.</p>
        </Link>
        <Link href="/inventory" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Inventory Module</h2>
          <p className="text-gray-600">Keep track of your inventory with ease.</p>
        </Link>
        <Link href="/maintenance" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-2">Maintenance Module</h2>
          <p className="text-gray-600">Ensure your assets are well-maintained.</p>
        </Link>
      </div>
    </div>
  );
}
