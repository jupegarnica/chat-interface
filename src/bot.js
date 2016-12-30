import {store, sendMessageAction} from './redux';

export default class Bot {
    constructor({questions = [], sendMessageFn, listenFromFn}) {
        if (typeof sendMessageFn !== 'function') {
            throw new Error('I need a talk function to work properly :(');
        }
        if (typeof listenFromFn !== 'function') {
            throw new Error('I need a listen function to work properly :(');
        }
        this.questions = questions;
        this.sendMessageFn = sendMessageFn;
        listenFromFn(this.listen.bind(this));
    }
    talk(message) {
        store.dispatch(this.sendMessageFn('text', message, 'bot'));
    }
    listen() {
        const messages = store.getState().messagesHistory;
        const lastMessage = messages[messages.length -1] || {timestamp: 0};
        this.lastMessage = this.lastMessage || lastMessage;
        const isNewMessage = this.lastMessage.timestamp < lastMessage.timestamp && lastMessage.user !== 'bot';
        if (isNewMessage) {
            this.lastMessage = lastMessage;
            this.talk(lastMessage.content + '?');
        }
    }
    validateAnswer(message) {
        this.talk(`thinking about ${message}`);
    }
}

const bot = new Bot({
    sendMessageFn: sendMessageAction,
    listenFromFn: store.subscribe
})
bot.talk('hola mundo');
