import React, {useEffect, useState} from "react";
import coords_map from "../redux/wilayas.json";
import {NavLink} from "react-router-dom";
import { parser_diff_comment} from "../http_requests/dataCalcule";
import '../agent/Synthese.css'
import {connect} from 'react-redux'
import {synchronize_data , set_displayed_update_zone } from "../redux/action";
import IP from "../redux/Ip_provider";
import {insert_zone_risque_only, delete_zone_risque, insert_zone_data , delete_zone_risque_from_risque_id } from '../http_requests/http_zones'

const TableRowUpdate = (props) =>{ //props.data

    const [data,setData] = useState(props.data)
    const [changed,change]=useState(false)
    const [success_update,setSuccess] = useState(false)





     return <tr id={"bk"+data.zoneId} className={"zone_row"} style={{backgroundColor:changed ? "#e5ecde" : "none"}} onMouseEnter={()=>{
         let tmp = {
             longitude : data.longitude ,
             latitude : data.latitude
         }

         props.set_displayed_update_zone(tmp)
     }}
     >
         <td style={(()=>{ if(success_update) return {width:"10%",backgroundColor:"#a6c7e5"}
                            return {width:"10%"}

         })() }  onClick={()=>{setData({...data,is_risk:!data.is_risk}); change(true)}} > {data.is_risk&&<span style={{color:"#ff4275"}} className={"glyphicon glyphicon-ok"}></span>}</td>
         <td style={{width:"10%"}} >  <input disabled={!data.is_risk} type={"number"} onChange={(e)=>{setData({...data,diametre:Number(e.target.value)}); change(true)}}  value={data.diametre}/></td>
         <td style={{width:"10%"}} >  <input disabled={!data.is_risk} type={"text"} onChange={(e)=>{setData({...data,cause:e.target.value}); change(true)}}  value={data.cause}/></td>
        <td style={{width:"10%"}} >  <input type={"number"} onChange={(e)=>{setData({...data,totalDead:Number(e.target.value)}); change(true)}}  value={data.totalDead}/></td>
        <td style={{width:"10%"}} > <input type={"number"} onChange={(e)=>{setData({...data,totalSustects:Number(e.target.value)}); change(true)}}  value={data.totalSustects}  /></td>
        <td style={{width:"10%"}} > <input type={"number"} onChange={(e)=>{setData({...data,totalActive:Number(e.target.value)}); change(true)}}  value={data.totalActive}/></td>
        <td style={{width:"10%"}} ><input type={"number"} onChange={(e)=>{setData({...data,totalRecovered:Number(e.target.value)}); change(true)}}  value={data.totalRecovered}/></td>
        <td style={{width:"10%"}} ><input type={"number"} onChange={(e)=>{setData({...data,totalConfirmed:Number(e.target.value)}); change(true)}}  value={data.totalConfirmed}/></td>
        <td style={{width:"15%"}} >  <div  onClick={()=>{
            if(changed){
                if(data.is_risk){
                    if(data.risked){ // was en risque and still on risque need to delete old & insert new

                        let token = localStorage.getItem("token")
                        let raw4 = JSON.stringify({"totalPorteur":0,"totalSustects":data.totalSustects,"totalConfirmed":data.totalConfirmed,"totalDead":data.totalDead,
                            "totalRecovered":data.totalRecovered,"dailyDeaths":0,"totalActive":data.totalActive,"totalCritical":data.totalCritical,"zoneZoneId":data.zoneId});
                        Promise.all([
                            insert_zone_risque_only(token,data.zoneId,data.diametre,data.cause,1),
                            insert_zone_data(token,data.zoneId,raw4),
                            delete_zone_risque_from_risque_id(token,data.zoneRisqueId)

                        ]).then((result)=>{
                            console.log(result)

                            props.synchronize_data(localStorage.getItem("token"))
                            change(false)
                            setSuccess(true)

                        }).catch((err)=>{
                            console.log(err)
                        })



                    }
                    else{ // add new one only!! old risque no exist

                        let token = localStorage.getItem("token")
                        let raw4 = JSON.stringify({"totalPorteur":0,"totalSustects":data.totalSustects,"totalConfirmed":data.totalConfirmed,"totalDead":data.totalDead,
                            "totalRecovered":data.totalRecovered,"dailyDeaths":0,"totalActive":data.totalActive,"totalCritical":data.totalCritical,"zoneZoneId":data.zoneId});

                        Promise.all([insert_zone_risque_only(token,data.zoneId,data.diametre,data.cause,1),insert_zone_data(token,data.zoneId,raw4)]).then((result)=>{
                            console.log(result)

                            props.synchronize_data(localStorage.getItem("token"))
                            change(false)
                            setSuccess(true)

                        }).catch((err)=>{
                            console.log(err)
                        })

                    }
                }
                else{
                    if(data.risked){ // delete old risque no need

                        let token = localStorage.getItem("token")
                        let raw4 = JSON.stringify({"totalPorteur":0,"totalSustects":data.totalSustects,"totalConfirmed":data.totalConfirmed,"totalDead":data.totalDead,
                            "totalRecovered":data.totalRecovered,"dailyDeaths":0,"totalActive":data.totalActive,"totalCritical":data.totalCritical,"zoneZoneId":data.zoneId});


                        Promise.all([delete_zone_risque_from_risque_id(token,data.zoneRisqueId),insert_zone_data(token,data.zoneId,raw4)]).then((result)=>{
                            console.log(result)

                            props.synchronize_data(localStorage.getItem("token"))
                            change(false)
                            setSuccess(true)

                        }).catch((err)=>{
                            console.log(err)
                        })



                    }
                    else{ //no exist and wont exist


                        let myHeaders2 = new Headers();
                        myHeaders2.append("Authorization", "Bearer "+localStorage.getItem("token"));
                        myHeaders2.append("Content-Type", "application/json");

                        let raw4 = JSON.stringify({"totalPorteur":0,"totalSustects":data.totalSustects,"totalConfirmed":data.totalConfirmed,"totalDead":data.totalDead,
                            "totalRecovered":data.totalRecovered,"dailyDeaths":0,"totalActive":data.totalActive,"totalCritical":data.totalCritical,"zoneZoneId":data.zoneId});

                        let requestOptions1 = {
                            method: 'POST',
                            headers: myHeaders2,
                            body: raw4,
                            redirect: 'follow'
                        };

                        fetch(IP+"/api/v0/dataZone", requestOptions1)
                            .then(response3 => response3.json())
                            .then(result2 =>{console.log(result2) ;
                                props.synchronize_data(localStorage.getItem("token"))
                                change(false)
                                setSuccess(true)

                            })
                            .catch(error2 => console.log('error', error2));


                    }


                }

                setTimeout(()=>{change(false)
                    let bk = document.querySelector("#bk"+data.zoneId)
                    bk.style.background  = "none"


                },100)
                setTimeout(()=>{

                        setSuccess(false)

                },1000)
            }
        }
        } className={"my_button_update"} >update</div> </td>


    </tr>


}

const mapStateToProps = (state) =>{
    return {
        selected_zone : state.dz_now.selected_for_update
    }
}

const mapDispatchToProps = {
    synchronize_data , set_displayed_update_zone
}

export  default connect(mapStateToProps,mapDispatchToProps)(TableRowUpdate)


