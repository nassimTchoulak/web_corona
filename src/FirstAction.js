import React from "react";
import IP from "./redux/Ip_provider";
import {NavLink} from "react-router-dom";

import './core.css'
import './default_ui.css'
import Footer from "./reusable/Footer";



const FirstAction = ()=>{


    return <div className={"col-xs-12 first_all"}>


        <div className={"col-xs-12"} style={{paddingTop:"50px"}}>

            <div className={" col-xs-5"}>
                <img id={'login_logo'} src={IP+"/api/v0/assets/logo_horizantal.png"} width={"500px"} />
            </div>

            <div className={" col-xs-7 login_start"}>
                <h1 className={"login_start"} align={"left"}>  <span style={{color:"#f32039"}} className={"glyphicon glyphicon-chevron-right"}></span> Bienvenue à L'Application Algérienne dédiée aux informations liées au virus COVID-19</h1>
            </div>
        </div>

        <div className={"col-xs-offset-2 col-xs-8"}>
            <h2> Portaille dédiée aux Acteurs du Ministère de la Santé en relation au COVID-19 </h2>
        </div>


        <div className={"col-xs-12"} style={{paddingTop:"100px"}}>

            <div className={"col-xs-offset-1 col-xs-4 role_selection"} onClick={()=>{
                window.location.pathname='/redaction'
            }}>
                <h1>
                             <div className={"col-xs-12"} style={{paddingBottom:"20px"}}>       SE CONNECTER EN TANT QUE  </div>
                    <div className={"col-xs-12"} style={{paddingBottom:"20px"}}>        REDACTEUR </div>

                    <div className={"col-xs-12"}><span style={{color:"#f32039",fontSize:"200%"}} className={"glyphicon glyphicon-pencil"}></span></div>
                </h1>
            </div>



            <div className={"col-xs-offset-2 col-xs-4 role_selection"} onClick={()=>{
                window.location.pathname='/sante'
            }}>
                <h1>
                    <div className={"col-xs-12"} style={{paddingBottom:"20px"}}>       SE CONNECTER EN TANT QUE  </div>  <div className={"col-xs-12"} style={{paddingBottom:"20px"}}>  AGENT DE SANTE </div>



                    <div className={"col-xs-12"}><span style={{color:"#f32039",fontSize:"200%"}} className={"glyphicon glyphicon-search"}></span></div>
                </h1>

            </div>

            <div className={"col-xs-12 zero_pad"} style={{paddingTop:"5%"}}>
                <div className={"col-xs-offset-4 col-xs-4 role_selection"} onClick={()=>{
                    window.location.pathname='/moderateur'
                }}>

                    <h1>
                        <div className={"col-xs-12"} style={{paddingBottom:"20px"}}>       SE CONNECTER EN TANT QUE  </div>  <div className={"col-xs-12"} style={{paddingBottom:"20px"}}>  MODERATEUR </div>



                        <div className={"col-xs-12"}><span style={{color:"#f32039",fontSize:"200%"}} className={"\tglyphicon glyphicon-cog"}></span></div>
                    </h1>

                </div>
            </div>

        </div>
        <Footer />

    </div>

}


export default FirstAction