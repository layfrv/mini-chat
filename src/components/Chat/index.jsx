import React, { createRef, useEffect, useRef, useState } from 'react';
import './chat.modules.scss';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../utils/firebase';
import Message from '../Message/Message';
import SendMessage from '../Message/SendMessage';
import Skeleton from '../Skeleton/';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Chat = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showEmojis, setShowEmojis] = useState(false);

  const [textMessage, setTextMessage] = useState('');

  const scrollRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    setIsLoading(false);
    return () => unsubscribe;
  }, []);

  const nodeRef = createRef();

  return (
    <div className="main-container" onClick={() => setShowEmojis(false)}>
      <div className="chat_container">
        <TransitionGroup>
          <div className="chat-messages" ref={scrollRef}>
            {isLoading ? (
              <Skeleton />
            ) : (
              messages?.map((message) => (
                <CSSTransition
                  key={message.uid + Math.random()}
                  nodeRef={nodeRef}
                  timeout={500}
                  classNames="message-animation"
                  scrollRef={scrollRef}>
                  <Message message={message} />
                </CSSTransition>
              ))
            )}
          </div>
        </TransitionGroup>
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
