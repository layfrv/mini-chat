import React, { FC, useEffect, useRef, useState } from 'react';
import './chat.scss';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import Message from '../Message/Message';
import SendMessage from '../Message/SendMessage';
import Skeleton from '../Skeleton';
import { IMessage } from '@/types/types';

const Chat: FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showEmojis, setShowEmojis] = useState<boolean>(false);

  const [textMessage, setTextMessage] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (docs) => {
      const newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(newMessages);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
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
