import React, {Component} from 'react';
import {connect} from 'react-redux';
import {stateToProps, dispatchProps, sendMessageFromChatInputTextAction, sendMessageAction} from './redux';
import ContentSend from 'material-ui/svg-icons/content/send';

class ChatInputSelectComp extends Component {
    constructor(){
        super();
        this.state = {
            selected: -1
        }
    }
    sendMessageFromChatInputTextAction(e) {
        // e.preventDefault();
        // this.props.dispatch(sendMessageFromChatInputTextAction(this.textInputElement, this.props.state.input.placeholder, this.chatInput));
    }
    onFocus() {
    //     if (!this.props.state.typing.me) {
    //         this.props.dispatch(startTypingMeAction(this.textInputElement));
    //     }
    }
    onBlur(){
    //     setTimeout(() => {
    //         if (this.props.state.typing.me) {
    //             this.props.dispatch(stopTypingMeAction())
    //         }
    //     }, 100);
    }
    onKeyDown(e) {
        // if (!this.props.state.typing.me) {
        //     this.props.dispatch(startTypingMeAction(this.textInputElement));
        // }
        // if (e.key === 'Enter') {
        //     this.props.dispatch(sendMessageFromChatInputTextAction(this.textInputElement, this.props.state.input.placeholder, this.chatInput));
        // }
    }
    selectOption(i,o) {
        this.setState({selected: i});
        this.props.dispatch(sendMessageFromChatInputSelectAction(o))
    }

    render() {
        let {options} = this.props.state.input

        let _options = options.map((o, i) => {
            let isSelected = this.state.selected === i ? 'option-selected' : '';
            return (
                <div className={'bubble thinking ' + isSelected} key={i} onClick={this.selectOption.bind(this, i,o)}>
                    {o}
                </div>
            )
        });
        return (
            <div className={'chat-input '+( this.props.state.isScrollAtBottom ? '':'showShadow') } ref={(el) => this.chatInput = el} >
                <div onClick={this.onFocus.bind(this)} className="text-input-wraper ">
                    {_options}
                    {/* <div ref={(el) => this.textInputElement = el} suppressContentEditableWarning contentEditable onBlur={this.onBlur.bind(this)} onKeyDown={this.onKeyDown.bind(this)} className="text-input">

                    </div> */}

                </div>
                <div hidden={!this.props.state.typing.me} className="sendIcon">
                    <ContentSend onClick={this.sendMessageFromChatInputTextAction.bind(this)}/>
                </div>
            </div>
        );
    }
}
// Connected Component
export default connect(stateToProps, (dispatchProps))(ChatInputSelectComp)

const sendMessageFromChatInputSelectAction = (content) => {
    // domNode.blur();
    document.body.classList.add('chat-input-goTransparent');
    setTimeout(() => document.body.classList.remove('chat-input-goTransparent'), 1000)
    return sendMessageAction({type: 'text', content, user: 'me'});
}
