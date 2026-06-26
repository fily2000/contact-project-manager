const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Chat</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Conversazioni</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg cursor-pointer">
            <h3 className="font-bold mb-2">Chat Team</h3>
            <p className="text-gray-600 text-sm">Ultimi messaggi dal team</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
