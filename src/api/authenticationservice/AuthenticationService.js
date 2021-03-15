import axios from 'axios';
import {API_URL} from "../../Constants";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService{

    executeJwtAuthenticationService(username, password){
        return axios.post(`${API_URL}/authenticate`,
            {
                username,
                password
        })
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJwtToken(token))
    }

    createJwtToken(token) {
        return 'Bearer ' + token
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user === null) return false
        return user
    }

    getUserName(){
        return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }


    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        sessionStorage.removeItem("access_token")
    }

    setupAxiosInterceptors(token){
        axios.interceptors.request.use(
            (config) => {
                if( this.isUserLoggedIn() ){
                    config.headers.authorization = token
                }
                sessionStorage.setItem("access_token", config.headers.authorization)
                return config
            }
        )
    }

}

export default new AuthenticationService()