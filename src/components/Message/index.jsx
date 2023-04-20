import React from 'react';
import '../Chat/chat.modules.scss';
import avatarExample from '../../assets/avatar-example.JPG';

export const Message = ({ name, text, avatar, time }) => {
  const date = time.toDate();
  const formatDate = `${date.getHours()} : ${date.getMinutes()} ${date.getDay()}`;

  return (
    <div className='msg-container'>
      <img className='msg-avatar' src={avatarExample} alt='avatar'></img>
      <div className='msg-content'>
        <div className='msg-title'>
          <h2>{name}</h2>
          <p>{formatDate}</p>
        </div>

        <div className='msg-text'>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};
