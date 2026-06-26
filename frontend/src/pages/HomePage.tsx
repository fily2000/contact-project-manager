export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Contact Project Manager</h1>
          <div className="space-x-4">
            <a href="/login" className="text-gray-600 hover:text-blue-600">Login</a>
            <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Registrati</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center text-white">
          <h2 className="text-5xl font-bold mb-6">Gestione Progetti e Contatti</h2>
          <p className="text-xl mb-8">La soluzione SaaS completa per organizzare contatti, progetti e team</p>
          <a href="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 inline-block">
            Inizia Gratis
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">📋 Gestione Progetti</h3>
            <p className="text-gray-600">Organizza progetti con step, RACI e timeline</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">👥 Gestione Contatti</h3>
            <p className="text-gray-600">Centralizza clienti, fornitori e partner</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">💬 Chat Integrata</h3>
            <p className="text-gray-600">Comunica con team e clienti in tempo reale</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
