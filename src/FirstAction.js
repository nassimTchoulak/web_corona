import React from "react";
import IP from "./redux/Ip_provider";
import {NavLink} from "react-router-dom";

import './core.css'
import './default_ui.css'


const FirstAction = ()=>{


    return <div className={"col-xs-12"}>


        <div className={"col-xs-12"} style={{paddingTop:"50px"}}>

            <div className={"col-xs-offset-1 col-xs-3"}>
                <img id={'login_logo'} src={IP+"/api/v0/assets/logo.png"} width={"200px"} />
            </div>

            <div className={" col-xs-7 login_start"}>
                <h1 className={"login_start"}>  Bienvenue à L'Application Algérienne dédiée aux informations liées au virus COVID-19</h1>
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
                                    SE CONNECTER EN TANT QUE REDACTEUR
                </h1>
            </div>



            <div className={"col-xs-offset-2 col-xs-4 role_selection"} onClick={()=>{
                window.location.pathname='/sante'
            }}>
                <h1>
                    SE CONNECTER EN TANT QUE AGENT DE SANTE
                </h1>

            </div>

        </div>

    </div>

}


export default FirstAction