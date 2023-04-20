import React, { useEffect, useState } from 'react';
import './chat.modules.scss';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Loader } from '../Loader';
import { collection, orderBy, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../utils/firebase';
import { Message } from '../Message';
import SendMessage from '../Message/SendMessage';

export const Chat = () => {
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesCollectionRef = collection(db, 'messages');

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await getDocs(messagesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        console.log(filteredData);
        setMessages(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, []);

  return (
    <div className='chat_container'>
      <div className='chats'></div>

      <div className='chat-field'>
        <>
          {messages.map((message) => (
            <Message
              name={message.displayName}
              text={message.text}
              avatar={message.photoURL}
              time={message.time}
            />
          ))}
        </>
        <SendMessage />
        <div className='text-field'>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='text-input'></input>
          <button className='send-btn'>send</button>
        </div>
      </div>
    </div>
  );
};
