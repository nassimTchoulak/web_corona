import React from "react";
import { get_data_dz_zones_now } from "../redux/action";
import { connect } from 'react-redux'
import IP from "../redux/Ip_provider";
import './Synthese.css'


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
    parser_date(str){
        let dt = new Date(str);

        let pr =["dimanche","lundi","mardi","mercredi","jeudi","vendredi","Samedi"];

        return (pr[dt.getDay()]+"  "+dt.getDate()+"-"+(dt.getMonth()+1)+"-"+dt.getFullYear()+" ");
    }


    render() {
        return <div className={"col-xs-12 zero_pad"}>

            <div className={"col-xs-12"} style={{padding:"30px"}}>

                <div className={"col-xs-12 main_holder"}
                     style={{borderRadius:"10px 10px",backgroundImage:"url('http://localhost:8080/api/v0/assets/back.jpg')",backgroundSize:"cover", backgroundPositionY:"50%",minHeight:"200px"}}>

                    <div className={"col-xs-4"}>
                        <h1 className={"synth_title"}>
                            Bilan du virus Covid-19 en Algérie en chiffres
                        </h1>

                        <div className={'white_info'}>Dernière mise à jour le {this.parser_date(this.state.global_dz.updatedAtCountry)}</div>
                    </div>

                    <div className={"col-xs-8"} style={{paddingTop:"20px"}}>

                        <div className={"col-xs-6"}>
                            <div  className={"info_item"}> <h1 style={{color:"#f2b3b3"}} className={"white_info"}> {this.state.global_dz.totalDead} Décés  </h1></div>
                            <div className={"info_item"}>  <h1 style={{color:"#f2d6b3"}} className={"white_info"}>{this.state.global_dz.totalActive} Actifs  </h1> </div>

                        </div>
                        <div className={"col-xs-6"}>
                            <div className={"info_item"}>  <h1 style={{color:"#f2d6b3"}} className={"white_info"}>{this.state.global_dz.totalConfirmed} Cas totale </h1> </div>
                            <div className={"info_item"}> <h1 style={{color:"#b3f2c0"}} className={"white_info"}> {this.state.global_dz.totalRecovered} Guéries </h1> </div>

                        </div>

                    </div>

                </div>

            </div>


            <div className={"col-xs-12"}> <h1 className={"title_zone"}> Les zones Affectés par Covid-19: </h1> </div>

            <div className={"col-xs-6"}>


            </div>

            <div className={"col-xs-6"}>


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
