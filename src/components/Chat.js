import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import './css/Chat.css';

const Chat = () => {
  const { chatId } = useParams(); // Lấy chatId từ URL
  const currentUser = auth.currentUser;
  const [recipient, setRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Lấy thông tin người nhận
  useEffect(() => {
    const fetchRecipient = async () => {
      const userIds = chatId.split('_');
      const recipientId = userIds.find((id) => id !== currentUser.uid);
      const recipientDoc = await getDoc(doc(db, 'users', recipientId));
      setRecipient(recipientDoc.data());
    };
    fetchRecipient();
  }, [chatId, currentUser.uid]);

  // Theo dõi tin nhắn
  useEffect(() => {
    const chatRef = doc(db, 'chats', chatId);
    const unsubscribe = onSnapshot(chatRef, (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages || []);
      }
    });
    return () => unsubscribe();
  }, [chatId]);

  // Gửi tin nhắn
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const chatRef = doc(db, 'chats', chatId);
    const message = {
      senderId: currentUser.uid,
      message: newMessage,
      timestamp: new Date(),
    };

    try {
      await updateDoc(chatRef, {
        messages: arrayUnion(message),
      });
    } catch (error) {
      await setDoc(chatRef, { participants: [currentUser.uid, recipient.uid], messages: [message] });
    }

    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <h2>Chat với {recipient?.displayName}</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.senderId === currentUser.uid ? 'message sent' : 'message received'}
          >
            <p>{msg.message}</p>
            <span>{new Date(msg.timestamp.seconds * 1000).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-input">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

export default Chat;
