import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import Chat from './chat.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; //material-ui dependency

// React component
class ChatShellComp extends Component {
    render() {
        const {value, onIncreaseClick} = this.props
        return (
            <MuiThemeProvider>
                <Chat/>
            </MuiThemeProvider>
        )
    }
}
//
// ChatShellComp.propTypes = {
//     value: PropTypes.number.isRequired,
//     onIncreaseClick: PropTypes.func.isRequired
// }
//
// Action
const sendMessage = (msg) => {
    return {
        type: 'sendMessage',
        payload: msg
    };
}
//

// Reducer
function chatReducer(state = {
    messagesHistory: [],
    uiState: {},
}, action) {
    const count = state.count
    switch (action.type) {
        case 'sendMessage':
            return {
                count: count + 1
            }
        default:
            return state
    }
}
//
// Store
const store = createStore(chatReducer)

// Map Redux state to component props
function mapStateToProps(state) {
    return {messagesHistory: state.messagesHistory}
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (msg) => dispatch(sendMessage(msg))
    }
}

// Connected Component
const ChatShell = connect(mapStateToProps, mapDispatchToProps)(ChatShellComp)
export default ChatShellComp;
