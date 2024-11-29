import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, doc, getDoc, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import './css/Chat.css';

const Chat = ({ currentChatId, postOwnerId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [postOwnerDetails, setPostOwnerDetails] = useState(null); // Thông tin chủ bài đăng
  const user = auth.currentUser; // Người dùng hiện tại

  // Lấy tin nhắn của cuộc trò chuyện
  useEffect(() => {
    if (!currentChatId) return;

    const messagesRef = collection(db, 'chats', currentChatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [currentChatId]);

  // Lấy thông tin chủ bài đăng
  useEffect(() => {
    if (!postOwnerId) return;

    const fetchOwnerDetails = async () => {
      try {
        const userRef = doc(db, 'users', postOwnerId); // Tìm thông tin chủ bài đăng từ `users`
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setPostOwnerDetails(userSnapshot.data());
        } else {
          setPostOwnerDetails({ name: 'Người dùng không xác định' });
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin chủ bài đăng:', error);
        setPostOwnerDetails({ name: 'Lỗi khi tải dữ liệu' });
      }
    };

    fetchOwnerDetails();
  }, [postOwnerId]);

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (text.trim() === '') return;

    const messageData = {
      senderId: user.uid,
      senderName: user.displayName || user.email, // Tên người gửi hoặc email làm dự phòng
      text,
      timestamp: new Date(),
    };

    const messagesRef = collection(db, 'chats', currentChatId, 'messages');
    await addDoc(messagesRef, messageData);

    setText('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>
          Trò chuyện với: {user.displayName }
        </h2>
      </div>
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.senderId === user.uid ? 'sent' : 'received'}`}
          >
            {msg.senderId !== user.uid && <p className="sender-name">{msg.senderName}</p>}
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="input-area">
        <textarea
          rows="1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button onClick={sendMessage}>Gửi</button>
      </div>
    </div>
  );
};

export default Chat;
