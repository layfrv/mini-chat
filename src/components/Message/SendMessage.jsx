import React, { useState } from 'react';
import { auth, db } from '../../utils/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import '../Chat/chat.modules.scss';

const SendMessage = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === '') {
      alert('enter your message');
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, 'messages'), {
      text: message,
      displayName: displayName,
      photoURL: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage('');
  };

  return (
    <form className="text-field" onSubmit={(e) => sendMessage(e)}>
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        id="messageInput"
        name="messageInput"
        type="text"
        className="text-input"
        placeholder="type message..."
      />
      <button className="send-btn" type="submit">
        Send
      </button>
    </form>
  );
};

export default SendMessage;
