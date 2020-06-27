
import React, {useState} from "react";
import ReactMapGL, {Marker} from "react-map-gl";
import IP, {API_TOKEN} from "../../redux/Ip_provider";
import { } from 'react-router-dom'
import Centre_head from "./Centres_Head";
import Footer from "../../reusable/Footer";
import './centre_map.css'
import UpdateZone from "../../agent/UpdateZone";
import Confirmation from "../../reusable/Confirmation";

export const pinStyle = {
    color: '#02dd6c',
    cursor:"pointer",
    position: "relative",
    top:"-40px",
    left: "-51%",
    fontSize:"3em",
    zIndex:100

};

const Update_helper = (props)=>{
    const [update,setUpdate] = useState(false)
    const [err,setErr] = useState(false)
    const [plus,setPlus] = useState(false)

    if(!update){
        return   <input type={"button"} value={" Update la disponilité "} onClick={()=>{ setUpdate(true) }} className={"my_button_light_blue"}/>
    }
    else{
        return <div className={"col-xs-12 zero_pad"} style={{color:"#0f0023",fontWeight:"bold"}}>
            <div className={"col-xs-7 zero_pad"} > Lits disponibles :</div>
            <div className={"col-xs-5 zero_pad"} style={{fontSize:"80%",paddingBottom:"20px"}} >
                <input id={"up_number"} type={"number"} max={props.nbrLitsTotal} onClick={()=>{setErr(false)}}  min={0} defaultValue={props.nbrLitsLibre}  className={"my_text_box_v4"}/> </div>

           <div className={"col-xs-12 zero_pad"}>
            <input type={"button"} value={" Valider "} onClick={()=>{

                let nb = Number( document.querySelector("#up_number").value )
                if((nb<=props.nbrLitsTotal)&&(nb>=0)){

                    let myHeadersa = new Headers();
                    myHeadersa.append("Content-Type", "application/json");

                    let rawa = JSON.stringify({"nbrLitsLibre":nb});

                    let requestOptionbs = {
                        method: 'PATCH',
                        headers: myHeadersa,
                        body: rawa,
                        redirect: 'manual'
                    };

                    fetch(IP+"/api/v0/centreAcceuil/"+props.centreAcceuilId, requestOptionbs)
                        .then(response => response.json())
                        .then(result => {
                            setUpdate(false)
                            props.synch_all()
                        })
                        .catch(error => console.log('error', error));
                }
                else{
                    setErr(true)

                }

            }} className={"my_button_green"}  />
               {err&&<h4> valeur non valide </h4>}
           </div>
        </div>
    }

}




class  Centres_Display extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: "70vw",
                height: "70vh",
                latitude: 32.430472,
                longitude: 3.334102,
                zoom: 5
            } ,
            centres :[] ,
            selected_centre:{} ,
            visible_delete:false

        }
    }

    synchronize_centres = ()=>{
        let requestOptionsi = {
            method: 'GET',
            redirect: 'manual'
        };

        fetch(IP+"/api/v0/centreAcceuil", requestOptionsi)
            .then(response => response.json())
            .then(result => {

                if(result.rows.length>=0){

                    this.setState({
                        centres:result.rows
                    })
                    console.log(result.rows)
                }
            })
            .catch(error => console.log('error', error));
    }

    componentDidMount() {
        this.synchronize_centres()
    }

    render(){
        return <div className={"col-xs-12 zero_pad"}>

            <Centre_head />
            <div className={"col-xs-12"}>
                <h1 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
                    les centres d'accuil  sur le territoire national
                </h1>

            </div>



            <div className={"col-xs-12"}>
                <ReactMapGL {...this.state.viewport}
                            onViewportChange={nextViewport => this.setState({viewport:nextViewport})}
                            mapStyle={'mapbox://styles/mapbox/dark-v10'} mapboxApiAccessToken={API_TOKEN} >
                    {
                        this.state.centres.map((i,itr)=>{
                            if (this.state.selected_centre.centreAcceuilId!==i.centreAcceuilId){
                            return    <Marker key={itr}  {...i}

                            > <span style={pinStyle} onMouseEnter={()=>{ this.setState({selected_centre:i})}} className={"glyphicon glyphicon-map-marker"}> </span> </Marker> }
                        })
                    }
                    {
                        (this.state.selected_centre.centreAcceuilId!==undefined)&&<Marker   {...this.state.selected_centre}

                        > <React.Fragment > <span style={pinStyle}   className={"glyphicon glyphicon-map-marker"}>    </span>
                            <div className={"selected_centre_info"} onMouseLeave={()=>{this.setState({selected_centre:{}})}}>
                                <div style={{fontWeight:"bold"}} className={"col-xs-12"}> Nom du centre : {this.state.selected_centre.nom} </div>
                                <div className={"col-xs-12"}> Ville : {this.state.selected_centre.city}</div>
                                <div className={"col-xs-12"}> Info : { this.state.selected_centre.information}</div>
                                <div className={"col-xs-12"}> Disponiblité : <span style={{fontWeight:"bold"}}> {this.state.selected_centre.nbrLitsLibre}/{this.state.selected_centre.nbrLitsTotal} </span></div>

                                <div className={"col-xs-12"} style={{paddingTop:"30px"}}>
                                   <Update_helper {...this.state.selected_centre} synch_all={()=>{
                                       this.setState({selected_centre:{}})

                                       this.synchronize_centres()


                                   }} />
                                </div>


                            </div>
                        </React.Fragment>

                        </Marker>
                    }





                </ReactMapGL></div>

            <div className={"col-xs-4 col-xs-offset-6"} style={{fontSize:"150%",paddingTop:"40px"}}> <input type={"button"} className={"my_button_reject"} onClick={()=>{
                this.setState({visible_delete:true})
            }} value={" ReInitialiser les centres "}/> </div>
            <Confirmation message={"étes-vous sur de vouloir supprimer tout les centres d'acceuil et remettre à zero ?"} hide={()=>{  this.setState({visible_delete:false}) }} execute={()=>{
                let requestOptions = {
                    method: 'DELETE',
                    redirect: 'manual'
                };

                fetch(IP+"/api/v0/centreAcceuil", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log("synchin,g")
                        this.synchronize_centres()
                        this.setState({visible_delete:false})
                    })
                    .catch(error => console.log('error', error));


            }} visible={this.state.visible_delete} />

            <Footer />

        </div>
    }

}



export default Centres_Display