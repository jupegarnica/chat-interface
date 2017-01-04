import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Chat from './chat.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; //material-ui dependency
import {store,changeThemeAction} from './redux.js';
import Bot from './bot';
// eslint-disable-next-line
const bot = new Bot({
    questions: [
        {
            type: 'text',
            contents: ['Me llamo Yosi, como estás?'],
            next: [{
                matcher: undefined, // match anything
                goToID: '', //default: go next
            }],
            id:'estas', // save answer with this name
            input: {
                type: 'select',
                options: ['bienbienbienbienbienbienbien', 'malmalmalmalmal']
            }
        },
        {
            type: 'text',
            contents: ['Woop, ¿Cómo te llamas?','¿Sin mayúscula?, escríbelo bien por favor, que cuesta poco.' ],
            next: [{
                matcher: /^[A-Z]/,
                goToID: '', //default: go next
            }],
            id:'name',
            input: {
                type: 'text',
                placeholder: 'Paco el de los palotes...', //suggestion
            }
        },
        {
            type: 'text',
            contents: ['Me llamo Yosi, como estás?'],
            next: [{
                matcher: undefined, // match anything
                goToID: '', //default: go next
            }],
            id:'estas', // save answer with this name
            input: {
                type: 'select',
                options: ['bien', 'mal']
            }
        },
        {
            type: 'text',
            contents: ['Hola #{name}, cual es tu email?', 'no parece un email ${name}'],
            next: [{
                matcher: /.*@.*\./,
                goToID: '',
            }],
            input: {
                type: 'text',
                placeholder: 'nombre@empresa.com', //suggestion
            },
            id:'email'
        },
        {
            type: 'text',
            contents: ['Nombre: #{name}, email: #{email}  seguimos?'],
            next: [
                {
                    matcher: /(si)|(ok)|(correcto)/i,
                    goToID: ''
                }, {
                    matcher: /mal|no|cambiar|volver/i,
                    goToID: 'name'
                }
            ],
            id:'resumenCheck'
        },
        {
            type: 'text',
            contents: [
                `Adios
                #{answers}


                :D
                `
            ],
            input: {
                type: 'text',
                placeholder: 'Adios', //suggestion
            }
                // no next, or no matcher
        }
    ]
})

// triggers
//changeThemeAction
let search = window.location.search.match(/bg=[^&]*/);

let theme = search && search.length ? search[0].split('bg=').join('').split('&').join('') : '';
theme && store.dispatch(changeThemeAction(theme));

// React component
class ChatShellComp extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <Chat/>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

export default ChatShellComp;
