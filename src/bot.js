import {store, sendMessageAction} from './redux';
export const botState = {
    questions: [],
    answers: [],
    index: 0,
    currentQuestion: {},
    currentAnswer: {
        timestamp: 0
    },
    byeText: 'bye',
    mode: 'ON'
}
export const botReducer = (state = botState, action) => {
    let {payload} = action;
    let {
        index,
        questions,
        currentQuestion,
        currentAnswer,
        answers,
        byeText
    } = state;
    switch (action.type) {
        case 'INIT_BOT':
            return {
                ...state,
                questions: payload,
                index: 0,
                currentQuestion: payload[index]
            };
            break;
        case 'NEXT_QUESTION':
            index += 1;
            currentQuestion = questions[index]
            return {
                ...state,
                index: index,
                currentQuestion
            };
            break;
        case 'PRINT_MESSAGE':
            const isNewAnswer = currentAnswer.timestamp < payload.timestamp && payload.user !== 'bot';
            return {
                ...state,
                currentAnswer: isNewAnswer
                    ? payload
                    : currentAnswer,
                isNewAnswer
            };
            break;
        case 'NEW_VALID_ANSWER':
            return {
                ...state,
                answers: [
                    ...answers,
                    payload
                ]
            }
            case 'BOT_OFF':
                return {
                    ...state,
                    mode: 'OFF'
                }

            break;
        default:
            return {
                ...state
            }

    }
}
export const OrchestratorDispacherMiddleWare = ({getState}) => (next) => (action) => {
    let returnValue = next(action)
    //after dispatch
    const {botState} = getState();
    let {currentQuestion, isNewAnswer, currentAnswer, mode} = botState;

    if (mode === 'OFF') return returnValue;

    switch (action.type) {
        case 'INIT_BOT':
            store.dispatch({type: 'ASK'});
            break;
        case 'ASK':
            talk(botState.currentQuestion);
            break;
        case 'PRINT_MESSAGE':
            if (isNewAnswer) {
                if (isValid(currentAnswer, currentQuestion)) {
                    store.dispatch({type: 'NEW_VALID_ANSWER', payload: currentAnswer});
                } else {
                    store.dispatch({type: 'INVALID_ANSWER', payload: currentAnswer});
                }
            }
            break;
        case 'NEW_VALID_ANSWER':
            store.dispatch({type: 'NEXT_QUESTION'});
            break;
        case 'INVALID_ANSWER':
            talk({
                ...currentQuestion,
                content: currentQuestion.invalidReply
            });
            break;
        case 'NEXT_QUESTION':
            // if no more questions
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
const talk = (msg) => {
    const msgObj = {
        ...msg,
        user: 'bot'
    }
    store.dispatch(sendMessageAction(msgObj));
}
const isValid = ({
    content = ''
}, {
    validatePattern = /./
}) => {
    let isValid = content.match(validatePattern);
    return !!isValid;
}

export default class Bot {
    constructor({
        questions = [],
        sendMessageFn,
        listenFromFn
    }) {
        if (typeof sendMessageFn !== 'function') {
            throw new Error('I need a talk function to work properly :(');
        }
        if (typeof listenFromFn !== 'function') {
            throw new Error('I need a listen function to work properly :(');
        }
        store.dispatch({type: 'INIT_BOT', payload: questions})
        // this.questions = questions;
        // this.sendMessageFn = sendMessageFn;
        // this.answers = {};
        // listenFromFn(this.listen.bind(this));
    }
    // start() {
    //     this.index = -1;
    //     this.nextQuestion();
    // }
    // nextQuestion() {
    //     this.index += 1;
    //     this.currentQuestion = this.questions[this.index];
    //     this.talk(this.currentQuestion);
    // }
    //
    // talk(msg) {
    //     const msgObj = typeof msg === 'string'
    //         ? {
    //             type: 'text',
    //             content: msg,
    //             user: 'bot'
    //         }
    //         : {
    //             ...msg,
    //             user: 'bot'
    //         }
    //     store.dispatch(this.sendMessageFn(msgObj));
    // }
    // listen() {
    //     const messages = store.getState().chatState.messagesHistory;
    //     const lastMessage = messages[messages.length - 1] || {
    //         timestamp: 0
    //     };
    //     this.lastMessage = this.lastMessage || lastMessage;
    //     const isNewMessage = this.lastMessage.timestamp < lastMessage.timestamp && lastMessage.user !== 'bot';
    //     if (isNewMessage) {
    //         this.lastMessage = {
    //             ...lastMessage
    //         };
    //         // this.onNewReply()
    //     }
    // }
    // onNewReply() {
    //     if (this.validateAnswer(this.currentQuestion, this.lastMessage)) {
    //         this.saveAnswer(this.lastMessage);
    //         this.nextQuestion();
    //     } else {
    //         this.talkError();
    //     }
    // }
    // saveAnswer(msg) {
    //     this.answers[msg.nameToSave || this.index] = msg.content;
    //     console.log('saveAnswer', this.answers);
    // }
    // validateAnswer({validatePattern = /./}, {content = ''}) {
    //     let isValid = !!content.match(validatePattern);
    //     console.log(isValid, validatePattern, content, content.search(validatePattern));
    //
    //     return isValid;
    // }
    // talkError() {
    //     this.talk({
    //         ...this.currentQuestion,
    //         content: this.currentQuestion.noValidReply || 'try again'
    //     })
    // }
}
