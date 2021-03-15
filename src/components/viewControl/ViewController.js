import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import ErrorPage from '../../pages/ErrorPage';
import SignUp from '../../pages/SignUp';
import LoginPage from '../../pages/LoginPage';
import HeaderComponent from "../header/HeaderComponent";
import ProfilePage from "../../pages/ProfilePage";
import PrivateMessagesPage from "../../pages/PrivateMessagesPage";
import AuthenticatedRoute from "../authenticatedRoute/AuthenticatedRoute";
import LogoutPage from "../../pages/LogoutPage";
import SearchResultPage from "../../pages/SearchResultPage";
import InboxPage from "../../pages/InboxPage";
import Whiteboard from "../../pages/Whiteboard"

class ViewController extends Component{

    render(){
        return(
            <Router>
                <>
                <HeaderComponent/>
                <Switch>
                <Route path="/" exact component={LoginPage}/>
                <Route path="/login" exact component={LoginPage}/>
                <Route path="/logout" exact component={LogoutPage}/>
                <Route path="/signup" exact component={SignUp}/>
                <Route path="/users" exact component={SearchResultPage}/>
                <Route path="/inbox" exact component={InboxPage}/>
                <Route path="/privatemsg" exact component={PrivateMessagesPage}/>
                <AuthenticatedRoute path="/profile" exact component={ProfilePage}/>
                <AuthenticatedRoute path="/whiteboard" exact component={Whiteboard}/>
                <Route path="" component={ErrorPage}/>
                </Switch>
                    </>
            </Router>

        );
    }

}
export default ViewController