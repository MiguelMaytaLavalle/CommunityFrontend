import React, {Component} from 'react';
import Dataservice from "../api/dataservice/Dataservice";
import './PrivateMessagePage.css'
import Container from 'react-bootstrap/Container'

class PrivateMessagesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            content: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({content: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault()
        Dataservice.createPM(this.state.content, this.props.location.state.user).then(response => {
            console.log(response)
            this.startupFunction()
        })
    }

    startupFunction() {
        if (this.props.location.state !== undefined) {
            console.log("Username received, searching for messages")
            try {
                Dataservice.getPrivateMessages(this.props.location.state.user).then(response => {
                    console.log(response)
                    if (response.data !== "") {
                        this.setState({
                            messages: response.data,
                            content: ""
                        })
                    } else {
                        //TODO: REDIRECT TO ALL USERS Page
                        console.log("Nothing was found")
                        this.setState({posts: []})
                    }
                })
            } catch (Error) {
                //TODO: REDIRECT TO ALL USERS PAGE
                this.props.history.push({
                    pathname: '/inbox'
                })
            }

        } else {
            this.setState({
                posts: []
            })
        }
    }

    componentDidMount() {
        this.startupFunction()
    }

    render() {
        return (
            <div>
                <h1>{this.props.location.state.user !== undefined ? this.props.location.state.user : <p>Sender</p>}</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Message:
                        <textarea value={this.state.content} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <div className="table-scroll custom-scroll container">
                    {
                        this.state.messages.map(
                            msg => {
                                console.log(msg)
                                return (
                                    <div className="row">
                                        <div className="col-2 border border-dark"><text style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>#{msg.sender}</text></div>
                                        <div className="col-7 border border-dark"><text style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>{msg.content}</text></div>
                                        <div className="col-3 border border-dark"><text style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>{msg.dateSent}</text></div>
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
        );
    }
}

export default PrivateMessagesPage