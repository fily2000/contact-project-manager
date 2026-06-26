const ContactsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Contatti</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">I Miei Contatti</h2>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Nuovo Contatto
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">Nessun contatto al momento</p>
        </div>
      </div>
    </div>
  )
}

export default ContactsPage
