import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import ChatShell from './chatShell.js';
// eslint-disable-next-line
import Bot from './bot';
ReactDOM.render((<ChatShell/>), document.getElementById('chat-root'));
