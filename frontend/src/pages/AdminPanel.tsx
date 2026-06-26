const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">Admin Panel</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Amministrazione</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">Crea Account Interno</h3>
            <form className="space-y-4">
              <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded" />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Crea</button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">Crea Account Cliente</h3>
            <form className="space-y-4">
              <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded" />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Crea</button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">Dashboard</h3>
            <p className="text-gray-600 mb-4">Statistiche e reports</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded">Vedi Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
