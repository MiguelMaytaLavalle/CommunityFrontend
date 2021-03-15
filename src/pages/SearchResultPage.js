import React, {Component} from 'react';
import Dataservice from "../api/dataservice/Dataservice";
import './SearchResultPage.css'
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../api/authenticationservice/AuthenticationService";

class SearchResultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernames: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.redirectFunction = this.redirectFunction.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.state !== this.props.location.state) {
            this.startupFunction()
        }
    }

    startupFunction() {
        try {
            Dataservice.getUsers().then(response => {
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

    handleChange(event) {
        this.setState({content: event.target.value});
    }

    render() {
        console.log(this.state.usernames)
        return (
            <div>
                <h1>Select User</h1>
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
        if(username === sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)){
            this.props.history.push({
                pathname: '/mylog',
            })
        } else{
            this.props.history.push({
                pathname: '/log',
                state: {user: username}
            })
        }
    }
}

export default SearchResultPage