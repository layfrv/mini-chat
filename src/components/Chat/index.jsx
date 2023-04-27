import React, { useEffect, useRef, useState } from 'react';
import './chat.modules.scss';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../utils/firebase';
import Message from '../Message/Message';
import SendMessage from '../Message/SendMessage';
import Skeleton from '../Skeleton/';

const Chat = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [textMessage, setTextMessage] = useState('');

  const scroll = useRef();

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      setIsLoading(false);
    });
    return () => unsubscribe;
  }, []);

  return (
    <div className="chat_container">
      <div className="chat-messages">
        {isLoading ? <Skeleton /> : messages?.map((message) => <Message message={message} />)}
        <span ref={scroll}></span>
      </div>
      <SendMessage textMessage={textMessage} setTextMessage={setTextMessage} scroll={scroll} />
    </div>
  );
};

export default Chat;
