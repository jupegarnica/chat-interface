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
                    placeholder: 'Juan?', //suggestion
                }
            }, {
                type: 'text',
                contents: [`Me alegro ##{name} -> Me alegro #{name}
                    ----
                    ¿Qué puedo hacer por ti?`],
                id: 'hacer', // save answer with this name,
                next:[{
                    matcher:'email',
                    goToID:'email'
                }],
                input: {
                    type: 'select',
                    options: ['guardar email', 'ver respuestas']
                }
            },{
                type: 'text',
                contents: [
                    '¿Cúal es tu email?', 'no parece un email #{name}, volvemos a intentarlo'
                ],
                next: [
                    {
                        matcher: /^.+@.+$/, // /.*@.*\./,
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
                contents: [' #{email} , ¿es correcto?'],
                next: [
                    {
                        matcher: /si|(ok)|(correcto)/i,
                        goToID: 'hacer'
                    }, {
                        matcher: /mal|no|cambiar|volver/i,
                        goToID: 'email'
                    }
                ],
                input: {
                    type: 'select',
                    options: ['si','cambiar']
                },
                id: 'resumenCheck'
            }, {
                type: 'text',
                id:'respuetas',
                contents: [`
                    #{answers}


                    repetimos?
                    `],
                next: [
                    {
                        matcher: /si|cambiar|volver/i,
                        goToID: 'hacer'
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
            }
        ]
    //questions: [
    //     {
    //         content: 'What do you want to do?',
    //         id: 'what',
    //         input: {
    //             type: '',
    //             options: ['check email', 'check url']
    //         },
    //         next: [
    //             {
    //                 matcher: 'email',
    //                 goToID: 'email'
    //             }, {
    //                 matcher: 'url',
    //                 goToID: 'url'
    //             }
    //         ]
    //
    //     }, {
    //         contents: [
    //             'Dime un email please', 'no es un email, dime otro'
    //         ],
    //         id: 'email',
    //         next: [
    //             {
    //                 matcher: /^.+@.+\..+$/,
    //                 goToID: 'what'
    //             }
    //         ]
    //     }, {
    //         contents: [
    //             'Dime una url please', 'no es una url, dime otra'
    //         ],
    //         id: 'url',
    //         next: [
    //             {
    //                 matcher: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    //                 goToID: 'what'
    //             }
    //         ]
    //     }, {}, {
    //         content: '#{answers}'
    //     }
    // ]
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
    componentWillUnmount() {
        window.removeEventListener('resize', listenToResize);
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
