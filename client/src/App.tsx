import "./App.css";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState(["Hello from server!"]);

  //@ts-ignore
  const wsRef = useRef();
  //@ts-ignore
  const inputRef = useRef();

  useEffect(() => {
    // Create new WebSocket connection to local server
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      setMessages((m) => [...m, event.data]);
    };

    //@ts-ignore
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };

    // Cleanup
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex justify-start">
            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-white text-gray-800 shadow-md">
              <p className="text-sm">{msg}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            //@ts-ignore
            ref={inputRef}
            id="message"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => {
              // @ts-ignore
              const message = inputRef.current?.value;
              // Send chat message through WebSocket
              // @ts-ignore
              wsRef.current.send(
                JSON.stringify({
                  type: "chat",
                  payload: {
                    message: message,
                  },
                })
              );

              if (inputRef.current) {
                // @ts-ignore
                inputRef.current.value = "";
              }
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <Send size={18} />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
