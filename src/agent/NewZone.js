import React from "react";

import data from '../redux/wilayas'
import './newzone.css'
import '../default_ui.css'
import Axios from "axios";

import ReactMapGL , {Marker, NavigationControl}from 'react-map-gl'
import {connect} from 'react-redux'
import IP, {API_TOKEN} from "../redux/Ip_provider";
import {get_data_dz_zones_now} from "../redux/action";
import Pin from "../reusable/Pin";
import querystr from "querystring";



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
            error:false
        }
    }



    componentDidMount() {
        console.log(data) ;
        if((localStorage.getItem("token")!==null)&&(!this.props.dz_now.loaded)){
            this.props.get_data_dz_zones_now(localStorage.getItem("token"))
        }


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
            if((!prevProps.dz_now.loaded)&&(this.props.dz_now.loaded)){

                let exec = []
                this.props.dz_now.zones.forEach((i)=>{
                    exec.push(i.city)
                }) ;
                this.setState({excluded_cities:exec})
                console.log('one')
            }
    }

    send_all(){
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
                            this.props.get_data_dz_zones_now(localStorage.getItem("token"))
                            window.location.pathname ='/'

                        })
                        .catch(error2 => console.log('error', error2));




                }

            )
            .catch(error =>  {this.setState({error:true}); console.log(error)} );
        /*Axios.post("http://localhost:8080/api/v0/zone", JSON.stringify({"latitude":3.2,"longitude":25.555,"counrtyCode":"US","city":"california","country":"USA"}), {
            headers: {
                'Content-Type': '"application/json"',
                'Authorization': "Bearer "+localStorage.getItem("token")
            }
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })*/
        /*fetch(IP+"/api/v0/zone", requestOptions)
            .then(response => response.json())

            .then(result =>{
                            console.log(result)
                        let _id = result.content.zoneId ;
                            console.log(_id)
                                         var myHeaders = new Headers();
                                    myHeaders.append("Authorization", "Bearer "+localStorage.getItem("token"));
                                    myHeaders.append("Content-Type", "application/json");

                                    var raw = JSON.stringify({"totalPorteur":0,"totalSustects":suspect,"totalConfirmed":confirmed,"totalDead":dead,"totalRecovered":gueris,"dailyDeaths":0,"totalActive":actif,"totalCritical":critic,"zoneZoneId":_id});

                                    var requestOptions = {
                                        method: 'POST',
                                        headers: myHeaders,
                                        body: raw,
                                        redirect: 'follow'
                                    };

                                    fetch(IP+"/api/v0/dataZone", requestOptions)
                                        .then(response => response.json())
                                        .then(result =>{console.log(result) ;
                                                this.props.get_data_dz_zones_now(localStorage.getItem("token"))
                                                window.location.pathname ='/'

                                        })
                                        .catch(error => console.log('error', error));

            })


            .catch(error =>  {this.setState({error:true}); console.log(error)} ); */


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

                        <input type={"button"} value={"AJOUTER ZONE"} style={{backgroundColor:"rgba(255,30,66,0.96)",borderColor:"#ff111f"}} className={"my_button_v2"}

                            onClick={()=>{
                                if(this.state.selected_city.selected){
                                    this.send_all() ;
                                }
                                else{
                                    this.setState({error:true})
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
                            <div className={"col-xs-3 col-xs-offset-2 label_new"}> la Ville : </div>

                            <div className={"col-xs-3"}> <select style={{fontSize:"1.6em",textAlign:"center"}} className={"my_text_box_v4"} value={this.state.selected_city.name} onChange={(e)=>{
                                this.setState({selected_city:{
                                        name:e.target.value ,
                                        selected : true ,
                                        coords : data.map[e.target.value]

                                    }})
                            }} >
                                <option value="" disabled selected> </option>
                                {
                                    data.list.map((i,itr)=>{
                                        if(this.state.excluded_cities.indexOf(i)===-1){
                                            return <option key={itr} value={i}>{i} </option>
                                        }
                                    })
                                }

                            </select> </div>

                        </div>
                        <div className={"col-xs-12"}>
                        <ReactMapGL {...this.state.viewport}
                                    onViewportChange={nextViewport => this.setState({viewport:nextViewport})}
                                    mapStyle={'mapbox://styles/mapbox/dark-v10'} mapboxApiAccessToken={API_TOKEN} >

                            {(this.state.selected_city.selected)&&<Marker {...this.state.selected_city.coords}> <Pin size={20} /> </Marker>}
                        </ReactMapGL></div>

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
        dz_now : state.dz_now
    }
}
const mapDispatchToProps = {
    get_data_dz_zones_now
}



export  default connect(mapStateToProps,mapDispatchToProps)(NewZone) ;