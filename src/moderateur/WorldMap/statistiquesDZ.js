
import React, {useEffect} from "react";
import {connect} from "react-redux"
import {get_world_data, set_selected_zone_world, set_visible_stats} from "../../redux/action";
import IP from "../../redux/Ip_provider";

const statistiquesDZ =(props)=>{

    const exists_in = (ls)=>{
        ls.forEach((i)=>{
            if(!i.valide){
                return true
            }
        })
        return false
    }

    useEffect(()=>{
        if(props.world_data_zones.length===0){
            props.get_world_data()
        }
    },[])


        return <div className={"col-xs-12"}>

            <h1 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
                Les données des zones insérés par les agent de santé à valider
            </h1>

            <div className={"col-xs-offset-1 col-xs-10"} style={{paddingTop:"50px"}}>
                {
                    props.world_data_zones.map((i)=>{
                        if(!i.valide){

                            return <div className={"col-xs-12"} style={{border:"solid 1px #a0a0a0",borderRadius:"5px 5px",padding:"50px"}}>

                                <h3 color={"#002148"} className={"col-xs-12"}>
                                    Validation sur la Zone <span style={{fontWeight:"bolder"}}> {i.city} </span>
                                </h3>

                                <h3 align={"left"}> Les nouvelle valeurs :</h3>

                                <div className={"col-xs-6"} style={{textAlign:"left"}}>
                                    <h3 className={"col-xs-6 update_title"}>  Confirmés : </h3> <h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{i.totalConfirmed} cas</h3>
                                </div>


                                <div className={"col-xs-6"} style={{textAlign:"left"}}>
                                    <h3 className={"col-xs-6 update_title"}>  Actifs : </h3> <h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{i.totalActive} cas</h3>
                                </div>


                                <div className={"col-xs-6"} style={{textAlign:"left"}}>
                                    <h3 className={"col-xs-6 update_title"}> Décès : </h3> <h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{i.totalDead} cas</h3>
                                </div>


                                <div className={"col-xs-6"} style={{textAlign:"left"}}>
                                    <h3 className={"col-xs-6 update_title"}> Guéris : </h3> <h3 style={{fontWeight:"bold"}} className={"col-xs-5"}>{i.totalRecovered} cas</h3>
                                </div>

                                <div className={"col-xs-12"} style={{fontSize:"130%",paddingTop:"30px"}}>

                                    <div className={"col-xs-6"}>
                                        <div className={"col-xs-offset- col-xs-offset-3"}>

                                            <input type={"button"} value={"Valider "} className={"my_button_green"} onClick={()=>{
                                                let myHeaders = new Headers();
                                                myHeaders.append("Content-Type", "application/json");

                                                let raw = JSON.stringify({"valide":true});

                                                let requestOptions = {
                                                    method: 'PATCH',
                                                    headers: myHeaders,
                                                    body: raw,
                                                    redirect: 'manual'
                                                };

                                                fetch(IP+"/api/v0/dataZone/"+i.dataZoneId, requestOptions)
                                                    .then(response => response.text())
                                                    .then(result => {
                                                        props.get_world_data()
                                                    })
                                                    .catch(error => console.log('error', error));
                                            }}/>
                                        </div>
                                    </div>

                                    <div className={"col-xs-6"}>
                                        <div className={"col-xs-offset- col-xs-offset-3"}>

                                            <input type={"button"} value={"Supprimer "} className={"my_button_reject"} onClick={()=>{


                                                let requestOptions7 = {
                                                    method: 'DELETE',
                                                    redirect: 'manual'
                                                };

                                                fetch(IP+"/api/v0/dataZone/"+i.dataZoneId, requestOptions7)
                                                    .then(response => response.text())
                                                    .then(result => {
                                                        props.get_world_data()
                                                    })
                                                    .catch(error => console.log('error', error));
                                            }}/>

                                        </div>
                                    </div>

                                </div>



                            </div>


                        }

                    })
                }
                {
                    (exists_in(props.world_data_zones))&&<h2>
                        Aucunne zone à valider
                    </h2>

                }

            </div>

        </div>

}


const mapDispatchToProps = {
    get_world_data , set_selected_zone_world ,set_visible_stats
}

const mapStateToProps = (state) =>{
    return {
        world_data_zones : state.world_data.zones ,

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(statistiquesDZ)