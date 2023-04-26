import React, { useEffect, useRef, useState } from 'react';
import './chat.modules.scss';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../utils/firebase';
import Message from '../Message/Message';
import SendMessage from '../Message/SendMessage';
import Skeleton from '../Skeleton/';
import Picker from 'emoji-picker-react';

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

  const [showEmojis, setShowEmojis] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setTextMessage((prev) => prev + emojiObject.emoji);
    setShowEmojis(false);
  };

  return (
    <div className="chat_container">
      <div className="chat-messages">
        {isLoading ? <Skeleton /> : messages?.map((message) => <Message message={message} />)}
        <span ref={scroll}></span>
        <SendMessage textMessage={textMessage} setTextMessage={setTextMessage} scroll={scroll} />

        <div className='emoji-container'>
          <button className="emoji-btn" onClick={() => setShowEmojis(!showEmojis)} />
          {showEmojis && (
            <Picker pickerStyle={{ width: '50%' }} onEmojiClick={onEmojiClick} />
          )}{' '}
        </div>
      </div>
    </div>
  );
};

export default Chat;
