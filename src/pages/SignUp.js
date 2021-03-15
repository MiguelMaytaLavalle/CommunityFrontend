import React, {Component} from 'react';
import Button from '../../node_modules/react-bootstrap/Button';
import Dataservice from "../api/dataservice/Dataservice";

class SignUp extends Component{

    constructor(props) {
        super(props);

        this.state={
            username:'',
            email:'',
            password:''
        }

        this.handleChange = this.handleChange.bind(this)
        this.registerClicked = this.registerClicked.bind(this)
    }

    handleChange(event){
        console.log(this.state)
        this.setState(
            {
                [event.target.id]: event.target.value
            }
        )
    }

    registerClicked(){
        if(Dataservice.registerUser(this.state)){
            console.log("Sign up success!");
        }
    }

    render(){
        const isEnabled = this.state.username.length > 3 && this.state.password.length > 3 && this.state.email.length > 3;
        return(
           <div>

                <h1>Create an account</h1>
                <div className="container">

                    <div className="form-group mx-sm-8 mb-5">
                        <label>Username</label>
                        <input type="username" value={this.state.username} onChange={this.handleChange} className="form-control" id="username" placeholder="Username"/>
                    </div>

                    <div className="form-group mx-sm-8 mb-5">
                        <label>Email</label>
                        <input type="email" value={this.state.email} onChange={this.handleChange} className="form-control" id="email" placeholder="Email"/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="password" placeholder="Password"/>
                    </div>

                    <Button className="btn btn-primary" disabled={!isEnabled} onClick={() => this.registerClicked()}>Sign up</Button>
                </div>


            </div>

        );
    }
}
export default SignUp