import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router';
import AuthenticationService from "../../api/authenticationservice/AuthenticationService";
import Autosuggest from 'react-autosuggest';
import Dataservice from "../../api/dataservice/Dataservice";
import './HeaderComponent.css'
import AutoSuggestComponent from "../autoSuggestSearch/AutoSuggestComponent";



class HeaderComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            recipient: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange() {
        if(sessionStorage.getItem("authenticatedUser") === this.state.value){
            this.props.history.push({
                pathname: '/profile'
            })
        }else {
            if(this.state.recipient === ""){
                this.props.history.push({
                    pathname: '/users',
                    state: {user: this.state.recipient}
                })
            }
            this.props.history.push({
                pathname: '/profile',
                state: {user: this.state.recipient}
            })
        }
    }

    handleCallback = (autoSuggest) => {
        this.setState({
            recipient: autoSuggest
        })
    }

    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return(
            <header>
                <nav className={"navbar navbar-expand-md navbar-dark bg-dark"}>
                    <div className="navbar-brand">Community</div>

                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/profile">Profile</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/inbox">Inbox</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/whiteboard">Whiteboard</Link></li>}
                        {isUserLoggedIn && <AutoSuggestComponent recipient={this.handleCallback}></AutoSuggestComponent>}
                        {isUserLoggedIn && <button onClick={this.handleChange}>Search</button>}
                    </ul>

                    <ul className={"navbar-nav navbar-collapse justify-content-end"}>
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/signup">Signup</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        );
    }
}

export default withRouter(HeaderComponent)