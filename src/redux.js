import {createStore, applyMiddleware, combineReducers} from 'redux';
import Logger from 'redux-logger';
import {botState,botReducer, OrchestratorDispacherMiddleWare} from './bot';

const initialmessagesHistory = [
    // {
    //     type: 'text',
    //     content: 'hola',
    //     user: 'me'
    // }, {
    //     type: 'text',
    //     content: 'LoremLorem ipsum dolor sit amet, consectetur adipisicing elit, ',
    //     user: 'john doe'
    // }, {
    //     type: 'text',
    //     content: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //     user: 'me'
    // }, {
    //     type: 'text',
    //     content: ':)',
    //     user: 'john'
    // }
];
export const chatState = {
    messagesHistory: initialmessagesHistory,
    theme: 'black',
    typing: {
        me: false
    },
    chatInputText: 'type...',
    isAutoScrolling: false,
    isScrollAtBottom: true,
}

// Reducer:  Pure function and inmutable state aproach
export function chatReducer(state = chatState, action) {
    switch (action.type) {
        case 'PRINT_MESSAGE':
            return {
                ...state,
                messagesHistory: [
                    ...state.messagesHistory,
                    action.payload
                ]
            }
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'START_TYPING_ME':
            return {
                ...state,
                typing: {
                    me: true
                }
            }
        case 'STOP_TYPING_ME':
            return {
                ...state,
                typing: {
                    me: false
                }
            }
        case 'START_AUTOSCROLL':
            return {
                ...state,
                isAutoScrolling: true
            }
        case 'STOP_AUTOSCROLL':
            return {
                ...state,
                isAutoScrolling: false
            }
        case 'CHANGE_LAYOUT':
            return {
                ...state,
                layout: action.payload
            }
        case 'SET_SCROLL':
            return {
                ...state,
                isScrollAtBottom: action.payload
            }
        default:
            return state
    }
}

// Store
const loggerOptions = {
    level: 'log', //: 'log' | 'console' | 'warn' | 'error' | 'info', // console's level
    // duration = false, //: Boolean, // Print the duration of each action?
    // timestamp = true, //: Boolean, // Print the timestamp with each action?
    //colors: ColorsObject, // Object with color getters. See the ColorsObject interface.
    //logger = console: LoggerObject, // Implementation of the `console` API.
    //logErrors = true: Boolean, // Should the logger catch, log, and re-throw errors?
    collapsed: true, // Takes a boolean or optionally a function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
    // predicate, // If specified this function will be called before each action is processed with this middleware.
    // stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
    // actionTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
    // errorTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.
    // titleFormatter, // Format the title used when logging actions.
    diff: true,
    // diff = false: Boolean, // Show diff between states.
    // diffPredicate // Filter function for showing states diff.'
}
const reducers = combineReducers({botState:botReducer, chatState: chatReducer})
export const store = createStore(reducers, {chatState,botState}, applyMiddleware(Logger(loggerOptions), OrchestratorDispacherMiddleWare))

// Actions (logic)
export const changeThemeAction = (theme) => {
    document.body.classList.add(theme);
    return {type: 'CHANGE_THEME', payload: theme};
}

export const startTypingMeAction = (domNode) => {
    function selectElemText(elem) {
        var range = document.createRange();
        range.selectNodeContents(elem);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    };
    selectElemText(domNode);
    return {type: 'START_TYPING_ME'};
}

export const stopTypingMeAction = () => {
    (function clearSelection() {
        if (document.selection) {
            document.selection.empty();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    })();
    document.body.click();
    return {type: 'STOP_TYPING_ME'};
}

export const sendMessageAction = ({type, content, user}) => {
    let timestamp =  + new Date();
    const msg = {
        type,
        content,
        user,
        timestamp,
    }
    return {type: 'PRINT_MESSAGE', payload: msg};
}
export const sendMessageFromChatInputAction = (domNode, defaultText, elementToHide) => {
    // domNode.blur();
    const content = domNode.innerText;
    elementToHide.classList.add('goTransparent');
    setTimeout(() => elementToHide.classList.remove('goTransparent'), 1000)
    domNode.innerText = defaultText;
    store.dispatch(stopTypingMeAction());
    return sendMessageAction({type:'text', content, user:'me'});
}


const runAutoScrollDown = (domNode) => () => {
    domNode.scrollTop = domNode.scrollHeight;
}
let intervalID = null;
// Writing new Message to screen.
export const startAutoScrollAction = (messagesDomNode) => {
    if (!intervalID) {
        runAutoScrollDown(messagesDomNode)();
        intervalID = setInterval(runAutoScrollDown(messagesDomNode), 200);
    }
    return {type: 'START_AUTOSCROLL'};
}
export const stopAutoScrollAction = () => {
    clearInterval(intervalID);
    intervalID = null;
    return {type: 'STOP_AUTOSCROLL'};
}
export const windowResizeAction = (width, heigth) => {
    const layout = width / heigth > 2
        ? 'landscape'
        : 'portrait'
    return {type: 'CHANGE_LAYOUT', payload: layout};
}
export const isScrollAtBottom = (domNode) => {
    return {
        type: 'SET_SCROLL',
        payload: !(domNode.offsetHeight + domNode.scrollTop < domNode.scrollHeight - 20)
    };
}

// Map Redux state to component props
export const stateToProps = (state) => {
    return {state: state.chatState}
}

// Map Redux actions to component props
// export const dispatchToProps = (dispatch) => (action) => {
//     return {
//         dispatch: (data) => dispatch(action(data))
//     }
// }
export const dispatchToProps = (dispatch) => {
    return {dispatch}
}
