import React, {Component} from 'react';
import {connect} from 'react-redux';
import {stateToProps, dispatchProps, sendMessageAction, startTypingMeAction, stopTypingMeAction} from './redux';
import ContentSend from 'material-ui/svg-icons/content/send';

class ChatInputComp extends Component {
    sendMessageAction(e) {
        e.preventDefault();
        this.props.dispatch(sendMessageAction(this.textInputElement, this.props.state.chatInputText, this.chatInputElement));
    }
    onFocus() {
        if (!this.props.state.typing.me) {
            this.props.dispatch(startTypingMeAction(this.textInputElement));
        }
    }
    onBlur(){
        setTimeout(() => {
            if (this.props.state.typing.me) {
                this.props.dispatch(stopTypingMeAction())
            }
        }, 0);
    }
    onKeyDown(e) {
        if (!this.props.state.typing.me) {
            this.props.dispatch(startTypingMeAction(this.textInputElement));
        }
        if (e.key === 'Enter') {
            this.props.dispatch(sendMessageAction(this.textInputElement, this.props.state.chatInputText, this.chatInputElement));
        }
    }
    render() {
        return (
            <div className="chat-input " ref={(el) => this.chatInputElement = el} >
                <div onClick={this.onFocus.bind(this)} className="text-input-wraper bubble thinking">
                    <div ref={(el) => this.textInputElement = el} suppressContentEditableWarning contentEditable onBlur={this.onBlur.bind(this)} onKeyDown={this.onKeyDown.bind(this)} className="text-input">
                        {this.props.state.chatInputText}
                    </div>

                </div>
                <div hidden={!this.props.state.typing.me} className="sendIcon">
                    <ContentSend onClick={this.sendMessageAction.bind(this)}/>
                </div>
            </div>
        );
    }
}
// Connected Component
export default connect(stateToProps, (dispatchProps))(ChatInputComp)
