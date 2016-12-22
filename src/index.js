import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import Chat from './chat';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; //material-ui dependency

ReactDOM.render((
    <MuiThemeProvider>
        <Chat/>
    </MuiThemeProvider>
), document.getElementById('chat-root'));
