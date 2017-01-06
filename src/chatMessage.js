import React, {Component} from 'react';
import Typist from 'react-typist';

const pop = (t,m) =>{
    let r = [];
    for (var i = 1; i < t.length; i++) {
        r[i - 1] = t[i];
    }
    return r;

}
const mapToLink = (url) => (<a target="_blank" href={url}>{url}</a>);
const mapToSpan = (t) => (<span href={t}>{t}</span>);

const convertStringToHTML = (s = '') => {
    let urlmatcher = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    let matches = s.match(urlmatcher);
    if (matches) {
        let splited = [];
        let textToSplit = s;
        for (var i = 0; i <= matches.length; i++) {
            let m = matches[i];
            let res = textToSplit.split((m));
            if (m) {
                splited = [ ...splited, mapToSpan(res[0]) , mapToLink(m) ];
            } else {
                splited = [ ...splited, mapToSpan(textToSplit) ];
            }
            let x = pop(res);
            textToSplit =  x.join(m);
            return splited;
        }
    } else {
        return s;
    }

}
export default class ChatMessage extends Component {
    render() {
        const cursor = {
            show: false,
            blink: true,
            element: '|',
            hideWhenDone: true,
            hideWhenDoneDelay: 0
        }
        let user = this.props.me
            ? 'me'
            : 'you';
        let htmlContent = convertStringToHTML(this.props.content);
        let content = this.props.animate ?
            (<Typist delayGenerator={this.props.onUpdateText} onTypingDone={this.props.onTypingDone} cursor={cursor} avgTypingDelay={1} stdTypingDelay={500} className="bubble">
                {htmlContent}
            </Typist>)
            :
            (<div className="bubble">
                {htmlContent}
            </div>)
        return (
            <div className={'chat-message ' + user}>
                {content}
            </div>
        );
    }
}
