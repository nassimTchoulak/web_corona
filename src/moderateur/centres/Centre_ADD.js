
import React from "react";
import ReactMapGL, {Marker} from "react-map-gl";
import IP, {API_TOKEN} from "../../redux/Ip_provider";
import {pinStyle} from "../../agent/NewZone";
import Centre_head from "./Centres_Head";
import {get_place_query} from "../../http_requests/http_zones";

class  Centres_ADD extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: "45vw",
                height: "60vh",
                latitude: 32.430472,
                longitude: 3.334102,
                zoom: 5
            } ,
            selected_city : {
                name:"",
                selected:false ,
                coords : {
                    latitude: 34.430472,
                    longitude: 3.334102,


                }
            } ,
            identified_zone:{
                value:"",
                done:false
            },
            error:false
        }
    }

    submit_centre = (city)=>{

        let nom = document.querySelector("#ce_nom").value
        let extra = document.querySelector("#ce_extra").value
        let nb = Number( document.querySelector("#ce_capacite").value)


        let myHeadersa = new Headers();
        myHeadersa.append("Content-Type", "application/json");

        let rawa = JSON.stringify({...this.state.selected_city.coords,"city":city,"diametre":10,"nbrLitsLibre":nb,"nbrLitsTotal":nb,"nom":nom,"information":extra,"valide":true});

        let requestOptionsa = {
            method: 'POST',
            headers: myHeadersa,
            body: rawa,
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/centreAcceuil", requestOptionsa)
            .then(response => response.json())
            .then(result =>  {  document.querySelector("#redirect_li").click() })
            .catch(error => console.log('error', error));
    }

    search_by_coords = ()=>{
        let y = this.state.selected_city.coords.latitude  ;
        let x =  this.state.selected_city.coords.longitude  ;


        get_place_query(x,y).then((result)=>{

            if(result.features.length>0){

                console.log(result.features[0])

                if(/Algeria/.test( result.features[0].place_name) ){
                   // this.setState({identified_zone:{value:result.features[0].text,done:true}})
                   // this.setState({selected_city:{...this.state.selected_city,selected:true,name:result.features[0].text}})
                    this.submit_centre(result.features[0].text)
                }
                else{
                    this.setState({error:true})
                }
            }

        }).catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return <div className={"col-xs-12 zero_pad"}>

            <Centre_head />
            <div className={"col-xs-12"}>
                <h1 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
                    Ajouter un nouveau centre sur le territoire algérien
                </h1>

            </div>
            <a id={"redirect_li"} style={{display:"none"}} href={"/moderateur/centres/disponibles"} >k</a>


            <div className={"col-xs-5"}>
                <h3 > Les informations du centre</h3>

                <div className={"col-xs-12"}  style={{paddingTop:"30px"}} >
                    <div className={"label_new col-xs-5"}> Nom du centre:</div>
                    <div className={"col-xs-7"} style={{fontSize:"140%"}}> <input id={"ce_nom"} type={"text"} maxLength={40} placeholder={"Nom centre"} className={"my_text_box_v4"}/> </div>
                </div>


                <div className={"col-xs-12"} style={{paddingTop:"30px"}}>
                    <div className={"label_new col-xs-5"}> Info :</div>
                    <div className={"col-xs-7"} style={{fontSize:"140%"}}> <input id={"ce_extra"} type={"text"} maxLength={40} placeholder={"extra"} className={"my_text_box_v4"}/> </div>
                </div>


                <div className={"col-xs-12"}  style={{paddingTop:"30px"}}>
                    <div className={"label_new col-xs-8"}> Capacité ( lits ):</div>
                    <div className={"col-xs-4"} style={{fontSize:"140%"}}> <input id={"ce_capacite"} type={"number"} defaultValue={50} maxLength={40} placeholder={"Nom centre"} className={"my_text_box_v4"}/> </div>
                </div>


                <div className={"col-xs-6 col-xs-offset-3"} style={{paddingTop:"50px"}}>
                    <input type={"button"}  value={" Ajouter "}  className={"create_button"} onClick={()=>{

                        this.search_by_coords()


                    }}/>
                </div>
                {this.state.error&&<h3 className={"col-xs-12"}> le centre n'est pas bien localizé </h3>}





            </div>

            <div className={"col-xs-7"}>

                <h3> Localisez le centre :</h3>
                <ReactMapGL {...this.state.viewport}
                            onViewportChange={nextViewport => this.setState({viewport:nextViewport})}
                            mapStyle={'mapbox://styles/mapbox/dark-v10'} mapboxApiAccessToken={API_TOKEN} >

                    {<Marker  draggable={true} {...this.state.selected_city.coords}
                              onDragEnd={(e)=>{

                                  this.setState({selected_city:{ ...this.state.selected_city , coords:{longitude: e.lngLat[0],
                                              latitude: e.lngLat[1]}}})

                              }}

                    > <span style={pinStyle} className={"glyphicon glyphicon-map-marker"}> </span> </Marker>}




                </ReactMapGL></div>

        </div>
    }

}

export default Centres_ADD