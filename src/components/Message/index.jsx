import React from 'react';
import '../Chat/chat.modules.scss';
import avatarExample from '../../assets/avatar-example.JPG';
import { auth } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Message = ({ name, text, avatar, time, uid }) => {
  // const date = time.toDate();
  // const formatDate = `${date.getHours()} : ${date.getMinutes()} ${date.getDay()}`;

  const [user] = useAuthState(auth);

  return (
    <div className={`msg-container ${uid === user.uid ? 'right' : ''}`}>
      <img className="msg-avatar" src={avatarExample} alt="avatar"></img>
      <div className="msg-content">
        <div className="msg-title">
          <h2>{name}</h2>
          <p>{}</p>
        </div>

        <div className="msg-text">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
