import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chat.css'; // optional if you extract styles

function Chat({ studentEmail }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/chat/${studentEmail}`)
      .then(res => setMessages(res.data.messages))
      .catch(err => console.error("Error fetching chat:", err));
  }, [studentEmail]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: 'student',
      content: input
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    try {
      await axios.post('http://localhost:3000/api/chat/send', {
        studentEmail,
        ...newMessage
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="chatbot-container">
      <h3 className="chat-title">💬 Chat with Organization</h3>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender === 'student' ? 'student' : 'org'}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
