import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import IP, {API_TOKEN} from "../../redux/Ip_provider";
import {numberWithSpaces, parser_date} from "../../http_requests/dataCalcule";
import Footer from "../../reusable/Footer";
import {get_world_data, set_selected_zone_world, set_visible_stats} from "../../redux/action";
import ReactMapGL, {Marker} from "react-map-gl";
import coords_map from "../../redux/wilayas.json";
import './worldmap.css'
import ZoneStats from "./ZoneStats";


const WorldMap = (props)=>{


    const calculate_raduis = (nb_cas=1)=>{


        return Math.floor((Math.pow(viewport.zoom/1.5,1.5)*Math.pow(nb_cas,0.3)))

        //     return Math.floor((Math.pow(this.state.viewport.zoom,2.5)*nb_cas)/10)
    }

    const [global,set_global] = useState({
        totalDead:0,
        totalActive:0 ,
        totalConfirmed:0,
        totalRecovered:0 ,
        updatedAtCountry:""
    })



    const [viewport,set_view_port] = useState( {
            width: "80vw",
            height: "70vh",
            latitude: 34.430472,
            longitude: 3.334102,
            zoom: 2
    })

    useEffect(()=>{
        props.get_world_data()
    },[])

    useEffect(()=>{
        let totalConfirmed = 0
        let totalDead = 0
        let totalRecovered =0
        let totalActive = 0

        props.world_data_zones.map((i)=>{
            totalConfirmed += i.totalConfirmed
            totalDead += i.totalDead
            totalRecovered += i.totalRecovered
            totalActive += i.totalActive
        })

        if(props.world_data_zones.length>0) {
            set_global({
                totalConfirmed,
                totalDead,
                totalRecovered,
                totalActive,
                updatedAtCountry: props.world_data_zones[0].createdAt
            })
        }

    },[props.world_data_zones])




    return <div className={"col-xs-12 zero_pad"}>

        <div className={"col-xs-12"} style={{padding:"30px"}}>

            <div className={"col-xs-12 main_holder"}
                 style={{borderRadius:"10px 10px",backgroundImage:"url('"+IP+"/api/v0/assets/back.jpg')",backgroundSize:"cover", backgroundPositionY:"50%",minHeight:"200px"}}>

                <div className={"col-xs-4"}>
                    <h1 className={"synth_title"}>
                        Bilan du virus Covid-19 dans le monde en chiffres
                    </h1>

                    <div className={'white_info'}>Dernière mise à jour le {parser_date(global.updatedAtCountry)}</div>
                </div>

                <div className={"col-xs-8"} style={{paddingTop:"20px"}}>

                    <div className={"col-xs-6"}>
                        <div  className={"info_item"}> <h2 style={{color:"#f2b3b3"}} className={"white_info"}> {numberWithSpaces(global.totalDead)} Décés  </h2></div>
                        <div className={"info_item"}>  <h2 style={{color:"#f2d6b3"}} className={"white_info"}>{numberWithSpaces(global.totalActive)} Actifs  </h2> </div>

                    </div>
                    <div className={"col-xs-6"}>
                        <div className={"info_item"}>  <h2 style={{color:"#f2d6b3"}} className={"white_info"}>{numberWithSpaces(global.totalConfirmed)} Cas totale </h2> </div>
                        <div className={"info_item"}> <h2 style={{color:"#b3f2c0"}} className={"white_info"}> {numberWithSpaces(global.totalRecovered)} Guéries </h2> </div>

                    </div>

                </div>

            </div>

        </div>

        <div className={"col-xs-12"}>

            <h1 className={" col-xs-10"} style={{color:"#002148"}}>
                La carte inernationale de COVID-19
            </h1>

            <div className={"col-xs-12"}>
                        <ReactMapGL {...viewport}
                                    onViewportChange={nextViewport => set_view_port(nextViewport)}
                                    mapStyle={'mapbox://styles/mapbox/dark-v10'} mapboxApiAccessToken={API_TOKEN} >




                            {


                                props.world_data_zones.map((i,itr)=>{
                                    return  <Marker key={itr}
                                                    {...i} >   <div className={"zone"} onMouseEnter={()=>{ props.set_selected_zone_world(i)  }}
                                                                                         style={{height:calculate_raduis(i.totalConfirmed),width:calculate_raduis(i.totalConfirmed)}}> </div>
                                    </Marker>
                                })


                            }




                            {
                                (props.world_data_selected.city!==undefined)&& <Marker   {...props.world_data_selected} >   <div className={"zone_selected "}
                                                                     style={{height:calculate_raduis(props.world_data_selected.totalConfirmed),width:calculate_raduis(props.world_data_selected.totalConfirmed)}} > </div>

                                    <div className={"selected_international_zone"}>
                                        <div style={{fontWeight:"bold"}} className={"col-xs-12"}>{props.world_data_selected.country.toUpperCase()}</div>
                                        <div style={{fontWeight:"bold",fontSize:"80%",textAlign:"center"}} className={"col-xs-12"}>  {props.world_data_selected.city.toUpperCase()}</div>

                                        <div className={"col-xs-12"}>{numberWithSpaces(props.world_data_selected.totalConfirmed)} Cas</div>
                                        <div className={"col-xs-12"}>{numberWithSpaces(props.world_data_selected.totalRecovered)} guéris</div>
                                        <div className={"col-xs-12"}>{numberWithSpaces(props.world_data_selected.totalDead)} Décès</div>
                                        <div className={"col-xs-12"}>{numberWithSpaces(props.world_data_selected.totalActive)} Actifs</div>


                                        <div className={"col-xs-12"} style={{paddingTop:"20px"}}>
                                            <input type={"button"} value={"GRAPH"} className={"my_button_reject"} onClick={()=>{ props.set_visible_stats(true) }}/>
                                        </div>


                                    </div>

                                </Marker>
                            }






                        </ReactMapGL>
            </div>

        </div>

        <ZoneStats />



        <Footer />

    </div>



}

const mapDispatchToProps = {
    get_world_data , set_selected_zone_world ,set_visible_stats
}

const mapStateToProps = (state) =>{
    return {
        world_data_zones : state.world_data.zones ,
        world_data_selected : state.world_data.selected
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WorldMap)