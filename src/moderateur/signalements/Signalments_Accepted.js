import React from "react";
import IP from "../../redux/Ip_provider";
import Signalement_head from "./signalement_head";
import Signalement from "./signalment";

class Signalement_Accepted extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            data:[]
        }

    }

    render() {
        return <div className={"col-xs-12 zero_pad"}>
            <Signalement_head />


            <h1 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
                Les Signalements positifs des utilisateurs
            </h1>

            <div className={"col-xs-12"}>
                {
                    this.state.data.map((i)=>{
                        return <div className={"col-xs-12"} key={i.signalementId}> <Signalement {...i}  /> </div>
                    })
                }
                {
                    (this.state.data.length===0)&&<h2> Aucun Signalement disponible</h2>
                }
            </div>
        </div>
    }


    componentDidMount() {
        let requestOptions = {
            method: 'GET',
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/signalement/", requestOptions)
            .then(response => response.json())
            .then(result => {
                let tmp = []
                result.rows.forEach((i)=>{
                    if(i.status==="POSITIF"){
                        tmp.push(i)
                    }
                })
                this.setState({data:tmp})

            })
            .catch(error => console.log('error', error));
    }
}



export default Signalement_Accepted