import React from "react";
import { synchronize_data } from "../redux/action";
import {connect} from 'react-redux'
import data from "../redux/wilayas";
import ReactMapGL from "react-map-gl/dist/es5/components/interactive-map";
import IP, {API_TOKEN} from "../redux/Ip_provider";
import {Marker} from "react-map-gl";
import Pin from "../reusable/Pin";
import './newzone.css'

class UpdateZone extends React.Component{

    constructor(props){
        super(props);

        console.log(props.selected)
        this.state = {
            error:false
        }
        console.log(props.selected)

        if(props.selected.city===undefined){
            window.location.pathname = '/'
        }

    }

    parser_date(str){
        let dt = new Date(str);

        let pr =["dimanche","lundi","mardi","mercredi","jeudi","vendredi","Samedi"];

        return (pr[dt.getDay()]+"  "+dt.getDate()+"-"+(dt.getMonth()+1)+"-"+dt.getFullYear()+" ");
    }

    render() {

        return  <div className={"col-xs-12 zero_pad"}>
            <div className={"col-xs-12"}>

                <h1 className={"title_zone_new"} style={{paddingTop:"40px",paddingBottom:"30px"}}> Mettre à jour la zone de {this.props.selected.city} : </h1>
            </div>

            <div className={"col-xs-12"}>
                <div className={"col-xs-6"}>

                    <h3 className={"title_zone_new"} style={{padding:"20px"}}> Mettre à jour les informations : </h3>


                    <div className={"col-xs-12"} style={{paddingTop:"20px"}}>
                        <div className={"col-xs-offset-2 col-xs-8"} style={{textAlign:"left"}}>
                            <div className={"label_new col-xs-8"}> Total Cas Confirmés:</div>
                            <div className={"col-xs-4"}> <input id={"confirmed"} defaultValue={this.props.selected.totalConfirmed} type={"number"} className={"my_text_box_v6"}/> </div>
                        </div>
                    </div>


                    <div className={"col-xs-12"} style={{paddingTop:"20px"}}>
                        <div className={"col-xs-offset-2 col-xs-8"} style={{textAlign:"left"}}>
                            <div className={"label_new col-xs-8"}> Total Cas Actifs:</div>
                            <div className={"col-xs-4"}> <input id={"actif"} defaultValue={this.props.selected.totalActive} type={"number"} className={"my_text_box_v6"}/> </div>
                        </div>
                    </div>


                    <div className={"col-xs-12"} style={{paddingTop:"20px"}}>
                        <div className={"col-xs-offset-2 col-xs-8"} style={{textAlign:"left"}}>
                            <div className={"label_new col-xs-8"}> Total Décès:</div>
                            <div className={"col-xs-4"}> <input id={"deads"} defaultValue={this.props.selected.totalDead} type={"number"} className={"my_text_box_v6"}/> </div>
                        </div>
                    </div>


                    <div className={"col-xs-12"} style={{paddingTop:"20px"}}>
                        <div className={"col-xs-offset-2 col-xs-8"} style={{textAlign:"left"}}>
                            <div className={"label_new col-xs-8"}> Total Guéris:</div>
                            <div className={"col-xs-4"}> <input id={"gueris"} defaultValue={this.props.selected.totalRecovered} type={"number"} className={"my_text_box_v6"}/> </div>
                        </div>
                    </div>


                    <div className={"col-xs-12"} style={{paddingTop:"20px"}}> <h3 className={"title_zone_new"}>Informations complémentaires</h3> </div>



                    <div className={"col-xs-12"} style={{paddingTop:"20px"}}>
                        <div className={"col-xs-offset-2 col-xs-8"} style={{textAlign:"left"}}>
                            <div className={"label_new col-xs-8"}> Total Cas Suspects:</div>
                            <div className={"col-xs-4"}> <input id={"suspect"} type={"number"} defaultValue={0} className={"my_text_box_v6"}/> </div>
                        </div>
                    </div>


                    <div className={"col-xs-12"} style={{paddingTop:"20px"}}>
                        <div className={"col-xs-offset-2 col-xs-8"} style={{textAlign:"left"}}>
                            <div className={"label_new col-xs-8"}> Total Cas critiques:</div>
                            <div className={"col-xs-4"}> <input id={"critical"} type={"number"} defaultValue={0} className={"my_text_box_v6"}/> </div>
                        </div>
                    </div>


                    <div className={"col-xs-6 col-xs-offset-3"} style={{paddingTop:"50px"}}>

                        <input type={"button"} value={"Mettre à JOUR"} style={{backgroundColor:"rgba(0,21,49,0.96)",borderColor:"#002b63"}} className={"my_button_v2"}

                                    onClick={()=>{


                                        let actif = Number( document.querySelector("#actif").value )||0 ;
                                        let dead = Number(document.querySelector("#deads").value )||0;
                                        let confirmed = Number(document.querySelector("#confirmed").value )||0;
                                        let gueris =Number( document.querySelector("#gueris").value )||0;
                                        let suspect = Number( document.querySelector("#suspect").value )||0 ;
                                        let critic = Number(document.querySelector("#critical").value )||0;

                                        let _id = this.props.selected.zoneId ;
                                        let myHeaders2 = new Headers();
                                        myHeaders2.append("Authorization", "Bearer "+localStorage.getItem("token"));
                                        myHeaders2.append("Content-Type", "application/json");

                                        let raw4 = JSON.stringify({"totalPorteur":0,"totalSustects":suspect,"totalConfirmed":confirmed,"totalDead":dead,"totalRecovered":gueris,"dailyDeaths":0,"totalActive":actif,"totalCritical":critic,"zoneZoneId":_id});

                                        let requestOptions1 = {
                                            method: 'POST',
                                            headers: myHeaders2,
                                            body: raw4,
                                            redirect: 'follow'
                                        };

                                        fetch(IP+"/api/v0/dataZone", requestOptions1)
                                            .then(response3 => response3.json())
                                            .then(result2 =>{console.log(result2) ;
                                                this.props.synchronize_data(localStorage.getItem("token"))
                                                window.location.pathname ='/'

                                            })
                                            .catch(error2 => console.log('error', error2));
                                    }}

                        />
                    </div>

                    {this.state.error&&<h4 className={"col-xs-12"}>les paramètres ne sont pas valide ou le lieu n'est pas selectionnné</h4>}



                </div>

                <div className={"col-xs-6"}>


                    <h3 className={"title_zone_new"} style={{paddingTop:"20px"}}>Dernier bilan de la zone : </h3>

                    <div className={"col-xs-12"} >

                        <div  className={"col-xs-12"} style={{paddingTop:"30px",textAlign:"left"}}>

                            <h3 className={"col-xs-12 update_title"}> Dernière mise à jour le {this.parser_date(this.props.selected.dateDataZone)} </h3>


                            <div className={"col-xs-12"} style={{textAlign:"left"}}>
                            <h3 className={"col-xs-3 col-xs-offset-2 update_title"}> la Ville : </h3> {(this.props.selected.city!==undefined)&&<h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{this.props.selected.city.toUpperCase()}</h3>}
                            </div>


                            <div className={"col-xs-12"} style={{textAlign:"left"}}>
                                <h3 className={"col-xs-3 col-xs-offset-2 update_title"}>  Confirmés : </h3> <h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{this.props.selected.totalConfirmed} cas</h3>
                            </div>


                            <div className={"col-xs-12"} style={{textAlign:"left"}}>
                                <h3 className={"col-xs-3 col-xs-offset-2 update_title"}>  Actifs : </h3> <h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{this.props.selected.totalActive} cas</h3>
                            </div>


                            <div className={"col-xs-12"} style={{textAlign:"left"}}>
                                <h3 className={"col-xs-3 col-xs-offset-2 update_title"}> Décès : </h3> <h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{this.props.selected.totalDead} cas</h3>
                            </div>


                            <div className={"col-xs-12"} style={{textAlign:"left"}}>
                                <h3 className={"col-xs-3 col-xs-offset-2 update_title"}> Guéris : </h3> <h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{this.props.selected.totalRecovered} cas</h3>
                            </div>


                        </div>

                    </div>
                </div>

            </div>


            <div className={"col-xs-12 zero_pad footer_style"} style={{marginTop:"100px",color:"white",textAlign:"left",padding:"30px"}}>

                <div className={"col-xs-9"}> Sous la tutelle du <h4> Ministère de la Santé, de la Population et de la Réforme Hospitalière </h4> </div>
                <div className={"col-xs-3"}>Algérie @2020</div>

            </div>


        </div>
    }

}


const mapStateToProps = (state) =>{
    return {
        selected : state.dz_now.selected
    }
}
const mapDispatchToProps = {
   synchronize_data
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateZone)