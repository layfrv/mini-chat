import { React, useEffect } from 'react';
import '../Chat/chat.scss';
import { auth, db } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  const getTime = () => {
    const seconds = message.createdAt.seconds;
    const date = new Date(seconds * 1000);
    const time = `${date.getHours()}:${date.getMinutes()}`;
    return time;
  };

  return (
    <div className={`msg-container ${message.uid === user.uid ? 'right' : ''}`}>
      <img className='msg-avatar' src={message.photoURL} alt='avatar'></img>
      <div className='msg-content'>
        <div className='msg-title'>
          <h2>{message.displayName}</h2>
          <p className='msg-time'>{getTime()}</p>
        </div>

        <div className='msg-text'>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
