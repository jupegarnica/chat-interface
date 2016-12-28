import React from 'react';
import './chat.css';
import ChatMessages from './chatMessages';
import ChatInput from './chatInput';
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
        return (
            <div className={'chat-wrapper ' + this.props.state.layout} ref={(el) => {this.chatElement = el;}}>
                <ChatMessages />
                <ChatInput/>
            </div>
        )

    }
}export default connect(stateToProps, dispatchToProps)(Chat);
