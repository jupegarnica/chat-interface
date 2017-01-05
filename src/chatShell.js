import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Chat from './chat.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; //material-ui dependency
import {store, changeThemeAction, windowResizeAction} from './redux.js';
import Bot from './bot';
// eslint-disable-next-line
const bot = new Bot({
    questions: [
        {
            type: 'text',
            contents: ['¿Cómo estás?'],
            next: [
                {
                    matcher: /bien/,
                    goToID: 'bien', //default: go next
                }, {
                    matcher: /mal/,
                    goToID: 'mal', //default: go next
                }
            ],
            id: 'estas', // save answer with this name
            input: {
                type: 'select',
                options: ['bien', 'mal','bien', 'mal']
            }
        }, {
            type: 'text',
            contents: [
                'Me llamo Yosi, encantado. Tú?', '¿Sin mayúscula?, escríbelo bien por favor, que cuesta poco. :P'
            ],
            next: [
                {
                    matcher: /^[A-Z]/, // valid if first Character es Upppercase
                    goToID: '', //default: go next
                }
            ],
            id: 'name',
            input: {
                type: 'text',
                placeholder: 'Pepe el de los palotes...', //suggestion
            }
        }, {
            type: 'text',
            contents: ['Me alegro #{name}, ¿Qué puedo hacer por ti?'],
            id: 'bien', // save answer with this name
            next: [
                {
                    matcher: /|/,
                    goToID: 'email'
                }
            ]
        }, {
            type: 'text',
            contents: ['Siempre se puede mejorar :), ¿Qué puedo hacer por ti?'],
            id: 'mal', // save answer with this name
        }, {
            type: 'text',
            contents: [
                '¿Cúal es tu email?', 'no parece un email ${name}'
            ],
            next: [
                {
                    matcher: /.*@.*\./,
                    goToID: ''
                }
            ],
            input: {
                type: 'text',
                placeholder: 'nombre@empresa.com', //suggestion
            },
            id: 'email'
        }, {
            type: 'text',
            contents: ['Nombre: #{name}, email: #{email}  correcto?'],
            next: [
                {
                    matcher: /(si)|(ok)|(correcto)/i,
                    goToID: ''
                }, {
                    matcher: /mal|no|cambiar|volver/i,
                    goToID: 'name'
                }
            ],
            input: {
                placeholder: 'si? no?'
            },
            id: 'resumenCheck'
        }, {
            type: 'text',
            contents: [`Repetimos?
                #{answers}


                :D
                `],
            next: [
                {
                    matcher: /mal|no|cambiar|volver/i,
                    goToID: 'name'
                }, {
                    matcher: /|/,
                    goToID: ''
                }
            ],
            input: {
                type: 'text',
                placeholder: 'Adios', //suggestion
            }
            // no next, or no matcher
        }, {
            type: 'text',
            contents: [`
                #{answers}


                Gracias por su colaboración ;D
                `],
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

let theme = search && search.length
    ? search[0].split('bg=').join('').split('&').join('')
    : '';
theme && store.dispatch(changeThemeAction(theme));

const listenToResize = (e) => {
    let action = windowResizeAction(document.body.offsetWidth, document.body.offsetHeight)
    if (store.getState().layout !== action.payload) {
        store.dispatch(action);
    }
};
// React component
class ChatShellComp extends Component {
    componentDidMount() {
        window.addEventListener('resize', listenToResize);
        listenToResize();
    }
    componentWillUnmount(){
        window.removeEventListener('resize', listenToResize );
    }
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <Chat ref={(el) => {
                        this.chatElement = el;
                    }}/>
                </MuiThemeProvider>
            </Provider>
        )
    }
}

export default ChatShellComp;
