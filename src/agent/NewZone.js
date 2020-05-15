import React from "react";

import data from '../redux/wilayas'
import my_style from  './newzone.css'
import '../default_ui.css'
import Axios from "axios";


import { get_place_query } from "../http_requests/http_zones"
import ReactMapGL , {Marker, NavigationControl}from 'react-map-gl'
import {connect} from 'react-redux'
import IP, {API_TOKEN} from "../redux/Ip_provider";
import {   synchronize_data } from "../redux/action";
import Pin from "../reusable/Pin"

import querystr from "querystring";

const pinStyle = {
    color: '#dd4202',
    cursor:"move",
    position: "relative",
    top:"-40px",
    left: "-51%",
    fontSize:"3em"

};



class NewZone extends React.Component{

    constructor(props){
        super(props) ;

        let exec = []
        this.props.dz_now.zones.forEach((i)=>{
            exec.push(i.city)
        })


        this.state = {
            viewport: {
                width: "45vw",
                height: "60vh",
                latitude: 32.430472,
                longitude: 3.334102,
                zoom: 5
            } ,
            excluded_cities: exec,
            selected_city : {
                name:"",
                selected:false ,
                coords : {
                    latitude: 34.430472,
                    longitude: 3.334102,


                }
            } ,
            free_selection:true,

            identified_zone:{
                value:"",
                done:false
            },

            show_select:false,

            error:false
        }


    }



    componentDidMount() {
        console.log(data) ;
        if((localStorage.getItem("token")!==null)&&(!this.props.dz_now.loaded)&&(!this.props.dz_now.loaded)){
            this.props.synchronize_data(localStorage.getItem("token"))
        }

        this.set_first_wilaya()

    }

    set_first_wilaya(){
        let tmp = data.list.sort();
        for( let i=0 ;i<tmp.length ;i++  ){
            if(this.state.excluded_cities.indexOf(tmp[i])===-1){
                this.setState({selected_city:{
                        name:tmp[i] ,
                        selected : true ,
                        coords : data.map[tmp[i]]

                    }})
                break ;
            }
        }
    }

    search_by_coords = ()=>{
        let y = this.state.selected_city.coords.latitude  ;
        let x =  this.state.selected_city.coords.longitude  ;


        get_place_query(x,y).then((result)=>{

            if(result.features.length>0){

                console.log(result.features[0])

                if(/Algeria/.test( result.features[0].place_name) ){
                    this.setState({identified_zone:{value:result.features[0].text,done:true}})
                    this.setState({selected_city:{...this.state.selected_city,selected:true,name:result.features[0].text}})
                }
                else{
                    this.setState({identified_zone:{value:result.features[0].text,done:false}})
                }
            }

        }).catch((err)=>{
            console.log(err)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
            if((!prevProps.dz_now.loaded_cities)&&(this.props.dz_now.loaded_cities)){

                let exec = []
                this.props.dz_now.zones_cities.forEach((i)=>{
                    exec.push(i.city)
                }) ;
                this.setState({excluded_cities:exec})

            }
    }

    send_all = ()=>{
        let actif = Number( document.querySelector("#actif").value )||0 ;
        let dead = Number(document.querySelector("#deads").value )||0;
        let confirmed = Number(document.querySelector("#confirmed").value )||0;
        let gueris =Number( document.querySelector("#gueris").value )||0;
        let suspect = Number( document.querySelector("#suspect").value )||0 ;
        let critic = Number(document.querySelector("#critical").value )||0;

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");

        let raw1 = JSON.stringify({...this.state.selected_city.coords,"counrtyCode":"DZ","city":this.state.selected_city.name,"country": "ALGERIA"});
        //let raw1 = JSON.stringify({"latitude":3.2,"longitude":25.555,"counrtyCode":"US","city":"california","country":"USA"});
        console.log(raw1)

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw1,
            redirect: 'manual'
        };
        fetch(IP+"/api/v0/zone", requestOptions)
            .then(response => response.json())
            .then(result => {


                    let _id = result.content.zoneId ;
                    console.log(_id)
                    let myHeaders2 = new Headers();
                    myHeaders2.append("Authorization", "Bearer "+localStorage.getItem("token"));
                    myHeaders2.append("Content-Type", "application/json");

                    let raw4 = JSON.stringify({"totalPorteur":0,"totalSustects":suspect,"totalConfirmed":confirmed,"totalDead":dead,"totalRecovered":gueris,"dailyDeaths":0,"totalActive":actif,"totalCritical":critic,"zoneZoneId":_id});

                    let requestOptions1 = {
                        method: 'POST',
                        headers: myHeaders,
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

                }

            )
            .catch(error =>  {this.setState({error:true}); console.log(error)} );


    }

    render() {
        return <div className={"col-xs-12 zero_pad"}>
            <div className={"col-xs-12"}>

                <h1 className={"title_zone_new"} style={{paddingTop:"40px",paddingBottom:"30px"}}> Ajouter une nouvelle zone affectée par COVID-19 : </h1>
            </div>

            <div className={"col-xs-12"}>
                <div className={"col-xs-6"}>

                    <h3 className={"title_zone_new"} style={{padding:"20px"}}> Renseignement et bilan provisoire : </h3>


                    <div className={"col-xs-12"} style={{paddingTop:"20px"}}>
                        <div className={"col-xs-offset-2 col-xs-8"} style={{textAlign:"left"}}>
                            <div className={"label_new col-xs-8"}> Total Cas Confirmés:</div>
                            <div className={"col-xs-4"}> <input id={"confirmed"} defaultValue={0} type={"number"} className={"my_text_box_v6"}/> </div>
                        </div>
                    </div>


                    <div className={"col-xs-12"} style={{paddingTop:"20px"}}>
                        <div className={"col-xs-offset-2 col-xs-8"} style={{textAlign:"left"}}>
                            <div className={"label_new col-xs-8"}> Total Cas Actifs:</div>
                            <div className={"col-xs-4"}> <input id={"actif"} defaultValue={0} type={"number"} className={"my_text_box_v6"}/> </div>
                        </div>
                    </div>


                    <div className={"col-xs-12"} style={{paddingTop:"20px"}}>
                        <div className={"col-xs-offset-2 col-xs-8"} style={{textAlign:"left"}}>
                            <div className={"label_new col-xs-8"}> Total Décès:</div>
                            <div className={"col-xs-4"}> <input id={"deads"} defaultValue={0} type={"number"} className={"my_text_box_v6"}/> </div>
                        </div>
                    </div>


                    <div className={"col-xs-12"} style={{paddingTop:"20px"}}>
                        <div className={"col-xs-offset-2 col-xs-8"} style={{textAlign:"left"}}>
                            <div className={"label_new col-xs-8"}> Total Guéris:</div>
                            <div className={"col-xs-4"}> <input id={"gueris"} defaultValue={0} type={"number"} className={"my_text_box_v6"}/> </div>
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

                        <input type={"button"}  value={"AJOUTER ZONE"}  className={"create_button"}

                            onClick={()=>{
                                if(!this.state.free_selection){

                                if(this.state.selected_city.selected){
                                    this.send_all() ;
                                }
                                else{
                                    this.setState({error:true})
                                }}
                                else{
                                    if(this.state.identified_zone.done){
                                        this.send_all() ;
                                    }
                                    else{
                                        this.setState({error:true})
                                    }
                                }


                            }}


                        />
                    </div>

                    {this.state.error&&<h4 className={"col-xs-12"}>les paramètres ne sont pas valide ou le lieu n'est pas selectionnné</h4>}



                </div>

                <div className={"col-xs-6"}>


                    <h3 className={"title_zone_new"} style={{paddingTop:"20px"}}>Localisation de la zone : </h3>

                    <div className={"col-xs-12"}>

                        <div  className={"col-xs-12"} style={{padding:"30px"}}>

                            <div className={"col-xs-12 label_new"} style={{marginBottom:"20px"}}> selectionnez nouvelle wilaya par default ou définissez une zone personnalisé  : </div>

                            <div className={"col-xs-12 zero_pad"} style={{fontSize:"100%"}}>

                            <div className={"col-xs-2 label_new"} align={"left"}> Selection :</div>

                            <div className={"col-xs-4"}  onClick={()=>{this.setState({show_select:!this.state.show_select})}}
                                                        onMouseLeave={()=>{this.setState({show_select:false})}} >

                                    <div align={"center"}  className={"my_button_update col-xs-12"}> { this.state.free_selection ? " ZONE LIBRE " :"ZONE PAR WILAYA"} <span>&nbsp;&nbsp;</span> <span className={"glyphicon glyphicon-chevron-down"}></span></div>

                                <div className={"col-xs-12 zero_pad"} style={{position:"relative",zIndex:50}}>

                                    {this.state.show_select&&<div  className={"zero_pad col-xs-12"} style={{position:"absolute",top:"0px",left:"0px"}}>
                                        <div onClick={()=>{ this.setState({free_selection:true})

                                        }} className={"my_select_element col-xs-12"} > ZONE LIBRE </div>


                                        <div onClick={()=>{ this.setState({free_selection:false})
                                            this.set_first_wilaya()
                                        }} className={"my_select_element col-xs-12"} > ZONE PAR WILAYA </div>

                                    </div>}
                                </div>


                            </div>
                            <div className={"col-xs-3 label_new"}>Les Wilayas </div>

                            <div className={"col-xs-3 "}>

                                <select style={{textAlign:"center",backgroundColor:"#f3f4f6",color:"#002148",fontWeight:"bold"}} className={"my_button_update"} value={this.state.selected_city.name} onChange={(e)=>{
                                this.setState({selected_city:{
                                        name:e.target.value ,
                                        selected : true ,
                                        coords : data.map[e.target.value]

                                    }})
                            }} >

                                {
                                    data.list.sort().map((i,itr)=>{
                                        if(this.state.excluded_cities.indexOf(i)===-1){
                                            return <option key={itr} value={i}>{i.toString().toUpperCase()} </option>
                                        }
                                    })
                                }
                            </select>

                             </div>

                                <div className={"col-xs-12"} style={{marginTop:"30px",minHeight:"40px"}}>
                                    {this.state.free_selection&&<div className={"col-xs-12"}>

                                        <div className={" col-xs-5"}><input type={"button"} onClick={this.search_by_coords} className={"my_button_update"} value={"IDENTIFIER LA ZONE POINTE"} /> </div>

                                        <div className={" col-xs-7"} style={{fontSize:"140%",fontWeight:"bold",fontFamily:"Quicksand",color:"#002148"}}>
                                            <span style={{color:"#ff4275"}} className={"glyphicon glyphicon-chevron-right"}></span> {(()=>{

                                            if(this.state.identified_zone.done){
                                                return <span>une zone dans  <span style={{color:"#ff4275"}}>{this.state.identified_zone.value} </span> est selectionné </span>
                                            }
                                            else{

                                                if(this.state.identified_zone.value===""){
                                                    return " vous devez selectionner une zone DZ"
                                                }
                                                return " la zone selectionné n'est pas locale "
                                            }

                                        })()} </div>

                                    </div>}

                                </div>

                            </div>









                        </div>



                        <div className={"col-xs-12"}>
                        <ReactMapGL {...this.state.viewport}
                                    onViewportChange={nextViewport => this.setState({viewport:nextViewport})}
                                    mapStyle={'mapbox://styles/mapbox/dark-v10'} mapboxApiAccessToken={API_TOKEN} >

                            {<Marker  draggable={this.state.free_selection} {...this.state.selected_city.coords}
                                    onDragEnd={(e)=>{
                                        if(this.state.free_selection)
                                        this.setState({selected_city:{ ...this.state.selected_city , coords:{longitude: e.lngLat[0],
                                                    latitude: e.lngLat[1]}}})
                                        }
                                    }

                            > <span style={pinStyle} className={"glyphicon glyphicon-map-marker"}></span> </Marker>}

                        </ReactMapGL></div>

                    </div>
                </div>

            </div>


            <div className={"col-xs-12 zero_pad footer_style"} style={{marginTop:"100px",color:"white",textAlign:"left",paddingTop:"15px"}}>

                <div className={"col-xs-9"}> Sous la tutelle du <h4> Ministère de la Santé, de la Population et de la Réforme Hospitalière </h4> </div>
                <div className={"col-xs-3"}>Algérie @2020</div>

            </div>


        </div>
    }
}


const mapStateToProps = (state) =>{
    return {
        dz_now : state.dz_now
    }
}
const mapDispatchToProps = {
    synchronize_data
}



export  default connect(mapStateToProps,mapDispatchToProps)(NewZone) ;