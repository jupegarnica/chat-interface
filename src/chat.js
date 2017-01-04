import React, {Component} from 'react';
import './chat.css';
import ChatMessages from './chatMessages';
import ChatInputText from './chatInputText';
import ChatInputSelect from './chatInputSelect';
import {connect} from 'react-redux';
import {stateToProps, dispatchToProps, windowResizeAction} from './redux';

const listenToResize = () => {
    let action = windowResizeAction(_this.chatElement.offsetWidth, _this.chatElement.offsetHeight)
    if (_this.props.state.layout !== action.payload) {
        _this.props.dispatch(action);
    }
};
let _this;
class Chat extends Component {
    constructor(props) {
        super();
        _this = this;

    }
    componentDidMount() {
        document.body.addEventListener('resize', listenToResize );
        let action = windowResizeAction(this.chatElement.offsetWidth, this.chatElement.offsetHeight)
        if (this.props.state.layout !== action.payload) {
            this.props.dispatch(action);
        }
    }
    componentWillUnmount(){
        document.body.removeEventListener('resize', listenToResize );
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
            <div className={'chat-wrapper ' + this.props.state.layout} ref={(el) => {
                this.chatElement = el;
            }}>
                <ChatMessages/> {chatInput}
            </div>
        )

    }
}
export default connect(stateToProps, dispatchToProps)(Chat);
