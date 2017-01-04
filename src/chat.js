import React, {Component} from 'react';
import './chat.css';
import ChatMessages from './chatMessages';
import ChatInputText from './chatInputText';
import ChatInputSelect from './chatInputSelect';
import {connect} from 'react-redux';
import {stateToProps, dispatchToProps, windowResizeAction} from './redux';


class Chat extends Component{
    constructor(props){
        super();
        window.addEventListener("resize", () => {
            let action = windowResizeAction( this.chatElement.offsetWidth, this.chatElement.offsetHeight)
            if (this.props.state.layout !== action.payload) {
                this.props.dispatch(action);
            }
        });
    }
    componentDidMount(){
        let action = windowResizeAction( this.chatElement.offsetWidth, this.chatElement.offsetHeight)
        if (this.props.state.layout !== action.payload) {
            this.props.dispatch(action);
        }
    }
    render() {
        const {input} = this.props.state;
        let chatInput;
        if (input.type === 'select' && typeof input.options === 'object' && input.options.length) {
            chatInput = (<ChatInputSelect/>)
        } else {
            chatInput = (<ChatInputText/>)
        }
        return (
            <div className={'chat-wrapper ' + this.props.state.layout} ref={(el) => {this.chatElement = el;}}>
                <ChatMessages />
                {chatInput}
            </div>
        )

    }
}export default connect(stateToProps, dispatchToProps)(Chat);
