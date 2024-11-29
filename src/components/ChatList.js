import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import './css/ChatList.css';

const ChatList = ({ userId, onSelectChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatData);
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <div key={chat.id} onClick={() => onSelectChat(chat.id)} className="chat-item">
          {chat.participants.filter((id) => id !== userId).join(', ')}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
