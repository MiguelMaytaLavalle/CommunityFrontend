import React, {Component} from 'react';

class LogoutPage extends Component{

    render(){
        return(
            <div>
                <h1>This is the Logout Page</h1>
                <h4>You are logged out now</h4>
            </div>
        );
    }

    /*retrieveWelcomeMessage(){
        this.props.match.params.name
    }*/
}
export default LogoutPage