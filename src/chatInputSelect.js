import React, {Component} from 'react';
import {connect} from 'react-redux';
import {stateToProps, dispatchProps, sendMessageAction} from './redux';

const sendMessageFromChatInputSelectAction = (content) => {
    // domNode.blur();
    document.body.classList.add('chat-input-goTransparent');
    setTimeout(() => document.body.classList.remove('chat-input-goTransparent'), 1000)
    return sendMessageAction({type: 'text', content, user: 'me'});
}

let _this ;
class ChatInputSelectComp extends Component {
    constructor(props) {
        super();
        this.state = {
            selected: -1,
            option: '',
            options: props.state.input.options
        }
        _this = this;
    }
    componentDidMount() {
        document.body.addEventListener('keydown', this.listenOnKeyDown , false)
    }
    componentWillUnmount(){
        document.body.removeEventListener('keydown', this.listenOnKeyDown , false)
    }
    listenOnKeyDown(e) {
        e.preventDefault();
        switch (e.key) {
            case 'Enter':
                if (_this.state.selected >= 0) {
                    _this.props.dispatch(sendMessageFromChatInputSelectAction(_this.state.option))
                }
                break;
            case 'ArrowUp':
                {
                    const {selected, options} = _this.state;
                    const max = options.length - 1;
                    const k = selected >= 0
                        ? (selected < 1
                            ? 0
                            : selected - 1)
                        : max;
                    _this.setState({selected: k, option: options[k]});
                }
                break;
            case 'ArrowDown':
                {
                    const {selected, options} = _this.state;
                    const max = options.length - 1;
                    const k = selected >= 0
                        ? (selected >= max
                            ? max
                            : selected + 1)
                        : 0;
                    _this.setState({selected: k, option: options[k]});
                }
                break;
            default:

        }
    }
    selectOption(i, o) {
        this.setState({selected: i, option: o});
        setTimeout(()=> this.props.dispatch(sendMessageFromChatInputSelectAction(o)), 10)
    }

    render() {
        let {options} = this.state;
        let _options = options.map((o, i) => {
            let isSelected = this.state.selected === i
                ? 'option-selected'
                : '';
            return (
                <div className={'bubble thinking ' + isSelected} key={i} onClick={this.selectOption.bind(this, i, o)}>
                    {o}
                </div>
            )
        });
        return (
            <div className={'chat-input ' + (this.props.state.isScrollAtBottom
                ? ''
                : 'showShadow')} ref={(el) => this.chatInput = el}>
                <div className="options-wraper">
                    {_options}
                </div>
            </div>
        );
    }
}
// Connected Component
export default connect(stateToProps, (dispatchProps))(ChatInputSelectComp)
