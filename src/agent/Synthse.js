import React from "react";
import { get_data_dz_zones_now } from "../redux/action";
import { connect } from 'react-redux'
import IP from "../redux/Ip_provider";



class Synthse extends React.Component{

    constructor(props){
        super(props) ;

        this.state = {
            global_dz : {

            }
        }
    }

    componentDidMount() {
        if(localStorage.getItem("token")!==null){
            this.props.get_data_dz_zones_now(localStorage.getItem("token"))
        }


        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("token"));

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(IP+"/api/v0/zone/groupByCountry?cc=DZ&sort=-dead", requestOptions)
            .then(response => response.json().then((data)=>{

                this.setState({
                        global_dz:data.items[0]
                })

                console.log(data.items[0])

            }).catch((errr)=>{console.log(errr)}))

            .catch(error => console.log('error', error));


    }


    render() {
        return <div className={"col-xs-12 zero_pad"}>

            <div className={"col-xs-12"}></div>

            <div className={"col-xs-8"}></div>

            <div className={"col-xs-4"}>


            {this.props.dz_now.zones.map((i,itr)=>{
                return <div key={itr}> {i.city} </div>
            })}

            </div>

        </div>
    }

}


const mapStatetoProps = (state) =>{
    return {
        dz_now: {
            loaded: state.dz_now.loaded , // . loaded data
            zones : state.dz_now.zones
        }
    }
}

const mapDispatchToProps = {
    get_data_dz_zones_now
}

export default connect(mapStatetoProps,mapDispatchToProps)(Synthse)
