import "./App.css";
import { Send } from "lucide-react";

function App() {
  const messages: string[] = [];
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg?.id}
            className={`flex ${
              msg?.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg?.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 shadow-md"
              }`}
            >
              <p className="text-sm">{msg?.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg?.sender === "me" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {msg?.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2">
            <Send size={18} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
