import React from "react";

import data from '../redux/wilayas'


class NewZone extends React.Component{

    constructor(props){
        super(props)
    }


    render() {
        return <div className={"col-xs-12"}> new one here </div>
    }

    componentDidMount() {
        console.log(data)
    }


}

export  default NewZone ;