import React, { useEffect, useRef, useState } from 'react';
import './chat.scss';
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

  const [showEmojis, setShowEmojis] = useState(false);

  const [textMessage, setTextMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));
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

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='main-container' onClick={() => setShowEmojis(false)}>
      <div className='chat_container'>
        <div className='chat-messages'>
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              {messages?.map((message) => (
                <Message message={message} key={message.id} />
              ))}
              <div className='ref' ref={scrollRef}></div>
            </>
          )}
        </div>

        <SendMessage
          textMessage={textMessage}
          setTextMessage={setTextMessage}
          showEmojis={showEmojis}
          setShowEmojis={setShowEmojis}
        />
      </div>
    </div>
  );
};

export default Chat;
