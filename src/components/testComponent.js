import React, { Component } from 'react';

class Test extends Component{

    componentDidMount(){
        console.log("Test componend componentDidMount invoked.");
    }

    componentDidUpdate(){
        console.log("Test componend componentDidUpdate invoked.")
    }

    render(){
        console.log("Test componend render invoked.");
        return(
            <div></div>
        );
    }

}

export default Test;