import React, {Component} from 'react';
import Button from '../../node_modules/react-bootstrap/Button';
import AuthenticationService from "../api/authenticationservice/AuthenticationService";


class LoginPage extends Component{

    constructor(props) {
        super(props);

        this.state={
            username:'',
            password:'',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.handleError = this.handleError.bind(this)
    }

    handleChange(event){
        this.setState(
            {
                [event.target.id]: event.target.value
            }
        )
        console.log(this.state)
    }


    loginClicked (){
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then( (response) => {
                this.setState({showSuccessMessage:true})
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                sessionStorage.setItem("chart", false);
                this.props.history.push("/profile")
            })
            .catch(()=>{
                this.setState({hasLoginFailed: true})
                this.setState({showSuccessMessage: false})
            })
    }

    render(){
        return(
            <div>
                <h1>Login to your account</h1>
                <form className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div className="alert alert-success">Login Successful</div>}
                    <div className="form-group mx-sm-8 mb-5">
                        <label>Username</label>
                        <input type="username" value={this.state.username} onChange={this.handleChange} className="form-control" id="username" placeholder="Username"/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="password" placeholder="Password"/>
                    </div>

                    <Button className="btn btn-primary" onClick={this.loginClicked}>Login</Button>
                </form>
            </div>

        );
    }

    handleError(error){
        console.log(error.response)
    }
}
export default LoginPage