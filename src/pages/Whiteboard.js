import React, { Component } from 'react';
import Iframe from 'react-iframe';
import {Button} from "react-bootstrap";

class Whiteboard extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <Iframe url="http://localhost:8082"
                        width="600px"
                        height="600px"
                        display="initial"
                        position="relative"/>
            </div>
        )
    }
}

export default Whiteboard;
