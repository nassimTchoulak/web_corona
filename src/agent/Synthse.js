import React from "react";
import {    synchronize_data , set_visible_zones_risk} from "../redux/action";
import { connect } from 'react-redux'
import IP from "../redux/Ip_provider";
import './Synthese.css'
import ListZones from "./ListZones";

import mapboxgl from 'mapbox-gl'
import Map from "./Map";
import {NavLink} from "react-router-dom";
import {numberWithSpaces} from "../http_requests/dataCalcule";

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

            },
            show_select :false
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

        fetch(IP+"/api/v0/zone/groupByCountry?sort=dead&limit=200", requestOptions)
            .then(response => response.json().then((data)=>{

                data.items.forEach((i)=>{
                    if(i.counrtyCode==="DZ"){


                        this.setState({
                            global_dz: i
                        })
                    }
                })




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
                     style={{borderRadius:"10px 10px",backgroundImage:"url('"+IP+"/api/v0/assets/back.jpg')",backgroundSize:"cover", backgroundPositionY:"50%",minHeight:"200px"}}>

                    <div className={"col-xs-4"}>
                        <h1 className={"synth_title"}>
                            Bilan du virus Covid-19 en Algérie en chiffres 5
                        </h1>

                        <div className={'white_info'}>Dernière mise à jour le {this.parser_date(this.state.global_dz.updatedAtCountry)}</div>
                    </div>

                    <div className={"col-xs-8"} style={{paddingTop:"20px"}}>

                        <div className={"col-xs-6"}>
                            <div  className={"info_item"}> <h1 style={{color:"#f2b3b3"}} className={"white_info"}> {numberWithSpaces(this.state.global_dz.totalDead)} Décés  </h1></div>
                            <div className={"info_item"}>  <h1 style={{color:"#f2d6b3"}} className={"white_info"}>{numberWithSpaces(this.state.global_dz.totalActive)} Actifs  </h1> </div>

                        </div>
                        <div className={"col-xs-6"}>
                            <div className={"info_item"}>  <h1 style={{color:"#f2d6b3"}} className={"white_info"}>{numberWithSpaces(this.state.global_dz.totalConfirmed)} Cas totale </h1> </div>
                            <div className={"info_item"}> <h1 style={{color:"#b3f2c0"}} className={"white_info"}> {numberWithSpaces(this.state.global_dz.totalRecovered)} Guéries </h1> </div>

                        </div>

                    </div>

                </div>

            </div>


            <div className={"col-xs-7"} style={{marginBottom:"20px"}}> <h1 className={"title_zone"}> Les zones Affectés par Covid-19: </h1> </div>

            <div className={"col-xs-5"} style={{marginBottom:"20px"}}>



                <h2 className={"title_zone col-xs-6"}> LES ZONES EN : </h2>


                <div className={"col-xs-4 "} style={{marginTop:"20px"}} onClick={()=>{

                    this.setState({show_select:!this.state.show_select})
                    //console.log(this.props.dz_now.show_risk)

                }}
                     onMouseLeave={()=>{this.setState({show_select:false})}} >

                    <div align={"center"}  className={"my_button_deep_blue col-xs-12"}>  { this.props.dz_now.display_risk ? " RISQUES " :"DONNEES"} <span>&nbsp;&nbsp;</span> <span className={"glyphicon glyphicon-chevron-down"}></span></div>

                    <div className={"col-xs-12 zero_pad"} style={{position:"relative",zIndex:50}}>

                        {this.state.show_select&&<div  className={"zero_pad col-xs-12"} style={{position:"absolute",top:"0px",left:"0px"}}>

                            <div onClick={()=>{
                                this.props.set_visible_zones_risk(false)
                            }} className={"my_select_element col-xs-12"} > en données </div>


                            <div onClick={()=>{
                                this.props.set_visible_zones_risk(true)
                            }}
                                className={"my_select_element col-xs-12"} > en risques </div>

                        </div>}
                    </div>


                </div>


            </div>

            <div className={"col-xs-6 list_zone_table"} >
                <ListZones />

                <div className={"col-xs-12"} style={{marginTop:"40px",fontSize:"140%"}}> <NavLink to={'/sante/new_zone'} type={"button"} className={"my_button_deep_blue"}  value={"Ajouter un nouvelle zone"}> Ajouter un nouvelle zone </NavLink> </div>

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
            zones_risk : state.dz_now.zones_risk ,

            display_risk : state.dz_now.display_risk ,

            selected : state.dz_now.selected
        }
    }
}

const mapDispatchToProps = {
      synchronize_data , set_visible_zones_risk

}

export default connect(mapStatetoProps,mapDispatchToProps)(Synthse)
