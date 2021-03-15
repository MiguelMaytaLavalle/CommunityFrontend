import React, {Component} from 'react';
import Chart from 'chart.js'
import Dataservice from "../../api/dataservice/Dataservice";
import {forEach} from "react-bootstrap/ElementChildren";
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../../pages/ProfilePage";


class ChartComponent extends Component{

    constructor(props) {
        super(props);

        console.log("props: " + this.props.username)
        this.state = {
            username: this.props.username,
            type:'line',
            id:[],
            interest:[],
            date:[],
            isChartBoolean: false,
            imageURL: '',
            isLoggedUser:''
        }

        this.handleIfChartExist = this.handleIfChartExist.bind(this)
        this.startUpFunction = this.startUpFunction.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
        this.handleChart = this.handleChart.bind(this)
        this.handleCreateChart = this.handleCreateChart.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveCanvasAsImage = this.saveCanvasAsImage.bind(this)
    }

    handleChange(event){
        console.log(event.target.id)
        this.setState({
            [event.target.id]: event.target.value
        })

    }

    handleIfChartExist(username){
        Dataservice.getUserChart(username).then(response =>{
            console.log(response.data.chart)
            this.getCanvasAsImage(response.data.chart)
            /*this.setState({
                imageURL: response.data.chart
            }, this.getCanvasAsImage)*/
        }).catch(error =>{
            //this.startUpFunction()
        })
    }

    handleCreateChart(){
        console.log("bbb")
        let interest = [];
        let date = [];
        Dataservice.getChartData()
            .then(response => {
                response.data.map(function(item,k){
                    //console.log(item)
                    interest.push(item.interest)
                    date.push(item.date)
                })
                this.setState({
                    interest: interest,
                    date: date
                }, this.handleChart)

                /*this.setState({
                    interest: response.data.interest,
                    date: response.data.date
                }, console.log(this.state.interest))*/
            })
            .catch()
    }
    handleChart(){
        new Chart(this.canvas, this.config)
        this.setState({
            isChartBoolean: this.state.isChartBoolean
        })
        console.log(this.state.isChartBoolean)
    }

    startUpFunction(){
        console.log("startup canvas")
        Dataservice.getUserChart()
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response){

        this.setState({
            imageURL: response.data.chart
        })

    }

    handleError(error){
        console.log(error)
    }

    componentDidMount() {
        console.log("ComponentDidMount")
        this.handleIfChartExist(this.props.username)
    }

    /*componentDidMount() {
        console.log("ComponentDidMount: " + this.state.username)
        if(this.props.username !== sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)){
           // console.log("Not real: " + this.props.username)
            console.log("Is not logged user");
            this.setState({
                isLoggedUser: false
            })
            this.handleIfChartExist(this.state.username);
        }else{
            this.setState({
                isLoggedUser: true
            })
            console.log("Is logged useer")
            // console.log("Same user: " + this.props.username)
            this.handleIfChartExist(this.state.username)
            /!*this.startUpFunction();
            new Chart(this.canvas, this.config)*!/
        }
    }*/

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Component did update chartcomponenet");
        //this.handleIfChartExist(this.state.username)
        console.log("Hello: " + this.state.username)
    }

    getCanvasAsImage(dataURL){
        /*console.log("Get canvas as image")
        const canvas = document.getElementById('myChart');
        const dataURL = canvas.toDataURL();
        console.log(dataURL);*/
        this.setState({
            imageURL:dataURL
        })
        console.log("Canvas: " + this.state.imageURL)
    }

    saveCanvasAsImage(){
        console.log("save canvas as image")
        const canvas = document.getElementById('myChart');
        const dataURL = canvas.toDataURL();
        console.log(dataURL);

        Dataservice.saveUserChart(dataURL)
            .then(r => console.log(r))
            .catch(e => console.log(e))
    }

    get config(){
        console.log(this.state.interest);
        const configData = {
            type: this.state.type,
            data: {
                labels: this.state.date,
                datasets: [{
                    label: 'interest in %',
                    fill:false,
                    data: this.state.interest,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: function(value, index, values){
                                return value + '%';

                            }
                        }
                    }]
                }
            }
        }
        return configData;
    }

    render(){
        return(
            <div>
                {this.state.username === sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) ?
                    <div>
                        corrext {this.state.username}
                        <button type='submit' onClick={this.handleCreateChart}>Create Chart</button>
                        <button type='submit' onClick={this.saveCanvasAsImage}>Save Canvas</button>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="type"
                                   value="line" onChange={this.handleChange} checked/>
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Line
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="type"
                                   value="bar" onChange={this.handleChange} />
                            <label className="form-check-label" htmlFor="exampleRadios2">
                                Bar
                            </label>
                        </div>
                    </div>:
                    <div>
                        not corrext {this.state.username}

                    </div>
                }
                <canvas id="myChart" ref={dom => this.canvas = dom} width="800" height="400"></canvas>
                <img src={this.state.imageURL}></img>



                {/*{this.state.isChartBoolean && <canvas id="myChart" ref={dom => this.canvas = dom} width="800" height="400"></canvas>}*/}
                {/*{this.state.isChartBoolean && <button onClick={this.getCanvasAsImage}>Save Canvas</button>}*/}

            </div>
        );
    }
}

export default ChartComponent;