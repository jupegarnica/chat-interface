import {store, sendMessageAction} from './redux';
export const botState = {
    questions: [],
    answers: {},
    index: -1,
    currentQuestion: {},
    currentAnswer: {
        timestamp: 0
    },
    mode: 'ON'
}

const parseVariables = (text = '') => {
    const pattern = /#{\w{1,}}/g;
    text = text.split('$${').join('&&&{');
    text = text.split('##{').join('&&&{');
    text = text.split('${').join('#{');
    const matchs = text.match(pattern);
    if (matchs) {
        let answers = store.getState().botState.answers;
        matchs.forEach(m => {
            let variable = m.replace('#{', '').replace('}', '');
            let content = variable === 'answers'
                ? JSON.stringify(answers, null, 2)
                : answers[variable]
            text = text.replace(m, content);
        })
    }
    return text.split('&&&{').join('#{');
}
const talk = (msg) => {
    const msgObj = {
        ...msg,
        content: parseVariables(msg.content),
        user: 'bot'
    }
    store.dispatch(sendMessageAction(msgObj));
}
// const talkResults = (answers, question) => {
//     const msgObj = {
//         ...question,
//         content: JSON.stringify(answers, null, 2),
//         user: 'bot'
//     }
//     store.dispatch(sendMessageAction(msgObj));
// }

const readQuestion = (q) => {
    let {
        contentsIndex = -1,
        contents = [],
        content
    } = q;
    if (contents.length) {
        let i = ++contentsIndex % contents.length;
        content = contents[i];
    }
    return {
        ...q,
        content,
        contentsIndex
    };
}
const getIndexById = (questions, id) => {
    let r = questions.findIndex(q => typeof id === 'string'
        ? q.id === id
        : false)
    let r2 = r >= 0
        ? r
        : undefined;
    return r2;
}

const isMatch = ({
    content = ''
}, {next}) => {
    if (!next)
        return true; // if no next match anyting.
    for (var i = 0; i < next.length; i++) {
        let match = content.match(next[i].matcher);
        if (!!match) {
            return next[i];
        }
    }
}
const whereToGo = (p) => {
    p = typeof p === 'object'
        ? p
        : {}
    return p.goToID;
}

export const OrchestratorDispacherMiddleWare = ({getState}) => (next) => (action) => {
    let returnValue = next(action);
    //after dispatch
    const {botState} = getState();
    let {currentQuestion, isNewAnswer, currentAnswer, mode} = botState;

    if (mode === 'OFF')
        return console.info('no more questions');

    switch (action.type) {
        case 'INIT_BOT':
            store.dispatch({type: 'NEXT_QUESTION'});
            break;
        case 'ASK':
            talk(botState.currentQuestion);
            break;
        case 'PRINT_MESSAGE':
            if (isNewAnswer) {
                let pattern = isMatch(currentAnswer, currentQuestion);
                if (pattern) {
                    store.dispatch({
                        type: 'VALID_ANSWER',
                        payload: {
                            currentAnswer,
                            currentQuestion,
                            pattern
                        }
                    });
                } else {
                    store.dispatch({
                        type: 'INVALID_ANSWER',
                        payload: {
                            currentAnswer,
                            currentQuestion
                        }
                    });
                }
            }
            break;
        case 'VALID_ANSWER':
            let where = whereToGo(action.payload.pattern);
            store.dispatch({type: 'NEXT_QUESTION', payload: where});
            break;
        case 'INVALID_ANSWER':
            store.dispatch({type: 'ASK'});
            break;
        case 'NEXT_QUESTION':
            // setTimeout(()=> store.dispatch({type: 'CHANGE_INPUT', payload: currentQuestion}), 500);
            store.dispatch({type: 'CHANGE_INPUT', payload: currentQuestion});
            if (!currentQuestion) {
                store.dispatch({type: 'BOT_OFF'});
            } else {
                store.dispatch({type: 'ASK'});
            }
            break;
        default:
            // do nothing

    }
    return returnValue
}

export const botReducer = (state = botState, action) => {
    let {payload} = action;
    let {index, questions, currentAnswer, answers} = state;
    switch (action.type) {
        case 'INIT_BOT':
            return {
                ...state,
                questions: payload
            };
        case 'NEXT_QUESTION':
            // if the payload matches any id go to that question else go next index
            let _index = getIndexById(questions, payload);
            _index = typeof _index === 'number'
                ? _index
                : ++index;
            let o = {
                ...state,
                index: _index,
                currentQuestion: questions[_index]
            }
            return o;
            // break;
        case 'PRINT_MESSAGE':
            const isNewAnswer = currentAnswer.timestamp < payload.timestamp && payload.user !== 'bot';
            return {
                ...state,
                currentAnswer: isNewAnswer
                    ? payload
                    : currentAnswer,
                isNewAnswer
            };
            // break;
        case 'VALID_ANSWER':
            const id = payload.currentQuestion.id || index;
            return {
                ...state,
                answers: {
                    ...answers,
                    [id]: payload.currentAnswer.content
                }
            }
        case 'INVALID_ANSWER':
            return {
                ...state,
                currentQuestion: readQuestion(payload.currentQuestion)
            }
        case 'BOT_OFF':
            return {
                ...state,
                mode: 'OFF'
            }
            // break;
        default:
            return {
                ...state
            }

    }
}

export default class Bot {
    constructor({
        questions = []
    }) {
        let payload = questions.map(readQuestion);
        store.dispatch({type: 'INIT_BOT', payload});
    }
};
// let questions = [
//     {
//         type: 'text',
//         contents: ['Woop, ¿Cómo te llamas?','¿Sin mayúscula?, escríbelo bien por favor, que cuesta poco.' ],
//         next: [{
//             matcher: /^[A-Z]/,
//             match: '',
//             notMatch: ''
//         }],
//         id:'name'
//     },
//     {
//         type: 'text',
//         contents: ['Hola ${name}, cual es tu email?', 'no parece un email ${name}'],
//         next: [{
//             matcher: /^[A-Z]/,
//             match: '',
//             notMatch: ''
//         }],
//         id:'email'
//     },
//
// ];
