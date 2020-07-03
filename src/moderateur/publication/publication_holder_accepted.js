import React, {useEffect, useState} from 'react'
import Robots_head from "./Robots_head";
import IP from "../../redux/Ip_provider";
import Publication_Youtube from "./Publication_Youtube";

const Publication_holder_accepted =(props)=>{

    const [show_select,set_show_select] = useState(false)
    const [type,set_type] = useState("News")

    const [int,set_int] = useState(0)
    const [data,set_data] = useState([])

    useEffect(()=>{

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(IP+"/api/v0/publication/robots-data?type="+type+"&valide=true", requestOptions)
            .then(response => response.json())
            .then(result =>{ console.log(result.items.rows)
                set_data(result.items.rows)

            })
            .catch(error => console.log('error', error));

    },[type,int])


    return <div className={"col-xs-12 zero_pad"}>
        <Robots_head />

        <h1 className={"synth_title col-xs-10"} style={{color:"#002148"}}>
            Les Publications  Des robots validées & publiées
        </h1>

        <div className={"col-xs-12"}>

            <h2  className={"col-xs-4 label_new"}>
                Le type des publication
            </h2>

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


                        <div onClick={()=>{ set_type("YouTube")

                        }} className={"my_select_element col-xs-12"} > Publications Youtube </div>

                        <div onClick={()=>{  set_type("News")

                        }} className={"my_select_element col-xs-12"} > Publications des sites </div>

                        <div onClick={()=>{ set_type("Facebook")

                        }}
                             className={"my_select_element col-xs-12"} > Publications Facebook </div>

                    </div>}
                </div>




            </div>


        </div>

        <div className={"col-xs-10 col-xs-offset-1"} style={{borderBottom:"solid 2px #a0a0a0" , padding:"20px"}}></div>

        <div className={"col-xs-12"}>
            {
                data.map((i)=>{
                    return  <div className={"col-xs-12"} key={i.publicationId}>
                        <Publication_Youtube {...i} validation={false} type={type} update_int={()=>{
                            set_int(int+1)
                        }} />
                    </div>
                })
            }
            {
                (data.length===0)&&<h2 style={{paddingTop:"50px"}}> Aucunne publication disponible </h2>
            }
        </div>



    </div>
}



export default Publication_holder_accepted


