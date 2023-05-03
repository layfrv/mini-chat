import { React } from 'react';
import '../Chat/chat.scss';
import { auth, db } from '../../utils/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Picker from 'emoji-picker-react';
import { ReactComponent as EmojiIcon } from '../../assets/emoji-icon.svg';

const SendMessage = ({ textMessage, setTextMessage, showEmojis, setShowEmojis }) => {
  const sendMessage = (event) => {
    event.preventDefault();
    const { uid, displayName, photoURL } = auth.currentUser;
    new Promise((resolve, reject) => {
      addDoc(collection(db, 'messages'), {
        text: textMessage,
        displayName,
        photoURL,
        createdAt: serverTimestamp(),
        uid,
      })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
    setTextMessage('');
  };

  const onEmojiClick = (emojiObject) => {
    setTextMessage((prev) => prev + emojiObject.emoji);
    setShowEmojis(false);
  };

  return (
    <div className='bottom'>
      <form className='text-field' onSubmit={(e) => sendMessage(e)} autoComplete='off'>
        <input
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
          id='messageInput'
          name='messageInput'
          type='text'
          className='text-input'
          placeholder='type message...'
        />

        <button className='send-btn' type='submit' disabled={!textMessage} onClick={sendMessage}>
          Send
        </button>
      </form>

      <div className='emoji-container' onClick={(e) => e.stopPropagation()}>
        <EmojiIcon className='btn-icon' onClick={() => setShowEmojis(!showEmojis)} />
        {showEmojis && (
          <Picker
            className='picker'
            onEmojiClick={onEmojiClick}
            searchDisabled={true}
            width={300}
            height={350}
            lazyLoadEmojis={true}
          />
        )}
      </div>
    </div>
  );
};

export default SendMessage;
