import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase';
import '../Chat/chat.scss';

const Message: any = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div className={`msg-container ${message.uid === user.uid ? 'right' : ''}`}>
      <img className='msg-avatar' src={message.photoURL} alt='avatar'></img>
      <div className='msg-content'>
        <div className='msg-title'>
          <h2>{message.displayName}</h2>
        </div>

        <div className='msg-text'>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
