import React, {Component} from 'react';
import Dataservice from "../api/dataservice/Dataservice";
import './SearchResultPage.css'
import AuthenticationService, {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../api/authenticationservice/AuthenticationService";
import Autosuggest from "react-autosuggest";
import AutoSuggestComponent from "../components/autoSuggestSearch/AutoSuggestComponent";

class InboxPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernames: [],
            content: "",
            recipient: ""
        }
        this.redirectFunction = this.redirectFunction.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCallback = (autosuggest) => {
        this.setState({
            recipient: autosuggest
        })
    }

    handleChange(event) {
        this.setState({content: event.target.value});
    }

    handleSubmit(event) {
        Dataservice.createPM(this.state.content, this.state.recipient)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.state !== this.props.location.state) {
            this.startupFunction()
        }
    }

    startupFunction() {
        try {
            Dataservice.getSenders().then(response => {
                console.log(response)
                if (response.data !== "") {
                    this.setState({
                        usernames: response.data
                    })
                } else {
                    console.log("Nothing was found")
                    this.setState({usernames: []})
                }
            })
        } catch (Error) {
            console.log(Error)
            this.setState({usernames: []})
        }
    }

    componentDidMount() {
        this.startupFunction()
    }

    render() {
        console.log(this.state.recipient)
        return (
            <div>
                <h1>Select User</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <AutoSuggestComponent recipient={this.handleCallback}></AutoSuggestComponent>
                        <textarea value={this.state.content} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                {
                    this.state.usernames.map((username, index) => {
                        return (
                            <div key={index}>
                                <span className="Profile" onClick={() => this.redirectFunction(username)}>{username}</span>
                                <br/>
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    redirectFunction(username){
        this.props.history.push({
                pathname: '/privatemsg',
                state: {user: username}
        })
    }
}

export default InboxPage