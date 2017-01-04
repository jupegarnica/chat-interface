import React, {Component} from 'react';
import {connect} from 'react-redux';
import {stateToProps, dispatchProps, sendMessageFromChatInputTextAction, startTypingMeAction, stopTypingMeAction} from './redux';
import ContentSend from 'material-ui/svg-icons/content/send';

class ChatInputTextComp extends Component {
    constructor(){
        super();
        document.body.addEventListener('keydown', e => {
            if (!this.props.state.typing.me) {
                this.props.dispatch(startTypingMeAction(this.textInputElement, this.props.state));
            }
        });

    }
    sendMessageFromChatInputTextAction(e) {
        // e.preventDefault();
        this.props.dispatch(sendMessageFromChatInputTextAction(this.textInputElement, this.props.state.input.placeholder, this.ChatInputTextElement));
    }
    onFocus() {
        if (!this.props.state.typing.me) {
            this.props.dispatch(startTypingMeAction(this.textInputElement, this.props.state));
        }
    }
    onBlur(){
        setTimeout(() => {
            if (this.props.state.typing.me) {
                this.props.dispatch(stopTypingMeAction(this.textInputElement.innerText))
            }
        }, 100);
    }
    onKeyDown(e) {
        if (e.key === 'Enter') {
            this.props.dispatch(sendMessageFromChatInputTextAction(this.textInputElement, this.props.state.input.placeholder, this.ChatInputTextElement));
        }
    }
    render() {
        return (
            <div className={'chat-input '+( this.props.state.isScrollAtBottom ? '':'showShadow') + (this.props.state.typing.me ? 'typing': '') } ref={(el) => this.ChatInputTextElement = el} >
                <div onClick={this.onFocus.bind(this)} className="text-input-wraper bubble thinking">
                    <div ref={(el) => this.textInputElement = el} suppressContentEditableWarning contentEditable onBlur={this.onBlur.bind(this)} onKeyDown={this.onKeyDown.bind(this)} className="text-input">
                        {this.props.state.input.placeholder}
                    </div>

                </div>
                <div hidden={!this.props.state.typing.me} className="sendIcon">
                    <ContentSend onClick={this.sendMessageFromChatInputTextAction.bind(this)}/>
                </div>
            </div>
        );
    }
}
// Connected Component
export default connect(stateToProps, (dispatchProps))(ChatInputTextComp)
