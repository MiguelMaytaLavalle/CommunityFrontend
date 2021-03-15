import React, {Component} from 'react';
import Dataservice from "../api/dataservice/Dataservice";
import './ProfilePage.css'
import ChartComponent from "../components/chart/ChartComponent";
import Chart from "chart.js";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class ProfilePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            content: '',
            posts: [],
            message: '',
            test: 'test',
            isChartBoolean: ''
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleLog = this.handleLog.bind(this)
        this.handlePM = this.handlePM.bind(this)
        this.handleChart = this.handleChart.bind(this)
    }

    handleChange(event) {
        this.setState({content: event.target.value});
    }

    handlePM(event) {
        event.preventDefault()
        Dataservice.createPM(this.state.content, this.state.username)
        this.startupFunction()
    }

    handleLog(event) {
        event.preventDefault()
        Dataservice.createPost(this.state.content).then(response => {
            this.startupFunction()
        })
    }

    /*handleChart(event) {
        event.preventDefault()
        Dataservice.getChartData().then(response =>{
            console.log(response)

            console.log(response.data.map(function (p, i ){
                if(p === null){
                    console.log("No data");
                }else{
                    console.log(p);
                }
            }))

        })
    }*/

    handleChart(){
        let k = sessionStorage.getItem("chart");
        k = !k;
        sessionStorage.setItem("chart", k);
        console.log(this.state.isChartBoolean)
    }

    componentDidMount() {
        let chart = false;
        this.startupFunction(chart)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("profilepage didupdate")
        console.log(prevState)
        if (prevProps.location.state !== this.props.location.state) {
            this.startupFunction()
        }
    }

    startupFunction() {
        var username = ""
        this.setState({
            isChartBoolean: sessionStorage.getItem("chart")
        })

        if (this.props.location.state === undefined) {
            username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
            this.setState({
                content: "Write something to your log"
            })
        } else {
            username = this.props.location.state.user
            this.setState({
                content: `Write a private message to ${this.props.location.state.user}`
            })
        }
        Dataservice.getUserBody(username)
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error))
        Dataservice.getMessageLog(username).then(response => {
            this.setState({
                posts: response.data,
            })
        })
    }

    handleSuccessfulResponse(response) {
        console.log(response.data.username)
        this.setState({
            username: response.data.username,
            email: response.data.email
        })
    }

    handleError(error) {
        console.log(error)
        let errorMessage = '';

        if (error.message)
            errorMessage += error.message

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message
        }

        this.setState({})

    }

    render() {
        console.log(this.state)
        let isChartBoolean = false;
        return (
            <div>
                {this.state.username === sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) ?
                    <h1>Welcome {this.state.username}</h1> :
                    <h1>{this.state.username}</h1>}
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h1>Profile</h1>
                        </div>
                        <div className="col-6">
                            {this.state.username === sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) ?
                                <h1> Your Message Log</h1> :
                                <h1>{this.state.username}'s Message Log</h1>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <table className="table table-striped table-sm">
                                <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{this.state.username}</td>
                                    <td>{this.state.email}</td>
                                </tr>
                                </tbody>
                            </table>
                            {this.state.username === sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) ?
                                <form onSubmit={this.handleLog}>
                                    <label>
                                        Post to Log:
                                        <div>
                                            <textarea value={this.state.content} onChange={this.handleChange}/>
                                        </div>
                                        <div>
                                            <input type="submit" value="Submit Post"/>
                                        </div>
                                    </label>

                                </form> : <form onSubmit={this.handlePM}>
                                    <label>
                                        Private Message:
                                        <div>
                                            <textarea value={this.state.content} onChange={this.handleChange}/>
                                        </div>
                                        <div>
                                            <input type="submit" value="Submit"/>
                                        </div>
                                    </label>
                                </form>
                            }

                            {this.state.username === sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) ?
                                <div>
                                    {console.log("Username: " + this.state.username)}
                                    <p>Your chart {this.state.username}</p>
                                    {this.state.username !== undefined && <ChartComponent username={this.state.username}/>}

                                </div>:<div>
                                    <p>friend {this.state.username}</p>
                                    {this.state.username !== undefined && <ChartComponent username={this.state.username}/>}
                                </div>
                            }
                        </div>
                        <div className="col-6">
                            <div class="table-wrapper-scroll-y my-custom-scroll">
                                {
                                    this.state.posts.map(function (post, i) {
                                        if (post.content === null) {
                                            console.log("Something works")
                                        } else {
                                            return (
                                                <div className="row" key={i}>
                                                    <div className="col-4 border border-dark"><h5 style={{
                                                        textAlign: 'center',
                                                        whiteSpace: 'pre-wrap',
                                                        overflowWrap: 'break-word'
                                                    }}>@{post.username}</h5></div>
                                                    <div className="col-8 border border-dark"><h6 style={{
                                                        textAlign: 'center',
                                                        whiteSpace: 'pre-wrap',
                                                        overflowWrap: 'break-word'
                                                    }}>{post.content}</h6></div>
                                                    <br/>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default ProfilePage