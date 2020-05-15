import React from "react";
import { synchronize_data } from "../redux/action";
import {connect} from 'react-redux'
import data from "../redux/wilayas";
import ReactMapGL , {Marker, NavigationControl}from 'react-map-gl'
import IP, {API_TOKEN} from "../redux/Ip_provider";

import Pin from "../reusable/Pin";
import './newzone.css'
import TableRowUpdate from "./TableRowUpdate";
import {pinStyle} from "./NewZone";

class UpdateZone extends React.Component{

    constructor(props){
        super(props);


        this.state = {
            error:false ,
            zones:[] ,

            viewport: {
                width: "35vw",
                height: "50vh",
                latitude: 32.430472,
                longitude: 3.334102,
                zoom: 5
            },



        }

        if(props.selected.city===undefined){
            window.location.pathname = '/sante'
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.zones_risk!==prevProps.zones_risk){
            this.synchronize_my_state()
        }
        if(this.props.zones!==prevProps.zones){
            this.synchronize_my_state()
        }

    }
    componentDidMount() {
        this.synchronize_my_state()
    }

    synchronize_my_state(){
        let zones = []
        let tmp = []

        this.props.zones_risk.map((i)=>{
            if(i.city===this.props.selected.city){
                zones.push({...i,is_risk:true,risked:true})
                tmp.push(i.zoneZoneId)
                console.log('rusk ',i)
            }
        })

        this.props.zones.map((i)=>{
            if((i.city===this.props.selected.city)&&(tmp.indexOf(i.zoneId)===-1)){
                zones.push({...i,is_risk:false,diametre:10,cause:"",risked:false})
                console.log('normal ',i)
            }
        })


        this.setState({zones})
    }


    parser_date(str){
        let dt = new Date(str);

        let pr =["dimanche","lundi","mardi","mercredi","jeudi","vendredi","Samedi"];

        return (pr[dt.getDay()]+"  "+dt.getDate()+"-"+(dt.getMonth()+1)+"-"+dt.getFullYear()+" ");
    }

    render() {

        return  <div className={"col-xs-12 zero_pad"} >
            <div className={"col-xs-12"}>

                <h1 className={"title_zone_new"}> Mettre à jour la zone de {this.props.selected.city} : </h1>
            </div>


            <div className={"col-xs-7"} style={{paddingTop:"20px",minHeight:"65vh"}}>
                                        <h3 className={"col-xs-12 update_title"}> Dernière BILAN du {this.parser_date(this.props.selected.updatedAtCountry)} </h3>





                                        <div className={"col-xs-6"} style={{textAlign:"left"}}>
                                            <h3 className={"col-xs-6 update_title"}>  Confirmés : </h3> <h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{this.props.selected.totalConfirmed} cas</h3>
                                        </div>


                                        <div className={"col-xs-6"} style={{textAlign:"left"}}>
                                            <h3 className={"col-xs-6 update_title"}>  Actifs : </h3> <h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{this.props.selected.totalActive} cas</h3>
                                        </div>


                                        <div className={"col-xs-6"} style={{textAlign:"left"}}>
                                            <h3 className={"col-xs-6 update_title"}> Décès : </h3> <h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{this.props.selected.totalDead} cas</h3>
                                        </div>


                                        <div className={"col-xs-6"} style={{textAlign:"left"}}>
                                            <h3 className={"col-xs-6 update_title"}> Guéris : </h3> <h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{this.props.selected.totalRecovered} cas</h3>
                                        </div>




            <div className={"col-xs-12"}>


                <div className={"col-xs-12 zero_pad"}>

                    <h2 className={"title_zone_new"} style={{paddingBottom:"10px"}} > Mettre à jour les informations : </h2>

                    <div className={"col-xs-12"} >

                        <table className=" col-xs-12 zero_pad big_table" style={{paddingTop: "10px",fontSize:"120%",}}>
                            <tbody  style={   {maxHeight: "60vh",overflowY: "scroll"}}>

                            <tr >

                                <td style={{width:"10%"}} className={"sortable"} >Risqué</td>
                                <td style={{width:"10%"}} className={"sortable"} >Diamètre</td>
                                <td style={{width:"15%"}} className={"sortable"} >cause</td>
                                <td style={{width:"10%"}} className={"sortable"} >décès</td>

                                <td style={{width:"10%"}} className={"sortable"} > Suspects </td>
                                <td style={{width:"10%"}} className={"sortable"} > Actifs </td>
                                <td style={{width:"10%"}} className={"sortable"} > Géris </td>
                                <td style={{width:"10%"}} className={"sortable"} > Confirmés </td>
                                <td style={{width:"15%"}} className={"sortable"} > Update </td>
                            </tr>

                            {this.state.zones.map((i,itr)=>{
                                return <TableRowUpdate key={itr} data={i}  />
                            })}

                            </tbody>
                        </table>
                        clickez sur les elements pour pouvoir les modifier
                    </div>




                </div>

            </div>

            </div>

            <div className={"col-xs-5"}>

                <h3 className={"title_zone_new"} style={{paddingBottom:"10px",paddingTop:"20px"}} > La zone en question : </h3>

                <ReactMapGL {...this.state.viewport}
                            onViewportChange={nextViewport => this.setState({viewport:nextViewport})}
                            mapStyle={'mapbox://styles/mapbox/dark-v10'} mapboxApiAccessToken={API_TOKEN} >



                    {(this.props.selected_for_update.latitude!==undefined)&&<Marker   {...this.props.selected_for_update} draggable={false}

                    > <span style={pinStyle} className={"glyphicon glyphicon-map-marker"}></span> </Marker>}


                </ReactMapGL>

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
        selected : state.dz_now.selected ,
        zones : state.dz_now.zones ,
        zones_risk :state.dz_now.zones_risk ,
        selected_for_update : state.dz_now.selected_for_update
    }
}
const mapDispatchToProps = {
   synchronize_data
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateZone)