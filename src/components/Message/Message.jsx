import { React, useState } from 'react';
import '../Chat/chat.modules.scss';
import avatarExample from '../../assets/avatar-example.JPG';
import { auth, db } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  // const time = message.createdAt.seconds;

  return (
    <div className={`msg-container ${message.uid === user.uid ? 'right' : ''}`}>
      <img className='msg-avatar' src={avatarExample} alt='avatar'></img>
      <div className='msg-content'>
        <div className='msg-title'>
          <h2>{message.displayName}</h2>
          <p>{}</p>
        </div>

        <div className='msg-text'>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
