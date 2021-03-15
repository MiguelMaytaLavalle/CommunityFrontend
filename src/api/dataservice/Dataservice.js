import axios from 'axios';
import {API_URL, API_URL_CHART} from "../../Constants";
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../authenticationservice/AuthenticationService";

class Dataservice {

    getUsers(){
        return axios.get(`${API_URL}/user`, {headers: {authorization: sessionStorage.getItem("access_token")}})
    }

    //Get juan user from database
    getUserBody(user){
        return axios.get(`${API_URL}/user/${user}`, {headers: {authorization: sessionStorage.getItem("access_token")}})
    }

    registerUser(user){
        return axios.post(`${API_URL}/signup`, user)
    }

    getSenders(){
        let username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        return axios.get(`${API_URL}/inbox/${username}`, {headers: {authorization: sessionStorage.getItem("access_token")}}).catch(function(error){
            throw Error
        })
    }

    getPrivateResponses(receiver){
        let sender = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        return axios.get(`${API_URL}/inbox/private/${sender}/${receiver}`,{headers: {authorization: sessionStorage.getItem("access_token")}}).catch(function(error){
            throw Error
        })
    }

    getPrivateMessages(sender){
        let receiver = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        return axios.get(`${API_URL}/inbox/private/${sender}/${receiver}`,{headers: {authorization: sessionStorage.getItem("access_token")}}).catch(function(error){
            throw Error
        })
    }

    createPM(content, receiver){
        let sender = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        let data = {sender: sender, content: content, receiver: receiver}
        return axios.post(`${API_URL}/send`, data, {headers: {authorization: sessionStorage.getItem("access_token")}})

    }

    getMessageLog(user){
        if(user === ""){
            throw Error
        }
        return axios.get(`${API_URL}/post/${user}`, {headers: {authorization: sessionStorage.getItem("access_token")}}).catch(function(error){
            throw Error
        })
    }

    createPost(content){
        let username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        let data = {content: content, username: username}
        return axios.post(`${API_URL}/post`, data, {headers: {authorization: sessionStorage.getItem("access_token")}})
    }

    getChartData(){
        return axios.get(`${API_URL_CHART}/list`)
    }

    getUserChart(username){
        console.log("get user chart dataservice for: " + username)
        console.log(username)
        return axios.get(`${API_URL}/getUserChart/${username}`, {headers: {authorization: sessionStorage.getItem("access_token")}})
    }

    saveUserChart(content){
        let username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        let data = {username: username, chart: content}
        return axios.post( `${API_URL}/saveUserChart`, data, {headers: {authorization: sessionStorage.getItem("access_token")}})
    }

    getGraphData(){
        return axios.get(`${API_URL}/user`, {headers: {authorization: sessionStorage.getItem("access_token")}})
    }

}

export default new Dataservice()