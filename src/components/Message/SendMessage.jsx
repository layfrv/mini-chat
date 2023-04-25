import { React, useState } from 'react';
import '../Chat/chat.modules.scss';
import { auth, db } from '../../utils/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const SendMessage = ({ scroll }) => {
  const [textMessage, setTextMessage] = useState('');

  const sendMessage = async (event) => {
    event.preventDefault();

    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, 'messages'), {
      text: textMessage,
      displayName,
      photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setTextMessage('');
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <form className='text-field' onSubmit={(e) => sendMessage(e)}>
      <input
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
        id='messageInput'
        name='messageInput'
        type='text'
        className='text-input'
        placeholder='type message...'
      />
      <button className='send-btn' type='submit' disabled={!textMessage} onClick={sendMessage}>
        Send
      </button>
    </form>
  );
};

export default SendMessage;
