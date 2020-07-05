import React, {useEffect, useState} from "react";
import {connect } from 'react-redux'
import {set_selected_zone_world , set_visible_stats} from "../../redux/action";
import IP from "../../redux/Ip_provider";
import {Bar} from 'react-chartjs-2';


const ZoneStats = (props)=>{

        const [data,setData] = useState([])

    const [show_select,set_show_select] = useState(false)
    const [type,set_type] = useState("totalConfirmed")

    const get_date = (ls)=>{
            let tmp  = []
        ls.forEach((i)=>{
            tmp.push( (new Date(i.createdAt)).toLocaleDateString('fr') )
        })
        return tmp
    }
    const get_data = (ls,key)=>{
            let tmp = []
        ls.forEach((i)=>{
            tmp.push(i[key])
        })

        return tmp
    }

    const color_adapter = {
        "totalConfirmed": "#6C7A89",
        "totalDead": "#e75164",
        "totalRecovered": "#77c486",
        "totalActive": "#f5e190",
    }

    const state = {
        labels: get_date(data),
        datasets: [
            {
                label: ' evolution',
                backgroundColor: color_adapter[type],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: get_data(data,type)
            }
        ]
    }



        useEffect(()=>{
            if(props.world_data_selected.country!==undefined){

                let requestOptions = {
                    method: 'GET',
                    redirect: 'manual'
                };
               // alert(props.world_data_selected.country + " "+props.world_data_selected.country )

                fetch(IP+"/api/v0/zone/"+props.world_data_selected.zoneId, requestOptions)
                    .then(response => response.json())
                    .then(result => {


                        result.dataZones.sort(function(a, b) {
                            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                        })

                        setData(result.dataZones)
                      //  console.log("result",result.items)

                    })
                    .catch(error => console.log('error', error));




            }
        },[props.visible])

        return <React.Fragment>

            {props.visible&&<div className={"col-xs-12 stats_back"} onClick={()=>{
                props.set_selected_zone_world({})
                props.set_visible_stats(false)
            }}>

            <div className={"col-xs-12 stats_body"} onClick={(e)=>{ e.stopPropagation() ; }}>


                <h2 color={"#002148"}> Les statistiques et Evolution de la zone {props.world_data_selected.country +" - "+ props.world_data_selected.city}</h2>

                <div className={"col-xs-12"} style={{padding:"20px"}}>
                    <h2 className={"col-xs-4 col-xs-offset-2"}> Affichage par :</h2>

                                <div className={"col-xs-4 "} style={{marginTop:"20px",fontSize:"120%"}} onClick={()=>{

                                    set_show_select(!show_select)
                                    //console.log(this.props.dz_now.show_risk)

                                }}
                                     onMouseLeave={()=>{ set_show_select(false)}}>

                                    <div align={"center"}  className={"my_button_deep_blue col-xs-12"}>  {(()=>{
                                        if(type==="")
                                            return "Tout les publications"
                                        return type
                                    })()}

                                        <span>&nbsp;&nbsp;</span> <span className={"glyphicon glyphicon-chevron-down"}></span></div>

                                    <div className={"col-xs-12 zero_pad"} style={{position:"relative",zIndex:50}}>

                                        {show_select&&<div  className={"zero_pad col-xs-12"} style={{position:"absolute",top:"0px",left:"0px"}}>

                                            <div onClick={()=>{ set_type("totalConfirmed")

                                            }} className={"my_select_element col-xs-12"} > nombre des cas confirmés</div>

                                            <div onClick={()=>{ set_type("totalActive")

                                            }} className={"my_select_element col-xs-12"} > nombre des actives </div>

                                            <div onClick={()=>{  set_type("totalDead")

                                            }} className={"my_select_element col-xs-12"} > nombre de morts </div>

                                            <div onClick={()=>{ set_type("totalRecovered")

                                            }}
                                                 className={"my_select_element col-xs-12"} > nombre de guéris  </div>

                                        </div>}
                                    </div>




                                </div>
                </div>

                <div className={"col-xs-10 col-xs-offset-1"} style={{height:"30vh"}}>
                    <Bar
                        data={state}
                        width={50}
                    height={20}
                        options={{
                            title:{
                                display:true,
                                text:'l\'evolution dans de temps du nombre de '+type,
                                fontSize:20
                            },
                            legend:{
                                display:true,
                                position:'right'
                            },

                        }}
                    />
                </div>
            </div>


        </div>}


        </React.Fragment>

}

const mapStateToProps = (state)=>{
    return {
        world_data_selected : state.world_data.selected ,
        visible : state.world_data.visible_stats
    }
}

const dispatchtoProps = {
    set_selected_zone_world,set_visible_stats
}

export default connect(mapStateToProps,dispatchtoProps)(ZoneStats)