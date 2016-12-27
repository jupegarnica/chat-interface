import React from 'react';
import './chat.css';
import ChatMessages from './chatMessages';
import ChatInput from './chatInput';

const Chat = () => (
    <div className="chat-wrapper">
        <ChatMessages />
        <ChatInput/>
    </div>
)
export default Chat;
