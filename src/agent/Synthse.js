import React from "react";
import {    synchronize_data} from "../redux/action";
import { connect } from 'react-redux'
import IP from "../redux/Ip_provider";
import './Synthese.css'
import ListZones from "./ListZones";

import mapboxgl from 'mapbox-gl'
import Map from "./Map";
import {NavLink} from "react-router-dom";

class Synthse extends React.Component{

    constructor(props){
        super(props) ;

        this.state = {
            global_dz : {
                updatedAtCountry:"2020-05-09T23:27:30.079Z",
                totalDead:0,
                totalActive:0,
                totalConfirmed:0 ,
                totalRecovered:0

            }
        }
    }

    componentDidMount() {
        if((localStorage.getItem("token")!==null)&&(!this.props.dz_now.loaded)&&(!this.props.dz_now.loaded_cities)){
            this.props.synchronize_data(localStorage.getItem("token"))
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

               if(data.items.length>0) {
                   this.setState({
                       global_dz: data.items[0]
                   })
               }



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


            <div className={"col-xs-12"} style={{marginBottom:"20px"}}> <h1 className={"title_zone"}> Les zones Affectés par Covid-19: </h1> </div>

            <div className={"col-xs-6"} style={{height:"500px"}}>
                <ListZones />

                <div className={"col-xs-12"} style={{marginTop:"40px",fontSize:"140%"}}> <NavLink to={'/new_zone'} type={"button"} className={"my_button_update"}  value={"Ajouter un nouvelle zone"}> Ajouter un nouvelle zone </NavLink> </div>

            </div>

            <div className={"col-xs-6"}>



                <Map />

            </div>

            <div className={"col-xs-12 zero_pad footer_style"} style={{marginTop:"100px",color:"white",textAlign:"left",padding:"30px"}}>

                <div className={"col-xs-9"}> Sous la tutelle du <h4> Ministère de la Santé, de la Population et de la Réforme Hospitalière </h4> </div>
                <div className={"col-xs-3"}> <div className={"col-xs-12"}> Algérie @2020</div>  <div className={"col-xs-12"} onClick={()=>{localStorage.clear(); window.location.reload()}} style={{cursor:"pointer"}}>Déconnexion</div></div>



            </div>

        </div>
    }

}


const mapStatetoProps = (state) =>{
    return {
        dz_now: {
            loaded: state.dz_now.loaded , // . loaded data
            loaded_cities:state.dz_now.loaded_cities ,

            zones : state.dz_now.zones,
            zones_cities : state.dz_now.zones_cities ,
            selected : state.dz_now.selected
        }
    }
}

const mapDispatchToProps = {
      synchronize_data

}

export default connect(mapStatetoProps,mapDispatchToProps)(Synthse)
